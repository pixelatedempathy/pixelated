#!/usr/bin/env bash
# Lightning.ai runner for Stage 1 Foundation Training

run_lightning_stage1_job() {
    local -n _result_ref="$1"
    BATCH_EXIT_STATUS=0

    set +e
    
    log_info "Starting Stage 1 Foundation Training on Lightning.ai"
    log_info "Training script: ${TRAINING_SCRIPT}"
    log_info "Stage: ${TRAINING_STAGE}"
    
    export PYTHONPATH="${PROJECT_ROOT}:${PROJECT_ROOT}/ai/training"
    
    local cmd_args=(
        "--stage" "${TRAINING_STAGE}"
        "--data-dir" "${PROJECT_ROOT}/data"
        "--checkpoint-dir" "${PROJECT_ROOT}/checkpoints"
    )
    
    if [[ "${BATCH_RUNNER_MODE}" == "uv" ]]; then
        log_info "Running with uv..."
        uv run --project "${PROJECT_ROOT}" python "${TRAINING_SCRIPT}" "${cmd_args[@]}"
        BATCH_EXIT_STATUS=$?
    else
        log_info "Running with Python: ${BATCH_PYTHON}"
        "${BATCH_PYTHON}" "${TRAINING_SCRIPT}" "${cmd_args[@]}"
        BATCH_EXIT_STATUS=$?
    fi
    
    set -e
    
    _result_ref="${BATCH_EXIT_STATUS}"
}

# Submit to Lightning.ai cloud
submit_lightning_cloud_job() {
    local job_name="${CHECKPOINT_JOB_NAME}"
    local stage="${TRAINING_STAGE}"
    
    log_info "Submitting job to Lightning.ai cloud..."
    
    if ! check_lightning_cli; then
        log_error "Cannot submit to Lightning cloud without CLI"
        return 1
    fi
    
    # Build command - downloads and runs standalone training script
    # This approach works in containers without full project structure
    local cmd="pip install -q torch transformers datasets accelerate peft bitsandbytes boto3 unsloth && python /tmp/train_standalone.py --stage ${stage} --data-dir /app/data --checkpoint-dir /checkpoints"
    
    # Write training script to a temp file that will be uploaded
    local temp_script="/tmp/lightning_train_${job_name}.sh"
    cat > "${temp_script}" << 'TRAINING_SCRIPT'
#!/bin/bash
set -e

echo "=== Lightning.ai Training Container ==="
echo "Stage: $1"
echo "Data: /app/data"
echo "Checkpoints: /checkpoints"

# Install dependencies
echo "Installing dependencies..."
pip install -q torch transformers datasets accelerate peft bitsandbytes boto3 unsloth

# Download standalone training script
echo "Downloading training script..."
curl -fsSL -o /tmp/train.py https://raw.githubusercontent.com/vivirox/pixelated/main/ai/training/ready_packages/platforms/lightning/train_lightning_standalone.py || {
    echo "Download failed. Using local script if available."
}

# Run training
echo "Starting training..."
if [ -f /tmp/train.py ]; then
    python /tmp/train.py --stage "$1" --data-dir /app/data --checkpoint-dir /checkpoints
else
    echo "Training script not found. Exiting."
    exit 1
fi
TRAINING_SCRIPT

    chmod +x "${temp_script}"
    
    # Using L40S (single GPU) - fits within free tier limit
    lightning run job \
        --name "${job_name}" \
        --teamspace "pixelated" \
        --user "vivirox" \
        --machine L40S \
        --image "python:3.11-slim" \
        --command "/bin/bash ${temp_script} ${stage}" \
        -e OVH_S3_ACCESS_KEY="${OVH_S3_ACCESS_KEY}" \
        -e OVH_S3_SECRET_KEY="${OVH_S3_SECRET_KEY}" \
        -e OVH_S3_BUCKET="${OVH_S3_BUCKET:-pixel-data}" \
        -e OVH_S3_ENDPOINT="${OVH_S3_ENDPOINT:-https://s3.us-east-va.io.cloud.ovh.us}" \
        -e OVH_S3_REGION="${OVH_S3_REGION:-us-east-va}" \
        -e WANDB_API_KEY="${WANDB_API_KEY:-}" \
        -e HF_TOKEN="${HF_TOKEN:-}" \
        2>&1
    
    local status=$?
    rm -f "${temp_script}"
    return ${status}
}
