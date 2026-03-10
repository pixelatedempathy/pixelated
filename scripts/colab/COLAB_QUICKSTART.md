# Colab Quickstart (No Upload Needed)

If file upload fails with JSON errors, use this method instead.

## Method 1: Download Directly (Recommended)

Create a new Colab notebook and run:

```python
# Download training script directly
!wget -q https://raw.githubusercontent.com/vivirox/pixelated/main/scripts/colab/train_lightning_standalone.py -O train.py

# Verify it downloaded
!ls -la train.py
!head -20 train.py
```

## Method 2: Copy-Paste

If wget also fails, copy the script content below into a cell.

## Environment Setup

```python
import os

# Required
os.environ['OVH_S3_ACCESS_KEY'] = 'b6939e6b65ef4252b20338499421a5f0'
os.environ['OVH_S3_SECRET_KEY'] = '4a7e939381c6467c88f81a5024672a96'
os.environ['OVH_S3_BUCKET'] = 'pixel-data'
os.environ['OVH_S3_ENDPOINT'] = 'https://s3.us-east-va.io.cloud.ovh.us'

# Optional
os.environ['WANDB_API_KEY'] = 'your-wandb-key'
os.environ['HF_TOKEN'] = 'hf_your-token'
```

## Run Training

```python
!python train.py --stage stage1 --data-dir /content/data --checkpoint-dir /content/checkpoints
```

## Full Script (Copy-Paste)

If all else fails, copy this entire script into a file called `train.py`:

```python
#!/usr/bin/env python3
"""Lightning.ai Training Entry Point - Standalone Version"""

import argparse
import logging
import os
import sys
from pathlib import Path

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
        s3_endpoint = os.environ.get("OVH_S3_ENDPOINT", "https://s3.us-east-va.io.cloud.ovh.us")
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
        
        data_dir.mkdir(parents=True, exist_ok=True)
        
        # Try to download key files
        keys = ["compiled_dataset/train.jsonl", "compiled_dataset/val.jsonl"]
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


def train_simple(data_dir: Path, checkpoint_dir: Path, stage: str = "stage1"):
    """Simple training stub."""
    logger.info(f"Starting {stage} training...")
    logger.info(f"Data: {data_dir}")
    logger.info(f"Checkpoints: {checkpoint_dir}")
    
    # Install deps
    logger.info("Installing dependencies...")
    os.system("pip install -q torch transformers datasets accelerate peft bitsandbytes")
    
    # Create markers
    checkpoint_dir.mkdir(parents=True, exist_ok=True)
    (checkpoint_dir / f"{stage}_STARTED").touch()
    
    logger.info("✅ Training stub complete")
    logger.info("Note: Implement actual training with Unsloth/Transformers")
    (checkpoint_dir / f"{stage}_COMPLETE").touch()


def main():
    parser = argparse.ArgumentParser(description="Lightning.ai Training")
    parser.add_argument("--stage", default="stage1")
    parser.add_argument("--data-dir", default="/app/data")
    parser.add_argument("--checkpoint-dir", default="/checkpoints")
    args = parser.parse_args()
    
    logger.info("=" * 60)
    logger.info("Lightning.ai Training - Standalone")
    logger.info("=" * 60)
    
    data_dir = Path(args.data_dir)
    checkpoint_dir = Path(args.checkpoint_dir)
    
    train_simple(data_dir, checkpoint_dir, args.stage)


if __name__ == "__main__":
    main()
```

Save this as `train.py` and run it.

## Troubleshooting Upload Errors

If you see `JSON.parse: unexpected character`:

1. **Don't use the upload button** - use `!wget` instead
2. Clear browser cache and refresh
3. Try incognito/private browsing mode
4. Use a different browser (Firefox instead of Chrome)

## Alternative: Git Clone

```python
# Clone entire repo
!git clone https://github.com/vivirox/pixelated.git
%cd pixelated
!python scripts/colab/train_lightning_standalone.py --stage stage1
```
