# Harbinger-24B QLoRA Fine-tuning — Difficult Client Simulator
# This is a script mirror of the Jupyter notebook for environments where editing .ipynb is inconvenient.

# %% [markdown]
"""
This script fine-tunes `LatitudeGames/Harbinger-24B` to role-play as challenging therapy clients using the existing dual-persona datasets in `ai/pipelines/dual_persona_training/` and other curated corpora like `ai/datasets/merged_mental_health_dataset.jsonl`.

It uses 4-bit loading + LoRA (QLoRA). Outputs are PEFT adapters under `ai/training/checkpoints/`.
"""

# %%
# pip installs (optional here; recommended to install via project pyproject)
# pip install -U "transformers>=4.42.0" "datasets>=2.19.0" "accelerate>=0.33.0" \
#               "bitsandbytes>=0.43.0" "peft>=0.11.0" "trl>=0.9.6" sentencepiece einops

import glob as _glob
import json
import logging
import os
import warnings
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Protocol, cast, runtime_checkable

import datasets as hfds
import torch
from peft import LoraConfig, TaskType, get_peft_model
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.data.data_collator import DataCollatorForLanguageModeling
from transformers.trainer import Trainer
from transformers.trainer_callback import EarlyStoppingCallback
from transformers.training_args import TrainingArguments
from transformers.utils.quantization_config import BitsAndBytesConfig

hfds = cast(Any, hfds)

warnings.filterwarnings("ignore")
logger = logging.getLogger(__name__)
if not logging.getLogger().handlers:
    logging.basicConfig(level=logging.INFO)
BASE_DIR = Path(__file__).resolve().parents[2]
logger.info("BASE_DIR: %s", BASE_DIR)


# %%
@dataclass
class TrainCfg:
    base_model: str = "LatitudeGames/Harbinger-24B"
    out_dir: str = "ai/training/checkpoints/harbinger24b-difficult-client-qlora"
    project: str = "pixelated-empathy-difficult-client"
    use_wandb: bool = True
    wandb_run_name: str | None = "harbinger24b-qlora-difficult-client"
    # Data
    dual_persona_dir: str = "ai/pipelines/dual_persona_training"
    extra_jsonl: list[str] = field(
        default_factory=lambda: ["ai/datasets/merged_mental_health_dataset.jsonl"]
    )
    max_samples: int | None = None
    use_curriculum: bool = True
    curriculum_glob: str = "curriculum_phase_*.jsonl"
    epochs_per_phase: int = 1
    # Curriculum learning enhancements
    adaptive_curriculum: bool = True  # Adjust epochs based on phase performance
    curriculum_loss_threshold: float = 0.1  # Move to next phase when loss improvement < threshold
    min_epochs_per_phase: int = 1
    max_epochs_per_phase: int = 3
    # Tokenization / lengths
    max_seq_len: int = 4096
    # Training
    num_epochs: int = 1
    per_device_train_batch_size: int = 2  # Increase for H100
    gradient_accumulation_steps: int = 4  # Reduce since batch size increased
    learning_rate: float = 2e-4
    warmup_steps: int = 50
    weight_decay: float = 0.01  # Add weight decay for regularization
    logging_steps: int = 10
    save_steps: int = 200
    eval_steps: int = 100  # More frequent evaluation
    # QLoRA
    lora_r: int = 16
    lora_alpha: int = 32
    lora_dropout: float = 0.1  # Increase dropout for regularization
    target_modules: tuple[str, ...] = (
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
        "gate_proj",
        "up_proj",
        "down_proj",
    )
    # H100-friendly toggles
    use_flash_attn: bool = True  # Enable for H100 performance boost
    # HuggingFace upload settings
    upload_to_hf: bool = True
    hf_repo_id: str = "pixelated-empathy/harbinger24b-difficult-client"
    hf_token: str | None = None  # Will use HF_TOKEN env var if not provided
    create_gguf: bool = True
    gguf_quantization: str = "Q4_K_M"  # Good balance of size vs quality


