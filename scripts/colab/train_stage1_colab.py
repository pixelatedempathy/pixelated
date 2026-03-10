#!/usr/bin/env python3
"""
Stage 1 Foundation Training for Google Colab Pro
Optimized for A100/V100/T4 GPUs
Includes Weights & Biases logging and Hugging Face Hub upload
"""

import argparse
import json
import logging
import os
import sys
from pathlib import Path
from typing import Dict, Any, Optional

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger("Colab-Trainer")


def setup_colab_environment():
    """Install dependencies in Colab environment."""
    logger.info("Setting up Colab environment...")

    # Install required packages
    packages = [
        "torch>=2.0.0",
        "transformers>=4.36.0",
        "datasets>=2.14.0",
        "accelerate>=0.25.0",
        "peft>=0.7.0",
        "bitsandbytes>=0.41.0",
        "wandb>=0.16.0",
        "huggingface-hub>=0.19.0",
        "boto3>=1.34.0",
        "tqdm",
    ]

    for pkg in packages:
        logger.info(f"Installing {pkg}...")
        os.system(f"pip install -q {pkg}")

    # Login to Hugging Face if token is available
    hf_token = os.environ.get("HF_TOKEN")
    if hf_token:
        logger.info("Logging into Hugging Face Hub...")
        os.system(f"huggingface-cli login --token {hf_token}")

    logger.info("Environment setup complete!")


def init_wandb(project_name: str, run_name: str, config: Dict[str, Any]) -> Optional[Any]:
    """Initialize Weights & Biases logging."""
    try:
        import wandb

        wandb_api_key = os.environ.get("WANDB_API_KEY")
        if not wandb_api_key:
            logger.warning("WANDB_API_KEY not set. Skipping W&B logging.")
            return None

        # Login
        wandb.login(key=wandb_api_key)

        # Initialize run
        run = wandb.init(
            project=project_name,
            name=run_name,
            config=config,
            reinit=True,
        )

        logger.info(f"✅ W&B initialized: {run_name}")
        return run

    except Exception as e:
        logger.warning(f"Failed to initialize W&B: {e}")
        return None


def upload_to_huggingface(
    checkpoint_dir: Path,
    repo_id: str,
    stage: str = "stage1",
    private: bool = True,
) -> bool:
    """Upload trained model to Hugging Face Hub."""
    try:
        from huggingface_hub import HfApi, create_repo

        hf_token = os.environ.get("HF_TOKEN")
        hf_username = os.environ.get("HF_USERNAME")

        if not hf_token:
            logger.warning("HF_TOKEN not set. Skipping Hugging Face upload.")
            return False

        if not repo_id and hf_username:
            repo_id = f"{hf_username}/pixelated-empathy-{stage}"

        if not repo_id:
            logger.warning("No repo_id or HF_USERNAME set. Skipping upload.")
            return False

        logger.info(f"Uploading to Hugging Face: {repo_id}")

        api = HfApi(token=hf_token)

        # Create repo if it doesn't exist
        try:
            create_repo(
                repo_id=repo_id,
                private=private,
                token=hf_token,
                exist_ok=True,
            )
            logger.info(f"✅ Repository ready: {repo_id}")
        except Exception as e:
            logger.warning(f"Repo creation skipped: {e}")

        # Upload files
        api.upload_folder(
            folder_path=str(checkpoint_dir),
            repo_id=repo_id,
            commit_message=f"Upload {stage} training checkpoint",
        )

        logger.info(f"✅ Uploaded to https://huggingface.co/{repo_id}")
        return True

    except Exception as e:
        logger.error(f"Failed to upload to Hugging Face: {e}")
        return False


def download_datasets_colab(data_dir: Path, env_vars: Dict[str, str]) -> bool:
    """Download datasets from S3 to Colab."""
    logger.info("Downloading datasets from S3...")

    s3_bucket = env_vars.get("OVH_S3_BUCKET", "pixel-data")
    s3_endpoint = env_vars.get("OVH_S3_ENDPOINT", "https://s3.us-east-va.io.cloud.ovh.us")
    access_key = env_vars.get("OVH_S3_ACCESS_KEY")
    secret_key = env_vars.get("OVH_S3_SECRET_KEY")

    if not access_key or not secret_key:
        logger.error("S3 credentials not found in environment")
        return False

    # Key dataset prefixes
    prefixes = ["compiled_dataset/", "compiled_stage2_dataset/"]
    downloaded = 0

    import boto3
    from botocore.config import Config

    s3 = boto3.client(
        "s3",
        endpoint_url=s3_endpoint,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(signature_version="s3v4"),
    )

    for prefix in prefixes:
        try:
            response = s3.list_objects_v2(Bucket=s3_bucket, Prefix=prefix)
            if "Contents" not in response:
                logger.warning(f"No objects found at {prefix}")
                continue

            for obj in response["Contents"]:
                key = obj["Key"]
                local_path = data_dir / key
                local_path.parent.mkdir(parents=True, exist_ok=True)

                logger.info(f"Downloading {key}...")
                s3.download_file(s3_bucket, key, str(local_path))
                downloaded += 1
        except Exception as e:
            logger.error(f"Failed to download {prefix}: {e}")

    logger.info(f"Downloaded {downloaded} files from S3")
    return downloaded > 0


