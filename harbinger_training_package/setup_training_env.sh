#!/bin/bash

# Harbinger-24B Training Environment Setup Script
# This script sets up the complete training environment on a new server

set -e  # Exit on any error

echo "🚀 Setting up Harbinger-24B Training Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [[ ! -f "pyproject.toml" ]] || [[ ! -d "ai/research/notebooks" ]]; then
    print_error "Please run this script from the harbinger_training_package directory"
    exit 1
fi

print_status "Checking system requirements..."

# Check Python version
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.11 or later."
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION="3.11"

if [[ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]]; then
    print_error "Python $REQUIRED_VERSION or later is required. Found: $PYTHON_VERSION"
    exit 1
fi

print_success "Python $PYTHON_VERSION found"

# Check NVIDIA GPU
if command -v nvidia-smi &> /dev/null; then
    GPU_INFO=$(nvidia-smi --query-gpu=name,memory.total --format=csv,noheader,nounits | head -1)
    print_success "GPU detected: $GPU_INFO"
    
    # Check VRAM
    VRAM=$(echo $GPU_INFO | cut -d',' -f2 | xargs)
    if [[ $VRAM -lt 20000 ]]; then
        print_warning "GPU has ${VRAM}MB VRAM. Recommended: 24GB+ for optimal performance"
        print_warning "You may need to reduce batch size in the training config"
    fi
else
    print_warning "nvidia-smi not found. Please ensure NVIDIA drivers are installed"
fi

# Install uv if not present
if ! command -v uv &> /dev/null; then
    print_status "Installing uv (fast Python package manager)..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
    
    if ! command -v uv &> /dev/null; then
        print_error "uv installation failed. Please install manually or use pip"
        exit 1
    fi
    
    print_success "uv installed successfully"
else
    print_success "uv already installed"
fi

# Create virtual environment
print_status "Creating virtual environment..."
if [[ -d ".venv" ]]; then
    print_warning "Virtual environment already exists. Removing and recreating..."
    rm -rf .venv
fi

uv venv
source .venv/bin/activate

print_success "Virtual environment created"

# Install dependencies
print_status "Installing dependencies..."
print_status "This may take several minutes for PyTorch and other large packages..."

# Install the project with all dependencies
uv pip install -e .

print_success "Dependencies installed successfully"

# Verify key packages
print_status "Verifying installation..."

python3 -c "import torch; print(f'PyTorch {torch.__version__} installed')"
python3 -c "import transformers; print(f'Transformers {transformers.__version__} installed')"
python3 -c "import peft; print(f'PEFT {peft.__version__} installed')"

# Check CUDA availability
CUDA_AVAILABLE=$(python3 -c "import torch; print(torch.cuda.is_available())")
if [[ "$CUDA_AVAILABLE" == "True" ]]; then
    CUDA_VERSION=$(python3 -c "import torch; print(torch.version.cuda)")
    GPU_COUNT=$(python3 -c "import torch; print(torch.cuda.device_count())")
    print_success "CUDA $CUDA_VERSION available with $GPU_COUNT GPU(s)"
else
    print_error "CUDA not available. Training will be very slow on CPU"
    print_error "Please install CUDA-compatible PyTorch"
fi

# Create output directories
print_status "Creating output directories..."
mkdir -p ai/training/checkpoints
mkdir -p logs

print_success "Output directories created"

# Check environment variables
print_status "Checking environment variables..."

if [[ -z "$WANDB_API_KEY" ]]; then
    print_warning "WANDB_API_KEY not set. Weights & Biases logging will be disabled"
    print_warning "Set with: export WANDB_API_KEY='your_api_key_here'"
else
    print_success "WANDB_API_KEY is set"
fi

if [[ -z "$HF_TOKEN" ]]; then
    print_warning "HF_TOKEN not set. HuggingFace upload will be disabled"
    print_warning "Set with: export HF_TOKEN='your_hf_token_here'"
else
    print_success "HF_TOKEN is set"
