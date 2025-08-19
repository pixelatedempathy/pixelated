# Harbinger-24B Difficult Client Training Package

This is a complete, portable training package for fine-tuning the Harbinger-24B model to simulate difficult therapy clients using QLoRA (4-bit quantization + LoRA).

## 🚀 Quick Start

### Prerequisites
- NVIDIA GPU with at least 24GB VRAM (H100 recommended)
- Python 3.11+
- CUDA-compatible PyTorch installation

### 1. Environment Setup
```bash
# Install uv (fast Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .
```

### 2. Set Environment Variables
```bash
# Required for Weights & Biases logging
export WANDB_API_KEY="your_wandb_api_key_here"

# Required for HuggingFace model upload
export HF_TOKEN="your_huggingface_token_here"
```

### 3. Run Training

**Option A: Python Script**
```bash
cd ai/research/notebooks
python harbinger_difficult_client_training.py
```

**Option B: Jupyter Notebook**
```bash
cd ai/research/notebooks
jupyter notebook harbinger_difficult_client_training.ipynb
```

## 📁 Package Contents

```
harbinger_training_package/
├── README.md                           # This file
├── setup_training_env.sh              # Automated setup script
├── pyproject.toml                      # Dependencies and project config
├── ai/
│   ├── datasets/
│   │   └── merged_mental_health_dataset.jsonl  # Main training dataset
│   ├── pipelines/
│   │   └── dual_persona_training/
│   │       ├── curriculum_phase_1.jsonl        # Easy training examples
│   │       ├── curriculum_phase_2.jsonl        # Medium difficulty
│   │       ├── curriculum_phase_3.jsonl        # Hard examples
│   │       ├── training_data.jsonl             # Additional training data
│   │       ├── validation_data.jsonl           # Validation set
│   │       └── training_config.json            # Training configuration
│   └── research/
│       └── notebooks/
│           ├── harbinger_difficult_client_training.py    # Main training script
│           └── harbinger_difficult_client_training.ipynb # Jupyter notebook version
└── ai/training/                        # Output directory (created during training)
    └── checkpoints/                    # Model checkpoints and adapters
```

## 🎯 Features

### Performance Optimizations
- **H100 Optimized**: FlashAttention-2, optimized batch sizes, parallel data loading
- **Memory Efficient**: 4-bit quantization with QLoRA adapters
- **Fast Training**: 2-4x performance improvement over standard setups

### Advanced Training
- **Adaptive Curriculum Learning**: 3-phase progressive difficulty
- **Overfitting Prevention**: Weight decay, dropout, early stopping
- **Comprehensive Monitoring**: Wandb integration with detailed metrics

### Model Distribution
- **HuggingFace Upload**: Automatic upload of PEFT adapters
- **GGUF Conversion**: Quantized models for CPU inference
- **Professional Model Cards**: Complete documentation and usage examples

## ⚙️ Configuration

Key training parameters in the script:

```python
# Model and data
base_model = "LatitudeGames/Harbinger-24B"
max_seq_len = 4096

# Training (H100 optimized)
per_device_train_batch_size = 2
gradient_accumulation_steps = 4
learning_rate = 2e-4
weight_decay = 0.01

# QLoRA
lora_r = 16
lora_alpha = 32
lora_dropout = 0.1

# HuggingFace upload
hf_repo_id = "pixelated-empathy/harbinger24b-difficult-client"
create_gguf = True
```

## 📊 Expected Results

Based on previous training runs:
- **Training Loss**: ~0.47 (final)
- **Validation Loss**: ~0.82
- **Training Time**: ~56 minutes on H100
- **Model Quality**: 4/5 rating
- **Curriculum Phases**: 3 phases with adaptive learning

## 🔧 Troubleshooting

### Common Issues

**1. CUDA Out of Memory**
- Reduce `per_device_train_batch_size` from 2 to 1
- Increase `gradient_accumulation_steps` from 4 to 8

**2. FlashAttention-2 Not Available**
- Set `use_flash_attn = False` in the config
- Install flash-attn: `pip install flash-attn --no-build-isolation`

**3. HuggingFace Upload Fails**
- Ensure `HF_TOKEN` environment variable is set
- Check repository permissions and naming

**4. GGUF Conversion Fails**
- Install llama-cpp-python: `pip install llama-cpp-python`
- Set `create_gguf = False` to skip GGUF generation

### Performance Tuning

**For Different GPU Memory:**
- **16GB**: `per_device_train_batch_size=1, gradient_accumulation_steps=8`
- **24GB**: `per_device_train_batch_size=2, gradient_accumulation_steps=4` (default)
- **48GB+**: `per_device_train_batch_size=4, gradient_accumulation_steps=2`

## 📈 Monitoring

The training provides comprehensive monitoring through:

1. **Wandb Dashboard**: Real-time loss curves, phase metrics, system stats
2. **Console Logs**: Detailed progress with phase summaries
3. **Generated Samples**: Qualitative evaluation after each curriculum phase
4. **Final Metrics**: Complete training summary with best checkpoints

## 🎯 Model Usage

After training, the model will be available at:
- **Local**: `ai/training/checkpoints/harbinger24b-difficult-client-qlora/`
- **HuggingFace**: `https://huggingface.co/pixelated-empathy/harbinger24b-difficult-client`
- **GGUF**: `https://huggingface.co/pixelated-empathy/harbinger24b-difficult-client/tree/main/gguf`

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "LatitudeGames/Harbinger-24B",
    load_in_4bit=True,
    device_map="auto"
)

# Load adapter
model = PeftModel.from_pretrained(base_model, "pixelated-empathy/harbinger24b-difficult-client")
tokenizer = AutoTokenizer.from_pretrained("pixelated-empathy/harbinger24b-difficult-client")

# Generate response
prompt = "Therapist: Can you tell me what brought you in today?\nClient:"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=200, temperature=0.9)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

## 🏥 Intended Use

This model is designed for:
- **Therapist Training**: Simulating challenging client scenarios
- **Research**: Studying therapeutic communication patterns  
- **Education**: Clinical psychology training simulations

⚠️ **Important**: This is a role-playing model for training purposes only. Do not use for actual therapy sessions.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs for specific error messages
3. Ensure all environment variables are properly set
4. Verify GPU memory and CUDA compatibility

## 📄 License

This training package inherits the licenses of its components:
- Base model: Check LatitudeGames/Harbinger-24B license
- Training code: Apache 2.0
- Datasets: Various (see individual dataset documentation)