cfg = TrainCfg()
logger.info(json.dumps(asdict(cfg), indent=2))
OUT_DIR = BASE_DIR / cfg.out_dir
OUT_DIR.mkdir(parents=True, exist_ok=True)

# %%
# Data loading

DUAL_DIR = BASE_DIR / cfg.dual_persona_dir
train_files: list[str] = []
val_files: list[str] = []
if (DUAL_DIR / "training_data.jsonl").exists():
    train_files.append(str(DUAL_DIR / "training_data.jsonl"))
if (DUAL_DIR / "validation_data.jsonl").exists():
    val_files.append(str(DUAL_DIR / "validation_data.jsonl"))

for p in cfg.extra_jsonl:
    pth = BASE_DIR / p
    if pth.exists():
        train_files.append(str(pth))

# Detect curriculum files
curriculum_files: list[str] = []
if cfg.use_curriculum:
    curriculum_files = sorted(_glob.glob(str(DUAL_DIR / cfg.curriculum_glob)))
    if curriculum_files:
        logger.info("Found curriculum phases:")
        for f in curriculum_files:
            logger.info(" - %s", Path(f).name)
    else:
        logger.info("No curriculum phases found (use_curriculum=%s)", cfg.use_curriculum)

# Log selected dataset files
if train_files:
    logger.info("Training files (%s):", len(train_files))
    for f in train_files:
        logger.info(" - %s", f)
else:
    logger.warning("No training files discovered; check paths in cfg")

if val_files:
    logger.info("Validation files (%s):", len(val_files))
    for f in val_files:
        logger.info(" - %s", f)
else:
    logger.info("No validation files found; evaluation will be disabled")

# Hard fail if no training files
if not train_files:
    raise ValueError(
        "No training files found. Ensure paths in cfg.dual_persona_dir and cfg.extra_jsonl exist."
    )


def load_jsonl_files(files: list[str]):
    if not files:
        return None
    ds_list = [cast(Any, hfds).load_dataset("json", data_files=f, split="train") for f in files]
    return ds_list[0] if len(ds_list) == 1 else cast(Any, hfds).concatenate_datasets(ds_list)


raw_train = load_jsonl_files(train_files)
raw_val = load_jsonl_files(val_files)


def _safe_len(obj):
    try:
        return len(obj)
    except Exception:
        return "unknown"


logger.info(
    "Loaded train: %s val: %s",
    _safe_len(raw_train) if raw_train else 0,
    _safe_len(raw_val) if raw_val else 0,
)


def is_dataset(obj) -> bool:
    # Duck-typing check for Hugging Face Dataset
    return (
        obj is not None
        and hasattr(obj, "select")
        and hasattr(obj, "map")
        and hasattr(obj, "__len__")
    )


def get_column_safe(ds, name: str):
    if not is_dataset(ds):
        return []
    try:
        return list(cast(Any, ds)[name])
    except Exception:
        return []


@runtime_checkable
class HasLen(Protocol):
    def __len__(self) -> int: ...


def get_len(obj: Any) -> int:
    try:
        if not is_dataset(obj):
            return 0
        if isinstance(obj, HasLen):
            return obj.__len__()
        return 0
    except Exception:
        return 0


if cfg.max_samples:
    if is_dataset(raw_train):
        raw_train = cast(Any, raw_train).select(range(min(cfg.max_samples, get_len(raw_train))))
    if is_dataset(raw_val):
        raw_val = cast(Any, raw_val).select(range(min(cfg.max_samples, get_len(raw_val))))


def extract_text(example):
    # Flexible schema handling
    if "messages" in example and isinstance(example["messages"], list):
        parts = []
        for m in example["messages"]:
            role = str(m.get("role", "")).lower()
            content = m.get("content", "")
            if content:
                parts.append(f"<{role}>: {content}")
        return "\n".join(parts)
    if "instruction" in example and "output" in example:
        inp = example.get("input", "")
        return (
            "<system>: You are a difficult therapy client.\n"
            f"<user>: {example['instruction']} {inp}\n"
            f"<assistant>: {example['output']}"
        )
    if "text" in example:
        return str(example["text"])
    try:
        return json.dumps(example, ensure_ascii=False)
    except Exception:
        return str(example)