def detect_gpu_type() -> str:
    """Detect GPU type in Colab."""
    try:
        import torch

        if not torch.cuda.is_available():
            return "cpu"

        gpu_name = torch.cuda.get_device_name(0).lower()

        if "a100" in gpu_name:
            return "a100"
        elif "v100" in gpu_name:
            return "v100"
        elif "t4" in gpu_name:
            return "t4"
        elif "l4" in gpu_name:
            return "l4"
        else:
            return "unknown"

    except Exception:
        return "unknown"


def get_gpu_config(gpu_type: str) -> Dict[str, Any]:
    """Get optimal config for detected GPU."""
    configs = {
        "a100": {
            "per_device_batch_size": 4,
            "gradient_accumulation": 4,
            "bf16": True,
            "fp16": False,
            "max_memory": "40GB",
        },
        "v100": {
            "per_device_batch_size": 2,
            "gradient_accumulation": 8,
            "bf16": False,
            "fp16": True,
            "max_memory": "16GB",
        },
        "t4": {
            "per_device_batch_size": 1,
            "gradient_accumulation": 16,
            "bf16": False,
            "fp16": True,
            "max_memory": "16GB",
        },
        "l4": {
            "per_device_batch_size": 2,
            "gradient_accumulation": 8,
            "bf16": True,
            "fp16": False,
            "max_memory": "24GB",
        },
        "cpu": {
            "per_device_batch_size": 1,
            "gradient_accumulation": 32,
            "bf16": False,
            "fp16": False,
            "max_memory": "N/A",
        },
    }

    return configs.get(gpu_type, configs["t4"])


def create_colab_config(
    base_config: Dict[str, Any],
    data_dir: Path,
    checkpoint_dir: Path,
    stage: str = "stage1",
) -> Dict[str, Any]:
    """Create Colab-optimized training config."""

    config = base_config.copy()
    gpu_type = detect_gpu_type()
    gpu_config = get_gpu_config(gpu_type)

    logger.info(f"Detected GPU: {gpu_type.upper()}")
    logger.info(f"GPU Config: {gpu_config}")

    # Update with GPU-specific settings
    config["training_parameters"]["per_device_train_batch_size"] = gpu_config[
        "per_device_batch_size"
    ]
    config["training_parameters"]["gradient_accumulation_steps"] = gpu_config[
        "gradient_accumulation"
    ]
    config["training_parameters"]["bf16"] = gpu_config["bf16"]
    config["training_parameters"]["fp16"] = gpu_config["fp16"]

    # Paths
    config["training_parameters"]["output_dir"] = str(checkpoint_dir)

    # Checkpoint settings
    config["training_parameters"]["save_strategy"] = "steps"
    config["training_parameters"]["save_steps"] = 100
    config["training_parameters"]["save_total_limit"] = 2

    # W&B integration
    config["training_parameters"]["report_to"] = "wandb"
    config["training_parameters"]["run_name"] = f"pixelated-{stage}-{gpu_type}"

    # Colab-specific optimizations
    if "h100_optimizations" not in config:
        config["h100_optimizations"] = {}

    config["h100_optimizations"]["gradient_checkpointing"] = True
    config["h100_optimizations"]["flash_attention"] = True

    # Stage-specific
    if stage == "stage1":
        config["training_parameters"]["num_train_epochs"] = 1
        config["training_parameters"]["learning_rate"] = 2e-4
        config["training_parameters"]["warmup_steps"] = 50
    elif stage == "stage2":
        config["training_parameters"]["num_train_epochs"] = 2
        config["training_parameters"]["learning_rate"] = 5e-5
        config["training_parameters"]["warmup_steps"] = 25

    return config


