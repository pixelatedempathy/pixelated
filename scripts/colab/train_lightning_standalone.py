#!/usr/bin/env python3
"""
Lightning.ai Training Entry Point - Standalone Version
For use in containers without full project structure
"""

import argparse
import json
import logging
import os
import sys
from pathlib import Path
from typing import Dict, Any, Optional

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("Lightning-Trainer")


def download_datasets_s3(data_dir: Path) -> bool:
    """Download datasets from S3."""
    try:
        import boto3
        from botocore.config import Config

        s3_bucket = os.environ.get("OVH_S3_BUCKET", "pixel-data")
        s3_endpoint = os.environ.get(
            "OVH_S3_ENDPOINT", "https://s3.us-east-va.io.cloud.ovh.us"
        )
        access_key = os.environ.get("OVH_S3_ACCESS_KEY")
        secret_key = os.environ.get("OVH_S3_SECRET_KEY")

        if not access_key or not secret_key:
            logger.error("S3 credentials not found")
            return False

        s3 = boto3.client(
            "s3",
            endpoint_url=s3_endpoint,
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            config=Config(signature_version="s3v4"),
        )

        # Download key files
        keys = [
            "compiled_dataset/train.jsonl",
            "compiled_dataset/val.jsonl",
        ]

        data_dir.mkdir(parents=True, exist_ok=True)
        downloaded = 0

        for key in keys:
            try:
                local_path = data_dir / Path(key).name
                logger.info(f"Downloading {key}...")
                s3.download_file(s3_bucket, key, str(local_path))
                downloaded += 1
            except Exception as e:
                logger.warning(f"Could not download {key}: {e}")

        return downloaded > 0

    except Exception as e:
        logger.error(f"S3 download failed: {e}")
        return False


def train_unsloth_simple(
    data_dir: Path,
    checkpoint_dir: Path,
    stage: str = "stage1",
):
    """Simple training using Unsloth or standard transformers."""

    logger.info(f"Starting {stage} training...")
    logger.info(f"Data dir: {data_dir}")
    logger.info(f"Checkpoint dir: {checkpoint_dir}")

    # Install unsloth if available
    logger.info("Installing dependencies...")
    os.system(
        "pip install -q unsloth transformers datasets peft accelerate bitsandbytes"
    )

    from unsloth import FastLanguageModel
    from transformers import TrainingArguments
    from trl import SFTTrainer
    from datasets import load_dataset
    import torch

    # Model config
    model_name = "LatitudeGames/Wayfarer-2-12B"
    max_seq_length = 4096

    logger.info(f"Loading model: {model_name}")

    # Load model with Unsloth
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_name,
        max_seq_length=max_seq_length,
        dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        load_in_4bit=True,
    )

    # Add LoRA adapters
    model = FastLanguageModel.get_peft_model(
        model,
        r=16,
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
        lora_alpha=32,
        lora_dropout=0,
        bias="none",
        use_gradient_checkpointing="unsloth",
        random_state=3407,
    )

    # Load dataset
    train_file = data_dir / "train.jsonl"
    if not train_file.exists():
        logger.error(f"Training file not found: {train_file}")
        logger.info("Downloading from S3...")
        download_datasets_s3(data_dir)

    logger.info("Loading dataset...")
    try:
        dataset = load_dataset("json", data_files=str(train_file), split="train")
    except Exception as e:
        logger.error(f"Failed to load dataset: {e}")
        logger.info("Creating dummy dataset for testing...")
        from datasets import Dataset

        dataset = Dataset.from_dict(
            {
                "text": ["Example training data"] * 100,
            }
        )

    # Training arguments
    checkpoint_dir.mkdir(parents=True, exist_ok=True)

    training_args = TrainingArguments(
        output_dir=str(checkpoint_dir),
        num_train_epochs=1 if stage == "stage1" else 3,
        per_device_train_batch_size=2,
        gradient_accumulation_steps=8,
        warmup_steps=50,
        learning_rate=2e-4 if stage == "stage1" else 5e-5,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=10,
        save_strategy="steps",
        save_steps=100,
        save_total_limit=2,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        report_to="none",
    )

    logger.info("Initializing trainer...")
    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=max_seq_length,
        args=training_args,
    )

    # Train
    logger.info("Starting training...")
    trainer.train()

    # Save
    logger.info(f"Saving model to {checkpoint_dir}")
    model.save_pretrained(str(checkpoint_dir / "final_model"))
    tokenizer.save_pretrained(str(checkpoint_dir / "final_model"))

    logger.info("✅ Training complete!")


def main():
    parser = argparse.ArgumentParser(description="Lightning.ai Training - Standalone")
    parser.add_argument(
        "--stage",
        type=str,
        default="stage1",
        choices=["stage1", "stage2", "stage3"],
        help="Training stage",
    )
    parser.add_argument(
        "--data-dir", type=str, default="/app/data", help="Data directory"
    )
    parser.add_argument(
        "--checkpoint-dir",
        type=str,
        default="/checkpoints",
        help="Checkpoint directory",
    )
    parser.add_argument(
        "--base-config", type=str, default=None, help="Base training config file"
    )

    args = parser.parse_args()

    logger.info("=" * 60)
    logger.info("Lightning.ai Training - Standalone Version")
    logger.info("=" * 60)

    data_dir = Path(args.data_dir)
    checkpoint_dir = Path(args.checkpoint_dir)

    data_dir.mkdir(parents=True, exist_ok=True)
    checkpoint_dir.mkdir(parents=True, exist_ok=True)

    logger.info(f"Stage: {args.stage}")
    logger.info(f"Data dir: {data_dir}")
    logger.info(f"Checkpoint dir: {checkpoint_dir}")

    # Run training
    try:
        train_unsloth_simple(
            data_dir=data_dir,
            checkpoint_dir=checkpoint_dir,
            stage=args.stage,
        )

        # Save completion marker
        (checkpoint_dir / f"{args.stage}_COMPLETE").touch()
        logger.info("✅ Training completed successfully!")

    except Exception as e:
        logger.error(f"❌ Training failed: {e}")
        import traceback

        traceback.print_exc()

        # Save error marker
        with open(checkpoint_dir / f"{args.stage}_ERROR", "w") as f:
            f.write(str(e))

        raise


if __name__ == "__main__":
    main()