def mark_difficult_client(example):
    tags = set(str(example.get("tags", "")).lower().split())
    title = str(example.get("title", "")).lower()
    purpose = str(example.get("purpose", "")).lower()
    is_client = any(
        k in purpose or k in title or k in tags
        for k in ["client", "difficult", "resistant", "confrontational", "hostile"]
    )
    example["__is_client__"] = bool(is_client)
    return example


if raw_train:
    raw_train = raw_train.map(mark_difficult_client)
if raw_val:
    raw_val = raw_val.map(mark_difficult_client)

_train_client_count = 0
if is_dataset(raw_train) and "__is_client__" in getattr(raw_train, "column_names", []):
    try:
        arr = get_column_safe(raw_train, "__is_client__")
        _train_client_count = int(sum(bool(x) for x in list(arr)))
    except Exception:
        _train_client_count = 0
logger.info("train difficult_client count: %s", _train_client_count)

_val_client_count = 0
if is_dataset(raw_val) and "__is_client__" in getattr(raw_val, "column_names", []):
    try:
        arr = get_column_safe(raw_val, "__is_client__")
        _val_client_count = int(sum(bool(x) for x in list(arr)))
    except Exception:
        _val_client_count = 0
logger.info("val difficult_client count: %s", _val_client_count)

# %%
# Model & quantization

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=(
        torch.bfloat16
        if torch.cuda.is_available() and torch.cuda.is_bf16_supported()
        else torch.float16
    ),
)

tokenizer = AutoTokenizer.from_pretrained(cfg.base_model, use_fast=True)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    cfg.base_model,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
model.config.use_cache = False
if cfg.use_flash_attn and hasattr(model.config, "attn_implementation"):
    try:
        model.config.attn_implementation = "flash_attention_2"
        logger.info("Using FlashAttention-2")
    except Exception as e:
        logger.warning("FlashAttention toggle failed: %s", e)

lora_cfg = LoraConfig(
    r=cfg.lora_r,
    lora_alpha=cfg.lora_alpha,
    lora_dropout=cfg.lora_dropout,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
    target_modules=list(cfg.target_modules),
)
model = get_peft_model(model, lora_cfg)
model.print_trainable_parameters()

# %%
SYSTEM_PROMPT = (
    "You are role-playing as a DIFFICULT therapy client. "
    "Demonstrate realistic resistance, avoidance, hostility, or ambivalence, "
    "while staying plausible and coherent. Avoid slurs/personal data."
)


def format_example_for_sft(text: str) -> str:
    return (
        "<s>\n<system>\n"
        f"{SYSTEM_PROMPT}\n"
        "</system>\n<user>\n"
        "Therapist prompt: [context omitted]\n"
        "</user>\n<assistant>\n"
        f"{text}\n"
        "</assistant>\n</s>"
    )


def to_sft(ds):
    if ds is None:
        return None
    return ds.map(
        lambda ex: {"text": format_example_for_sft(extract_text(ex))},
        remove_columns=[c for c in ds.column_names if c != "text"],
    )


sft_train = to_sft(raw_train)
sft_val = to_sft(raw_val)
_sample_preview = None
if sft_train:
    try:
        get_item = getattr(sft_train, "__getitem__", None)
        if callable(get_item):
            sample0 = get_item(0)
            if isinstance(sample0, dict) and "text" in sample0:
                _sample_preview = str(sample0["text"])[:500]
    except Exception:
        _sample_preview = None
if _sample_preview:
    logger.info(_sample_preview)
else:
    logger.info("no train sample")

# %%
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