fi

# Verify datasets
print_status "Verifying datasets..."

DATASETS=(
    "ai/datasets/merged_mental_health_dataset.jsonl"
    "ai/pipelines/dual_persona_training/curriculum_phase_1.jsonl"
    "ai/pipelines/dual_persona_training/curriculum_phase_2.jsonl"
    "ai/pipelines/dual_persona_training/curriculum_phase_3.jsonl"
    "ai/pipelines/dual_persona_training/training_data.jsonl"
    "ai/pipelines/dual_persona_training/validation_data.jsonl"
)

for dataset in "${DATASETS[@]}"; do
    if [[ -f "$dataset" ]]; then
        SIZE=$(wc -l < "$dataset")
        print_success "Found $dataset ($SIZE lines)"
    else
        print_error "Missing dataset: $dataset"
        exit 1
    fi
done

# Create a quick test script
print_status "Creating test script..."
cat > test_installation.py << 'EOF'
#!/usr/bin/env python3
"""Quick test to verify the training environment is properly set up."""

import sys
import torch
import transformers
import peft
import datasets
import accelerate
import bitsandbytes
from pathlib import Path

def test_environment():
    print("🧪 Testing Harbinger-24B Training Environment")
    print("=" * 50)
    
    # Python version
    print(f"Python: {sys.version}")
    
    # Key packages
    print(f"PyTorch: {torch.__version__}")
    print(f"Transformers: {transformers.__version__}")
    print(f"PEFT: {peft.__version__}")
    print(f"Datasets: {datasets.__version__}")
    print(f"Accelerate: {accelerate.__version__}")
    print(f"BitsAndBytes: {bitsandbytes.__version__}")
    
    # CUDA
    if torch.cuda.is_available():
        print(f"CUDA: {torch.version.cuda}")
        print(f"GPU Count: {torch.cuda.device_count()}")
        for i in range(torch.cuda.device_count()):
            props = torch.cuda.get_device_properties(i)
            print(f"  GPU {i}: {props.name} ({props.total_memory // 1024**3} GB)")
    else:
        print("CUDA: Not available")
    
    # Datasets
    print("\nDatasets:")
    datasets_to_check = [
        "ai/datasets/merged_mental_health_dataset.jsonl",
        "ai/pipelines/dual_persona_training/curriculum_phase_1.jsonl",
        "ai/pipelines/dual_persona_training/training_data.jsonl",
    ]
    
    for dataset_path in datasets_to_check:
        path = Path(dataset_path)
        if path.exists():
            with open(path, 'r') as f:
                lines = sum(1 for _ in f)
            print(f"  ✅ {dataset_path} ({lines} lines)")
        else:
            print(f"  ❌ {dataset_path} (missing)")
    
    print("\n🎉 Environment test completed!")
    print("\nTo start training:")
    print("  cd ai/research/notebooks")
    print("  python harbinger_difficult_client_training.py")

if __name__ == "__main__":
    test_environment()
EOF

chmod +x test_installation.py

print_success "Test script created: test_installation.py"

# Final summary
echo
echo "=" * 60
print_success "🎉 Harbinger-24B Training Environment Setup Complete!"
echo "=" * 60
echo
echo "📋 Next Steps:"
echo "  1. Set environment variables (if not already done):"
echo "     export WANDB_API_KEY='your_wandb_api_key'"
echo "     export HF_TOKEN='your_huggingface_token'"
echo
echo "  2. Activate the virtual environment:"
echo "     source .venv/bin/activate"
echo
echo "  3. Test the installation:"
echo "     python test_installation.py"
echo
echo "  4. Start training:"
echo "     cd ai/research/notebooks"
echo "     python harbinger_difficult_client_training.py"
echo
echo "📊 Monitor training at: https://wandb.ai"
echo "🤗 Models will be uploaded to: https://huggingface.co/pixelated-empathy/"
echo
echo "💡 For troubleshooting, see README.md"
echo

print_success "Happy training! 🚀"
