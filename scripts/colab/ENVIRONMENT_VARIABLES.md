# Environment Variables Reference

Complete list of all environment variables needed for training.

## Required Variables (All Methods)

### S3/OVH Cloud Storage
These are REQUIRED for downloading datasets:

```bash
OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
OVH_S3_BUCKET=pixel-data
OVH_S3_ENDPOINT=https://s3.us-east-va.io.cloud.ovh.us
OVH_S3_REGION=us-east-va
```

**Where to get these:**
- Log into https://cloud.ovh.us/
- Go to Object Storage → Users → Create/View credentials

### Lightning.ai (Cloud Training)

```bash
LIGHTNING_USER_ID=6c54d3e6-ead2-464f-a379-c6d3e1a855a7
LIGHTNING_API_KEY=8bd0e2f0-f1c8-4246-a8ec-41ddd852f664
```

**Where to get these:**
- Log into https://lightning.ai/
- Go to Settings → API Keys
- Or grab from browser cookies/network tab

## Optional Variables

### Weights & Biases (Monitoring)

```bash
WANDB_API_KEY=your-wandb-key-here
WANDB_PROJECT=pixelated-empathy
WANDB_ENTITY=your-username
```

**Where to get these:**
- Sign up at https://wandb.ai/
- Go to https://wandb.ai/authorize
- Copy your API key

### Hugging Face Hub (Model Upload)

```bash
HF_TOKEN=hf_your-token-here
HF_USERNAME=your-username
HF_REPO_ID=your-username/pixelated-empathy-stage1
```

**Where to get these:**
- Log into https://huggingface.co/
- Go to Settings → Access Tokens
- Create a new token with "Write" permission

### Slack Notifications

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_NOTIFY_CONTEXT="Stage 1 Foundation Training"
```

**Where to get these:**
- Go to your Slack workspace
- Create an Incoming Webhook app
- Copy the webhook URL

### Training Configuration Overrides

```bash
# Override defaults
TRAINING_STAGE=stage1              # stage1, stage2, stage3
GPU_FLAVOR=l40s-1-gpu              # GPU type (for logging)
GPU_COUNT=1                        # Number of GPUs

# Checkpoint naming
CHECKPOINT_JOB_NAME=custom-name
CHECKPOINT_S3_KEY=checkpoints/custom/path
TIMESTAMP=1234567890               # Custom timestamp
```

### Python Environment (Advanced)

```bash
# Custom Python interpreter
LIGHTNING_PYTHON_BIN=/usr/bin/python3.11

# Runner mode
BATCH_RUNNER_MODE=uv              # uv or python
```

## Google Colab Specific

In Colab, set variables in a code cell:

```python
import os

# Required
os.environ['OVH_S3_ACCESS_KEY'] = 'b6939e6b65ef4252b20338499421a5f0'
os.environ['OVH_S3_SECRET_KEY'] = '4a7e939381c6467c88f81a5024672a96'
os.environ['OVH_S3_BUCKET'] = 'pixel-data'
os.environ['OVH_S3_ENDPOINT'] = 'https://s3.us-east-va.io.cloud.ovh.us'

# Optional - Monitoring
os.environ['WANDB_API_KEY'] = 'your-wandb-key'
os.environ['WANDB_PROJECT'] = 'pixelated-empathy'

# Optional - Model Upload
os.environ['HF_TOKEN'] = 'hf_your-token'
os.environ['HF_USERNAME'] = 'your-username'

print("✅ Environment variables set")
```

## Lightning.ai Specific

Pass as environment variables when running:

```bash
export LIGHTNING_USER_ID=6c54d3e6-ead2-464f-a379-c6d3e1a855a7
export LIGHTNING_API_KEY=8bd0e2f0-f1c8-4246-a8ec-41ddd852f664
export OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
export OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
export WANDB_API_KEY=your-wandb-key
export HF_TOKEN=hf_your-token

./scripts/ovh/run-stage1-training-lightning.sh --job-name my-training
```

## Complete .env File Template

Create a `.env` file in your project root:

```bash
# S3 Credentials (REQUIRED)
OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
OVH_S3_BUCKET=pixel-data
OVH_S3_ENDPOINT=https://s3.us-east-va.io.cloud.ovh.us
OVH_S3_REGION=us-east-va

# Lightning.ai (for cloud runs)
LIGHTNING_USER_ID=6c54d3e6-ead2-464f-a379-c6d3e1a855a7
LIGHTNING_API_KEY=8bd0e2f0-f1c8-4246-a8ec-41ddd852f664

# Weights & Biases (optional)
WANDB_API_KEY=your-wandb-key
WANDB_PROJECT=pixelated-empathy

# Hugging Face (optional)
HF_TOKEN=hf_your-token
HF_USERNAME=your-username

# Slack (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Security Notes

⚠️ **NEVER commit these to git!**

Add to `.gitignore`:
```
.env
*.env
secrets/
credentials/
```

## Quick Reference Table

| Variable | Required | Purpose | Method |
|----------|----------|---------|--------|
| `OVH_S3_ACCESS_KEY` | ✅ Yes | S3 access | All |
| `OVH_S3_SECRET_KEY` | ✅ Yes | S3 secret | All |
| `OVH_S3_BUCKET` | ✅ Yes | S3 bucket | All |
| `OVH_S3_ENDPOINT` | ✅ Yes | S3 endpoint | All |
| `LIGHTNING_USER_ID` | ⚡ Cloud | Auth | Lightning only |
| `LIGHTNING_API_KEY` | ⚡ Cloud | Auth | Lightning only |
| `WANDB_API_KEY` | ❌ Optional | Monitoring | All |
| `HF_TOKEN` | ❌ Optional | Upload models | All |
| `SLACK_WEBHOOK_URL` | ❌ Optional | Notifications | All |

Legend:
- ✅ Required for all methods
- ⚡ Required for cloud training
- ❌ Optional