args = TrainingArguments(
    output_dir=str(OUT_DIR),
    num_train_epochs=cfg.num_epochs,
    per_device_train_batch_size=cfg.per_device_train_batch_size,
    per_device_eval_batch_size=max(1, cfg.per_device_train_batch_size),
    gradient_accumulation_steps=cfg.gradient_accumulation_steps,
    learning_rate=cfg.learning_rate,
    warmup_steps=cfg.warmup_steps,
    weight_decay=cfg.weight_decay,
    logging_steps=cfg.logging_steps,
    save_steps=cfg.save_steps,
    eval_steps=cfg.eval_steps,
    evaluation_strategy="steps" if sft_val else "no",  # type: ignore[call-arg]
    save_strategy="steps",
    save_total_limit=3,  # Keep more checkpoints
    lr_scheduler_type="cosine",
    report_to=["wandb"] if cfg.use_wandb else [],
    run_name=cfg.wandb_run_name,
    load_best_model_at_end=bool(sft_val),
    metric_for_best_model="eval_loss" if sft_val else None,
    greater_is_better=False if sft_val else None,
    bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
    fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
    gradient_checkpointing=True,
    gradient_checkpointing_kwargs={"use_reentrant": False},
    dataloader_pin_memory=True,  # Enable for H100
    dataloader_num_workers=4,  # Parallel data loading
    remove_unused_columns=False,
    # Additional memory optimizations
    max_grad_norm=1.0,  # Gradient clipping
    ddp_find_unused_parameters=False,
)


def tokenize_fn(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        max_length=cfg.max_seq_len,
        padding="max_length",
        return_tensors=None,
    )


tok_train = sft_train.map(tokenize_fn, batched=True, remove_columns=["text"]) if sft_train else None

tok_val = sft_val.map(tokenize_fn, batched=True, remove_columns=["text"]) if sft_val else None

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tok_train,
    eval_dataset=tok_val,
    data_collator=data_collator,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=5)] if tok_val else [],
)

# %%
if cfg.use_wandb:
    import wandb

    # Prefer environment variable for security; do not hardcode tokens
    _wandb_key = os.environ.get("WANDB_API_KEY")
    if _wandb_key:
        try:
            wandb.login(key=_wandb_key)
            logger.info("W&B login succeeded via WANDB_API_KEY env var")
        except Exception as e:
            logger.warning("W&B login failed: %s", e)
    else:
        logger.warning("WANDB_API_KEY not set. Set it in your environment to enable W&B logging.")

    wandb.init(
        project=cfg.project,
        name=cfg.wandb_run_name,
        config=asdict(cfg),
    )
    try:
        # Model watching can be heavy; log grads/params every logging_steps
        wandb.watch(model, log="all", log_freq=max(1, cfg.logging_steps))
    except Exception as e:
        logger.warning("wandb.watch failed: %s", e)


# --- Curriculum-aware training loop ---
def build_tok_from_raw(ds):
    sft = to_sft(ds)
    if not sft:
        return None
    return sft.map(tokenize_fn, batched=True, remove_columns=["text"])


results_dir = OUT_DIR / "results"
results_dir.mkdir(parents=True, exist_ok=True)

