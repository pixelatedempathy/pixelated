#!/usr/bin/env bash
# Stage 1 Foundation Training Launcher for Lightning.ai
# Replaces deprecated ovhai CLI approach

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIB_DIR="${SCRIPT_DIR}/lib"

if [[ ! -f "${LIB_DIR}/stage1-training-helpers.sh" ]]; then
    echo "ERROR: missing helper library at ${LIB_DIR}/stage1-training-helpers.sh" >&2
    exit 1
fi

source "${LIB_DIR}/stage1-training-helpers.sh"
source "${LIB_DIR}/runners/lightning-stage1-runner.sh"

# Default configuration
RUN_MODE="${RUN_MODE:-manual}"
AUTOMATION_MODE="${AUTOMATION_MODE:-0}"
SEND_STARTUP_NOTIFICATION="${SEND_STARTUP_NOTIFICATION:-1}"
if [[ "${RUN_MODE}" == "scheduler" || "${AUTOMATION_MODE}" == "1" ]]; then
    SEND_STARTUP_NOTIFICATION="0"
fi

RESUME_OVERRIDE=""
RESUME_FLAG=""

parse_runtime_overrides() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --stage)
                TRAINING_STAGE="$2"
                shift 2
                ;;
            --mode)
                RUN_MODE="$2"
                shift 2
                ;;
            --job-name)
                JOB_NAME="$2"
                shift 2
                ;;
            --output-key)
                OUTPUT_KEY="$2"
                shift 2
                ;;
            --checkpoint-job-name)
                CHECKPOINT_JOB_NAME="$2"
                shift 2
                ;;
            --checkpoint-s3-key)
                CHECKPOINT_S3_KEY="$2"
                shift 2
                ;;
            --resume)
                RESUME_OVERRIDE=1
                RESUME_FLAG="--resume"
                shift
                ;;
            --no-resume)
                RESUME_OVERRIDE=0
                RESUME_FLAG=""
                shift
                ;;
            --notify-on-start)
                SEND_STARTUP_NOTIFICATION=1
                shift
                ;;
            --no-notify)
                SEND_STARTUP_NOTIFICATION=0
                shift
                ;;
            --help|-h)
                cat <<'USAGE'
Usage: scripts/ovh/run-stage1-training-lightning.sh [options]

Stage 1 Foundation Training on Lightning.ai

Options:
  --stage <stage>         Training stage: stage1, stage2, stage3 (default: stage1)
  --job-name <name>       Job identifier
  --checkpoint-job-name <name>  Checkpoint job name
  --checkpoint-s3-key <key>   S3 key for checkpoint storage
  --mode <mode>           Run mode: manual|scheduler (default: manual)
  --resume / --no-resume  Resume from previous checkpoint
  --notify-on-start       Send Slack notification on start
  --no-notify             Disable notifications
  --help                  Show this help message

Environment Variables Required:
  LIGHTNING_API_KEY       Lightning.ai API key
  LIGHTNING_USER_ID       Lightning.ai user ID
  OVH_S3_ACCESS_KEY       S3 access key for dataset storage
  OVH_S3_SECRET_KEY       S3 secret key for dataset storage
  OVH_S3_BUCKET           S3 bucket name (default: pixel-data)
  OVH_S3_ENDPOINT         S3 endpoint URL

Examples:
  # Basic Stage 1 training
  ./scripts/ovh/run-stage1-training-lightning.sh

  # Resume previous training
  ./scripts/ovh/run-stage1-training-lightning.sh --resume

  # Custom job name
  ./scripts/ovh/run-stage1-training-lightning.sh --job-name my-training-run
USAGE
                exit 0
                ;;
            *)
                echo "WARNING: unknown argument '$1' ignored" >&2
                shift
                ;;
        esac
    done
}

send_conditional_slack() {
    local title="$1"
    local message="$2"
    if [[ "${SEND_STARTUP_NOTIFICATION}" != "1" ]]; then
        return 0
    fi
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        send_slack_notification "${title}" "${message}"
    fi
}

parse_runtime_overrides "$@"

if [[ "${RUN_MODE}" == "scheduler" || "${AUTOMATION_MODE}" == "1" ]]; then
    SEND_STARTUP_NOTIFICATION="0"
fi

: "${TARGET_HOST:=lightning}"
TARGET_HOST_LOWER="$(echo "${TARGET_HOST}" | tr '[:upper:]' '[:lower:]')"
if [[ "${TARGET_HOST_LOWER}" != "lightning" && "${TARGET_HOST_LOWER}" != "lightning_ai" && "${TARGET_HOST_LOWER}" != "lightning-ai" ]]; then
    echo "ERROR: TARGET_HOST for this script must be one of: lightning." >&2
    exit 1
fi

if [[ "${RESUME_OVERRIDE}" == "0" ]]; then
    RESUME_FLAG=""
elif [[ "${RESUME_OVERRIDE}" == "1" ]]; then
    RESUME_FLAG="--resume"
fi

# Training stage configuration
: "${TRAINING_STAGE:=stage1}"
: "${GPU_FLAVOR:=l40s-1-gpu}"
: "${GPU_COUNT:=1}"

# Checkpoint configuration
timestamp="${TIMESTAMP:-$(date +%s)}"
: "${CHECKPOINT_JOB_NAME:=stage1-${TRAINING_STAGE}-${timestamp}}"
: "${CHECKPOINT_S3_KEY:=checkpoints/stage1-training/${CHECKPOINT_JOB_NAME}}"
: "${CHECKPOINT_PREFIX:=checkpoints/stage1-training}"

