# Google Colab Pro Training Setup

This is an **alternative** to Lightning.ai training. Use this when:
- Lightning.ai GPUs are not available
- You want faster A100/V100 access
- You prefer Colab's interface
- You want W&B monitoring and Hugging Face hub integration

## Quick Start

1. **Open Colab**: Go to https://colab.research.google.com

2. **Create new notebook**

3. **Set GPU**: Runtime → Change runtime type → GPU → A100 (or V100/T4)

4. **Upload the training script**:
   ```python
   from google.colab import files
   uploaded = files.upload()  # Upload train_stage1_colab.py
   ```

5. **Set ALL environment variables**:
   ```python
   import os
   
   # ===== REQUIRED: S3 Credentials =====
   os.environ['OVH_S3_ACCESS_KEY'] = 'b6939e6b65ef4252b20338499421a5f0'
   os.environ['OVH_S3_SECRET_KEY'] = '4a7e939381c6467c88f81a5024672a96'
   os.environ['OVH_S3_BUCKET'] = 'pixel-data'
   os.environ['OVH_S3_ENDPOINT'] = 'https://s3.us-east-va.io.cloud.ovh.us'
   
   # ===== OPTIONAL: Weights & Biases =====
   os.environ['WANDB_API_KEY'] = 'your-wandb-key-here'
   os.environ['WANDB_PROJECT'] = 'pixelated-empathy'
   
   # ===== OPTIONAL: Hugging Face Hub =====
   os.environ['HF_TOKEN'] = 'hf_your-token-here'
   os.environ['HF_USERNAME'] = 'your-username'
   # OR: os.environ['HF_REPO_ID'] = 'your-username/pixelated-model'
   
   print("✅ Environment variables set")
   ```

6. **Run training**:
   ```bash
   !python train_stage1_colab.py \
       --stage stage1 \
       --data-dir /content/data \
       --checkpoint-dir /content/checkpoints
   ```

## Environment Variables

See [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for complete list.

### Required
- `OVH_S3_ACCESS_KEY`
- `OVH_S3_SECRET_KEY`
- `OVH_S3_BUCKET`
- `OVH_S3_ENDPOINT`

### Optional (Monitoring)
- `WANDB_API_KEY` - For experiment tracking
- `HF_TOKEN` - For model upload
- `HF_USERNAME` or `HF_REPO_ID` - Hugging Face destination

## GPU Comparison

| GPU | VRAM | Speed | Cost/hr | Recommendation |
|-----|------|-------|---------|----------------|
| A100 | 40GB | Fastest | ~$2.50 | **Best** for training |
| V100 | 16GB | Fast | ~$1.25 | Good value |
| L4 | 24GB | Medium | ~$1.00 | Newer option |
| T4 | 16GB | Slow | Free/cheap | Budget option |

## Features

- ✅ **Automatic GPU detection** and optimization
- ✅ **S3 dataset streaming** from OVH Cloud
- ✅ **Weights & Biases** integration for live monitoring
- ✅ **Hugging Face Hub** upload after training
- ✅ **Checkpoint saving** to Google Drive
- ✅ **Resume from checkpoint** support
- ✅ **Multi-GPU configs** (A100, V100, T4, L4)

## Weights & Biases Setup

1. Sign up at https://wandb.ai/
2. Get API key from https://wandb.ai/authorize
3. Set in Colab: `os.environ['WANDB_API_KEY'] = 'your-key'`

You'll see live metrics at: `https://wandb.ai/your-username/pixelated-empathy`

## Hugging Face Hub Setup

1. Create account at https://huggingface.co/
2. Go to Settings → Access Tokens
3. Create token with "Write" permission
4. Set in Colab:
   ```python
   os.environ['HF_TOKEN'] = 'hf_your-token'
   os.environ['HF_USERNAME'] = 'your-username'
   ```

After training, your model will be at: `https://huggingface.co/your-username/pixelated-empathy-stage1`

## Advanced Usage

### Custom Hugging Face Repo
```bash
!python train_stage1_colab.py \
    --stage stage1 \
    --hf-repo my-org/my-custom-model \
    --hf-private  # Make public with --no-hf-private
```

### Skip Hugging Face Upload
```bash
!python train_stage1_colab.py \
    --stage stage1 \
    --skip-hf-upload
```

### Resume from Checkpoint
```bash
# First, restore checkpoints from Drive
!mkdir -p /content/checkpoints
!cp -r /content/drive/MyDrive/pixelated-checkpoints/* /content/checkpoints/

# Then resume
!python train_stage1_colab.py \
    --stage stage1 \
    --checkpoint-dir /content/checkpoints \
    --skip-setup
```

## Comparison with Lightning.ai

| Feature | Lightning.ai | Colab Pro |
|---------|--------------|-----------|
| **Cost** | Free tier (2 GPUs) | ~$10-50/month |
| **GPU Access** | Limited availability | Better A100 access |
| **Persistence** | Automatic | Manual (Drive) |
| **Multi-GPU** | Up to 8 GPUs | Single GPU |
| **W&B** | Manual setup | Built-in |
| **HF Hub** | Manual | Built-in |
| **Best for** | Production runs | Experimentation |

## Both Methods Coexist

These setups are **parallel**, not replacements:

```
scripts/
├── ovh/              # Lightning.ai setup (production)
│   ├── run-stage1-training-lightning.sh
│   └── lib/runners/lightning-stage1-runner.sh
└── colab/            # Colab Pro setup (experimentation)
    ├── train_stage1_colab.py
    ├── ENVIRONMENT_VARIABLES.md
    └── README.md
```

**Use whichever has GPU availability!**

## Training Workflow

1. **Check Lightning.ai first** - Free tier, multi-GPU support
2. **Fallback to Colab Pro** - Better A100 availability, faster experimentation
3. **Monitor with W&B** - Track experiments across both platforms
4. **Upload to Hugging Face** - Centralized model storage

## Troubleshooting

### CUDA Out of Memory
- Reduce batch size (auto-adjusted per GPU)
- Use gradient checkpointing (enabled by default)
- Try A100 instead of T4

### S3 Download Issues
- Verify credentials are set correctly
- Check bucket name and endpoint URL
- Ensure bucket has data files

### Hugging Face Upload Fails
- Check HF_TOKEN has "Write" permission
- Verify repo name format: `username/repo-name`
- Try creating repo manually first

### W&B Not Logging
- Verify WANDB_API_KEY is set
- Check internet connection
- Try: `wandb.login()` manually in notebook

## Support

- W&B Issues: https://docs.wandb.ai/
- Hugging Face: https://huggingface.co/docs
- Colab: https://colab.research.google.com/notebooks/