if curriculum_files:
    logger.info("Starting curriculum training across %s phases", len(curriculum_files))
    phase_metrics = []  # Track performance across phases

    for i, phase_path in enumerate(curriculum_files, start=1):
        phase_name = Path(phase_path).stem
        logger.info("\n=== Phase %s/%s: %s ===", i, len(curriculum_files), phase_name)
        phase_raw = load_jsonl_files([phase_path])
        if cfg.max_samples and is_dataset(phase_raw):
            phase_raw = cast(Any, phase_raw).select(range(min(cfg.max_samples, get_len(phase_raw))))
        tok_phase = build_tok_from_raw(phase_raw)
        if tok_phase is None or len(tok_phase) == 0:
            logger.info("Phase has no data, skipping.")
            continue
        trainer.train_dataset = tok_phase

        # Adaptive curriculum: determine epochs for this phase
        if cfg.adaptive_curriculum and i > 1:
            # Check improvement from previous phase
            prev_loss = phase_metrics[-1]["final_loss"]
            if len(phase_metrics) > 1:
                improvement = phase_metrics[-2]["final_loss"] - prev_loss
                if improvement < cfg.curriculum_loss_threshold:
                    phase_epochs = min(cfg.max_epochs_per_phase, cfg.epochs_per_phase + 1)
                    logger.info(
                        "Small improvement (%.4f), extending to %d epochs",
                        improvement,
                        phase_epochs,
                    )
                else:
                    phase_epochs = cfg.epochs_per_phase
            else:
                phase_epochs = cfg.epochs_per_phase
        else:
            phase_epochs = cfg.epochs_per_phase

        # Ensure minimum epochs
        phase_epochs = max(cfg.min_epochs_per_phase, phase_epochs)
        trainer.args.num_train_epochs = phase_epochs
        logger.info("Training phase %s for %d epochs", phase_name, phase_epochs)

        # Train this phase
        train_result = trainer.train(resume_from_checkpoint=True)

        # Record phase metrics
        final_loss = train_result.training_loss if hasattr(train_result, "training_loss") else None
        phase_metrics.append(
            {
                "phase": i,
                "phase_name": phase_name,
                "epochs_trained": phase_epochs,
                "final_loss": final_loss,
            }
        )

        # Log to wandb if available
        if cfg.use_wandb:
            try:
                import wandb

                wandb.log(
                    {
                        f"phase_{i}_loss": final_loss,
                        f"phase_{i}_epochs": phase_epochs,
                        "current_phase": i,
                    }
                )
            except Exception as e:
                logger.warning("Failed to log phase metrics to wandb: %s", e)

        # Qualitative eval after each phase
        sample_prompts = [
            "Therapist: Can you tell me what brought you in today?\nClient:",
            "Therapist: You mentioned feeling frustrated. What's contributing to that?\nClient:",
            "Therapist: What would feel different if things were going better?\nClient:",
        ]
        generations = []
        for p in sample_prompts:
            inputs = tokenizer(p, return_tensors="pt").to(model.device)
            with torch.no_grad():
                out = model.generate(
                    **inputs,
                    max_new_tokens=200,
                    temperature=0.9,
                    do_sample=True,
                    top_p=0.9,
                )
            generations.append(tokenizer.decode(out[0], skip_special_tokens=True))
        with open(results_dir / f"generations_{i:02d}_{phase_name}.txt", "w") as f:
            f.write("\n\n".join(generations))
        logger.info("Saved qualitative generations for %s -> %s", phase_name, results_dir)

    # Summary of curriculum performance
    logger.info("\n=== Curriculum Training Summary ===")
    for metrics in phase_metrics:
        logger.info(
            "Phase %d (%s): Loss %.4f, Epochs %d",
            metrics["phase"],
            metrics["phase_name"],
            metrics["final_loss"] or 0.0,
            metrics["epochs_trained"],
        )

    # Log final curriculum summary to wandb
    if cfg.use_wandb and phase_metrics:
        try:
            import wandb

            best_phase = min(phase_metrics, key=lambda x: x["final_loss"] or float("inf"))
            wandb.log(
                {
                    "best_loss": best_phase["final_loss"],
                    "total_phases": len(phase_metrics),
                    "final_quality": 4,  # You can make this dynamic based on evaluation
                }
            )
        except Exception as e:
            logger.warning("Failed to log curriculum summary: %s", e)
else:
    # Single-pass training on combined dataset
    trainer.train(resume_from_checkpoint=True)

# Save PEFT adapter and tokenizer
model.save_pretrained(OUT_DIR)
tokenizer.save_pretrained(OUT_DIR)
with open(OUT_DIR / "training_config.json", "w") as f:
    json.dump(asdict(cfg), f, indent=2)
logger.info("Saved to %s", OUT_DIR)

# %%
# Final evaluation and W&B summary
final_eval = None
if sft_val:
    try:
        final_eval = trainer.evaluate()
        logger.info("Final eval metrics: %s", final_eval)
    except Exception as e:
        logger.warning("Final evaluation failed: %s", e)