def main():
    parser = argparse.ArgumentParser(description="Stage 1 Training on Google Colab Pro")
    parser.add_argument(
        "--stage",
        type=str,
        default="stage1",
        choices=["stage1", "stage2", "stage3"],
        help="Training stage",
    )
    parser.add_argument("--data-dir", type=str, default="/content/data", help="Data directory")
    parser.add_argument(
        "--checkpoint-dir", type=str, default="/content/checkpoints", help="Checkpoint directory"
    )
    parser.add_argument("--base-config", type=str, default=None, help="Base training config file")
    parser.add_argument(
        "--setup-only", action="store_true", help="Only setup environment, don't train"
    )
    parser.add_argument("--skip-setup", action="store_true", help="Skip environment setup")
    parser.add_argument(
        "--hf-repo", type=str, default=None, help="Hugging Face repo ID (e.g., username/model-name)"
    )
    parser.add_argument(
        "--hf-private", action="store_true", default=True, help="Make Hugging Face repo private"
    )
    parser.add_argument("--skip-hf-upload", action="store_true", help="Skip Hugging Face upload")

    args = parser.parse_args()

    logger.info("=" * 60)
    logger.info("Stage 1 Foundation Training - Google Colab Pro")
    logger.info("=" * 60)

    # Setup environment
    if not args.skip_setup:
        setup_colab_environment()

    if args.setup_only:
        logger.info("Setup complete. Exiting.")
        return

    # Create directories
    data_dir = Path(args.data_dir)
    checkpoint_dir = Path(args.checkpoint_dir)
    data_dir.mkdir(parents=True, exist_ok=True)
    checkpoint_dir.mkdir(parents=True, exist_ok=True)

    # Load S3 credentials from environment
    env_vars = {
        "OVH_S3_ACCESS_KEY": os.environ.get("OVH_S3_ACCESS_KEY"),
        "OVH_S3_SECRET_KEY": os.environ.get("OVH_S3_SECRET_KEY"),
        "OVH_S3_BUCKET": os.environ.get("OVH_S3_BUCKET", "pixel-data"),
        "OVH_S3_ENDPOINT": os.environ.get(
            "OVH_S3_ENDPOINT", "https://s3.us-east-va.io.cloud.ovh.us"
        ),
        "OVH_S3_REGION": os.environ.get("OVH_S3_REGION", "us-east-va"),
    }

    # Download datasets
    if not (data_dir / "compiled_dataset").exists():
        download_datasets_colab(data_dir, env_vars)

    # Load base config
    if args.base_config and Path(args.base_config).exists():
        with open(args.base_config) as f:
            base_config = json.load(f)
    else:
        # Default config
        base_config = {
            "model_name": "LatitudeGames/Wayfarer-2-12B",
            "dataset_config": {},
            "training_parameters": {
                "max_seq_length": 4096,
                "logging_steps": 10,
            },
        }

    # Create Colab config
    colab_config = create_colab_config(base_config, data_dir, checkpoint_dir, args.stage)

    # Initialize W&B
    gpu_type = detect_gpu_type()
    run_name = f"pixelated-{args.stage}-{gpu_type}-{os.environ.get('USER', 'colab')}"
    wandb_run = init_wandb("pixelated-empathy", run_name, colab_config)

    # Save config
    config_path = checkpoint_dir / f"colab_{args.stage}_config.json"
    with open(config_path, "w") as f:
        json.dump(colab_config, f, indent=2)

    logger.info(f"Config saved to: {config_path}")

    # Import and run training
    try:
        # Add paths
        sys.path.insert(0, "/content/ai/training")
        sys.path.insert(
            0, str(Path(__file__).parent.parent.parent.parent.parent / "ai" / "training")
        )

        from train_pixel import PixelTrainer

        logger.info(f"Starting {args.stage} training on Colab...")
        logger.info(f"GPU: {detect_gpu_type().upper()}")

        trainer = PixelTrainer(str(config_path))
        trainer.train()

        logger.info(f"✅ {args.stage.upper()} training completed!")

        # Save completion marker
        (checkpoint_dir / f"{args.stage}_COMPLETE").touch()

        # Upload to Hugging Face
        if not args.skip_hf_upload:
            repo_id = args.hf_repo or os.environ.get("HF_REPO_ID")
            upload_to_huggingface(
                checkpoint_dir,
                repo_id,
                stage=args.stage,
                private=args.hf_private,
            )

        # Finish W&B run
        if wandb_run:
            import wandb

            wandb.finish()

    except Exception as e:
        logger.error(f"❌ Training failed: {e}")
        import traceback

        traceback.print_exc()

        # Finish W&B run on error
        if wandb_run:
            import wandb

            wandb.finish()

        raise


if __name__ == "__main__":
    main()