export TARGET_HOST
export TRAINING_STAGE
export CHECKPOINT_JOB_NAME
export CHECKPOINT_S3_KEY

log_info "🔎 Running Stage 1 Training launcher preflight checks."

load_env_file

# Verify required environment variables
if [[ -z "${LIGHTNING_API_KEY:-}" ]]; then
    echo "ERROR: LIGHTNING_API_KEY must be set." >&2
    exit 1
fi

if [[ -z "${LIGHTNING_USER_ID:-}" ]]; then
    echo "ERROR: LIGHTNING_USER_ID must be set." >&2
    exit 1
fi

if [[ -z "${OVH_S3_ACCESS_KEY:-}" || -z "${OVH_S3_SECRET_KEY:-}" ]]; then
    echo "ERROR: OVH_S3_ACCESS_KEY / OVH_S3_SECRET_KEY must be set." >&2
    exit 1
fi

# S3 configuration
S3_BUCKET="${OVH_S3_BUCKET:-pixel-data}"
S3_ENDPOINT="${OVH_S3_ENDPOINT:-https://s3.us-east-va.io.cloud.ovh.us}"
S3_REGION="${OVH_S3_REGION:-us-east-va}"

PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
TRAINING_SCRIPT="${LIGHTNING_TRAINING_SCRIPT:-${PROJECT_ROOT}/ai/training/ready_packages/platforms/lightning/train_lightning.py}"
SLACK_NOTIFY_CONTEXT="${SLACK_NOTIFY_CONTEXT:-Stage 1 Foundation Training}"

log_info "Checkpoint plan:"
log_info " - Prefix: ${CHECKPOINT_PREFIX}"
log_info " - Job name: ${CHECKPOINT_JOB_NAME}"
log_info " - Resolved checkpoint key: ${CHECKPOINT_S3_KEY}"

log_info "Training configuration:"
log_info " - Stage: ${TRAINING_STAGE}"
log_info " - GPU: ${GPU_FLAVOR} x${GPU_COUNT}"

cat <<MSG
🚀 Launching Stage 1 Foundation Training (Lightning.ai)
- Job Name: ${CHECKPOINT_JOB_NAME}
- Stage: ${TRAINING_STAGE}
- S3 Bucket: ${S3_BUCKET}
- Resume flag: ${RESUME_FLAG:-none}
MSG

# Determine Python runner mode
BATCH_PYTHON=""
BATCH_RUNNER_MODE="uv"

if [[ -n "${LIGHTNING_PYTHON_BIN:-}" ]]; then
    BATCH_PYTHON="$(resolve_python "${LIGHTNING_PYTHON_BIN}")"
    if [[ -z "${BATCH_PYTHON}" ]]; then
        log_warning "Configured LIGHTNING_PYTHON_BIN=${LIGHTNING_PYTHON_BIN} is not usable. Falling back to uv runtime."
    elif python_has_torch "${BATCH_PYTHON}"; then
        BATCH_RUNNER_MODE="python"
    else
        log_warning "Resolved Python interpreter (${BATCH_PYTHON}) cannot import torch. Falling back to uv."
    fi
else
    log_info "LIGHTNING_PYTHON_BIN is not set. Using uv runtime by default on Lightning."
fi

if [[ "${BATCH_RUNNER_MODE}" == "uv" ]] && ! command -v uv >/dev/null; then
    echo "ERROR: lightning host fallback requires uv, but uv is not installed." >&2
    echo "Tip: set LIGHTNING_PYTHON_BIN to a torch-enabled python interpreter, or install uv." >&2
    exit 1
fi

if [[ "${BATCH_RUNNER_MODE}" == "python" && ! -x "${BATCH_PYTHON}" ]]; then
    echo "ERROR: resolved Python executable is not executable: ${BATCH_PYTHON}." >&2
    exit 1
fi

if [[ ! -f "${TRAINING_SCRIPT}" ]]; then
    echo "ERROR: training script not found at ${TRAINING_SCRIPT}." >&2
    exit 1
fi

send_conditional_slack \
    "🚀 ${SLACK_NOTIFY_CONTEXT} Starting" \
    "Target=${TARGET_HOST_LOWER}; Job=${CHECKPOINT_JOB_NAME}; Stage=${TRAINING_STAGE}; Checkpoint=${CHECKPOINT_S3_KEY}"

submit_lightning_cloud_job BATCH_EXIT_STATUS

if [[ "${BATCH_EXIT_STATUS}" -eq 0 ]]; then
    send_conditional_slack \
        "✅ ${SLACK_NOTIFY_CONTEXT} Completed" \
        "Stage ${TRAINING_STAGE} training completed. Checkpoint: s3://${S3_BUCKET}/${CHECKPOINT_S3_KEY}"
    echo "✅ Lightning cloud job submitted."
else
    send_conditional_slack \
        "❌ ${SLACK_NOTIFY_CONTEXT} Failed" \
        "Job=${CHECKPOINT_JOB_NAME} failed with exit code ${BATCH_EXIT_STATUS}. Check logs and latest checkpoint: s3://${CHECKPOINT_S3_KEY}"
    exit "${BATCH_EXIT_STATUS}"
fi