if cfg.use_wandb:
    try:
        import wandb

        if final_eval:
            wandb.log(final_eval)
            # Also persist to run summary for quick viewing, if a run is active
            _run = getattr(wandb, "run", None)
            _summary = getattr(_run, "summary", None) if _run is not None else None
            if _summary is not None and hasattr(_summary, "update"):
                _summary.update(final_eval)
            else:
                logger.info("W&B run not active or summary unavailable; skipping summary.update")
    except Exception as e:
        logger.warning("W&B summary logging failed: %s", e)

# Quick inference sanity-check
prompt = "Therapist: Can you tell me what brought you in today?\nClient:"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
with torch.no_grad():
    out = model.generate(**inputs, max_new_tokens=200, temperature=0.9, do_sample=True)
logger.info("Final inference test:\n%s", tokenizer.decode(out[0], skip_special_tokens=True))

# %%
# HuggingFace Upload and GGUF Conversion
if cfg.upload_to_hf:
    try:
        import shutil
        import subprocess

        from huggingface_hub import HfApi, create_repo, login

        logger.info("\n=== Starting HuggingFace Upload Process ===")

        # Login to HuggingFace
        hf_token = cfg.hf_token or os.environ.get("HF_TOKEN")
        if not hf_token:
            logger.warning(
                "No HF_TOKEN found. Please set HF_TOKEN environment variable or cfg.hf_token"
            )
        else:
            try:
                login(token=hf_token, write_permission=True)
                logger.info("Successfully logged in to HuggingFace Hub")
            except Exception as e:
                logger.error("HuggingFace login failed: %s", e)
                raise

        # Create repository if it doesn't exist
        api = HfApi()
        try:
            create_repo(
                repo_id=cfg.hf_repo_id,
                token=hf_token,
                private=False,
                exist_ok=True,
                repo_type="model",
            )
            logger.info("Repository %s created/verified", cfg.hf_repo_id)
        except Exception as e:
            logger.warning("Repository creation warning: %s", e)

        # Prepare upload directory
        upload_dir = OUT_DIR / "hf_upload"
        upload_dir.mkdir(exist_ok=True)

        # Copy model files
        logger.info("Preparing model files for upload...")
        for file_pattern in ["*.json", "*.safetensors", "*.bin", "*.txt"]:
            for file_path in OUT_DIR.glob(file_pattern):
                shutil.copy2(file_path, upload_dir)
                logger.info("Copied %s", file_path.name)

        # Create model card
        model_card_content = f"""---
license: apache-2.0
base_model: {cfg.base_model}
tags:
- therapy
- difficult-client
- role-play
- mental-health
- peft
- lora
- qlora
library_name: peft
---

# Harbinger-24B Difficult Client Simulator

This model is a QLoRA fine-tuned version of `{cfg.base_model}` designed to simulate challenging therapy clients for training purposes.

## Model Details

- **Base Model**: {cfg.base_model}
- **Training Method**: QLoRA (4-bit quantization + LoRA adapters)
- **Training Data**: Dual persona datasets and mental health corpora
- **Curriculum Learning**: 3-phase adaptive curriculum
- **Final Loss**: {final_eval.get("eval_loss", "N/A") if final_eval else "N/A"}

## Usage

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "{cfg.base_model}",
    load_in_4bit=True,
    device_map="auto"
)

# Load adapter
model = PeftModel.from_pretrained(base_model, "{cfg.hf_repo_id}")
tokenizer = AutoTokenizer.from_pretrained("{cfg.hf_repo_id}")

# Generate response
prompt = "Therapist: Can you tell me what brought you in today?\\nClient:"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=200, temperature=0.9)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

## Training Configuration

- **LoRA Rank**: {cfg.lora_r}
- **LoRA Alpha**: {cfg.lora_alpha}
- **LoRA Dropout**: {cfg.lora_dropout}
- **Learning Rate**: {cfg.learning_rate}
- **Batch Size**: {cfg.per_device_train_batch_size} (per device)
- **Gradient Accumulation**: {cfg.gradient_accumulation_steps}

## Intended Use

This model is designed for:
- Training therapists to handle difficult client scenarios
- Research into therapeutic communication patterns
- Educational simulations in clinical psychology

## Limitations

- This is a role-playing model and should not be used for actual therapy
- Responses may contain challenging or resistant behaviors by design
- Always use under professional supervision in training contexts
"""

        with open(upload_dir / "README.md", "w") as f:
            f.write(model_card_content)
        logger.info("Created model card")

        # Upload to HuggingFace Hub
        logger.info("Uploading to HuggingFace Hub: %s", cfg.hf_repo_id)
        api.upload_folder(
            folder_path=str(upload_dir),
            repo_id=cfg.hf_repo_id,
            token=hf_token,
            commit_message=f"Upload Harbinger-24B difficult client adapter (final_loss: {final_eval.get('eval_loss', 'N/A') if final_eval else 'N/A'})",
        )
        logger.info("✅ Successfully uploaded model to HuggingFace Hub!")

        # GGUF Conversion
        if cfg.create_gguf:
            logger.info("\n=== Starting GGUF Conversion ===")
            try:
                # Merge PEFT adapter with base model for GGUF conversion
                logger.info("Merging PEFT adapter with base model...")
                merged_model = model.merge_and_unload()

                # Save merged model temporarily
                merged_dir = OUT_DIR / "merged_model"
                merged_dir.mkdir(exist_ok=True)
                merged_model.save_pretrained(merged_dir)
                tokenizer.save_pretrained(merged_dir)

                # Convert to GGUF using llama.cpp
                gguf_dir = OUT_DIR / "gguf"
                gguf_dir.mkdir(exist_ok=True)

                logger.info(
                    "Converting to GGUF format (quantization: %s)...", cfg.gguf_quantization
                )

                # Note: This requires llama.cpp to be installed
                # You might need to adjust paths based on your llama.cpp installation
                convert_cmd = [
                    "python",
                    "-m",
                    "llama_cpp.convert",
                    "--model",
                    str(merged_dir),
                    "--outfile",
                    str(
                        gguf_dir
                        / f"harbinger-24b-difficult-client-{cfg.gguf_quantization.lower()}.gguf"
                    ),
                    "--quantization",
                    cfg.gguf_quantization,
                ]

                result = subprocess.run(convert_cmd, capture_output=True, text=True, check=False)
                if result.returncode == 0:
                    logger.info("✅ GGUF conversion successful!")

                    # Upload GGUF to HuggingFace
                    logger.info("Uploading GGUF to HuggingFace...")
                    api.upload_folder(
                        folder_path=str(gguf_dir),
                        repo_id=cfg.hf_repo_id,
                        token=hf_token,
                        path_in_repo="gguf/",
                        commit_message=f"Add GGUF quantized model ({cfg.gguf_quantization})",
                    )
                    logger.info("✅ GGUF uploaded successfully!")
                else:
                    logger.error("GGUF conversion failed: %s", result.stderr)
                    logger.info("You may need to install llama.cpp: pip install llama-cpp-python")

                # Cleanup
                shutil.rmtree(merged_dir, ignore_errors=True)

            except Exception as e:
                logger.error("GGUF conversion failed: %s", e)
                logger.info("Continuing without GGUF conversion...")

        # Log final URLs
        logger.info("\n=== Upload Complete ===")
        logger.info("🤗 Model: https://huggingface.co/%s", cfg.hf_repo_id)
        if cfg.create_gguf:
            logger.info("📦 GGUF: https://huggingface.co/%s/tree/main/gguf", cfg.hf_repo_id)

        # Update wandb with HF links
        if cfg.use_wandb:
            try:
                import wandb

                wandb.log(
                    {
                        "hf_repo_url": f"https://huggingface.co/{cfg.hf_repo_id}",
                        "upload_successful": True,
                    }
                )
            except Exception as e:
                logger.warning("Failed to log HF URLs to wandb: %s", e)

    except Exception as e:
        logger.error("HuggingFace upload failed: %s", e)
        logger.info("Model saved locally at: %s", OUT_DIR)
else:
    logger.info("HuggingFace upload disabled (cfg.upload_to_hf=False)")
