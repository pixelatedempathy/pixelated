# 3-Stage Lightning.ai H100 Training Plan

## Overview

**Base Model**: LatitudeGames/Wayfarer-2-12B
**Architecture**: 4-Expert MoE with LoRA (rank 16, alpha 32)
**Total Stages**: 3 sequential training phases
**Hardware**: Lightning.ai H100 GPU (80GB VRAM)
**Time Limit**: 12 hours per stage max

---

## Stage 1: Foundation - Natural Therapeutic Dialogue

**Purpose**: Learn natural therapeutic conversation patterns, empathy, and clinical dialogue flow

**Datasets** (from `/mnt/gdrive/datasets/`):
- `mental_health_counseling_conversations` (4.8MB, 3.5K conversations)
- `SoulChat2.0` (psychological counselor digital twin)
- `counsel-chat` (professional counseling archive)
- `LLAMA3_Mental_Counseling_Data` (advanced AI counseling)
- `therapist-sft-format` (406MB, structured therapist training)
- `neuro_qa_sft` (6.1MB, neurology/psychology Q&A)
- `Psych8k` (6.3MB, Alexander Street therapy conversations)
- **Priority datasets**: `priority_1_FINAL.jsonl`, `priority_2_FINAL.jsonl`, `priority_3_FINAL.jsonl`

**Training Config**:
```json
{
  "model_config": {
    "base_model": "LatitudeGames/Wayfarer-2-12B",
    "lora_r": 16,
    "lora_alpha": 32,
    "lora_dropout": 0.1,
    "target_modules": ["q_proj", "v_proj", "k_proj", "o_proj"]
  },
  "training": {
    "num_epochs": 3,
    "learning_rate": 2e-4,
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 8,
    "warmup_steps": 1000,
    "max_steps": null,
    "max_seq_length": 2048
  },
  "moe_config": {
    "num_experts": 4,
    "expert_domains": [
      "psychology",
      "mental_health",
      "bias_detection",
      "general_therapeutic"
    ]
  },
  "data_paths": [
    "/mnt/gdrive/datasets/mental_health_counseling_conversations",
    "/mnt/gdrive/datasets/SoulChat2.0",
    "/mnt/gdrive/datasets/counsel-chat",
    "/mnt/gdrive/datasets/LLAMA3_Mental_Counseling_Data",
    "/mnt/gdrive/datasets/therapist-sft-format",
    "/mnt/gdrive/datasets/neuro_qa_SFT_Trainer",
    "/mnt/gdrive/datasets/Psych8k",
    "/mnt/gdrive/datasets/datasets-wendy/priority_1_FINAL.jsonl",
    "/mnt/gdrive/datasets/datasets-wendy/priority_2_FINAL.jsonl",
    "/mnt/gdrive/datasets/datasets-wendy/priority_3_FINAL.jsonl"
  ]
}
```

**Expected Outcomes**:
- Natural empathetic responses
- Proper therapeutic boundaries
- Multi-turn conversation coherence
- Basic clinical knowledge

**Checkpoint**: Save to `therapeutic_moe_stage1/`

---

## Stage 2: Clinical Reasoning - CoT Enhancement

**Purpose**: Learn explicit clinical reasoning patterns, diagnostic thinking, specialized therapeutic approaches

**Datasets** (from `/mnt/gdrive/datasets/`):
- `CoT_Reasoning_Clinical_Diagnosis_Mental_Health.json` (20MB - clinical diagnosis reasoning)
- `CoT_Heartbreak_and_Breakups_downloaded.json` (37MB - emotional intelligence)
- `CoT_Neurodivergent_vs_Neurotypical_Interactions_downloaded.json` (53MB - neurodiversity)
- `CoT_Reasoning_Mens_Mental_Health_downloaded.json` (17MB - gender-specific)
- `CoT-Reasoning_Cultural_Nuances/CoT-Reasoning_Cultural_Nuances_Dataset.json` (43MB)
- `CoT_Philosophical_Understanding/CoT_Philosophical_Understanding.json` (33MB)
- `CoT_Temporal_Reasoning_Dataset/CoT_Temporal_Reasoning_Dataset.json` (15MB)

**Total**: ~218MB of Chain of Thought reasoning data

**Training Config**:
```json
{
  "training": {
    "num_epochs": 2,
    "learning_rate": 1e-4,
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 8,
    "warmup_steps": 500,
    "resume_from_checkpoint": "therapeutic_moe_stage1/checkpoint-final"
  },
  "data_paths": [
    "/mnt/gdrive/datasets/CoT_Reasoning_Clinical_Diagnosis_Mental_Health/CoT_Reasoning_Clinical_Diagnosis_Mental_Health.json",
    "/mnt/gdrive/datasets/CoT_Heartbreak_and_Breakups_downloaded.json",
    "/mnt/gdrive/datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions_downloaded.json",
    "/mnt/gdrive/datasets/CoT_Reasoning_Mens_Mental_Health_downloaded.json",
    "/mnt/gdrive/datasets/CoT-Reasoning_Cultural_Nuances/CoT-Reasoning_Cultural_Nuances_Dataset.json",
    "/mnt/gdrive/datasets/CoT_Philosophical_Understanding/CoT_Philosophical_Understanding.json",
    "/mnt/gdrive/datasets/CoT_Temporal_Reasoning_Dataset/CoT_Temporal_Reasoning_Dataset.json"
  ]
}
```

**Expected Outcomes**:
- Explicit reasoning about client situations
- Step-by-step diagnostic thinking
- Cultural sensitivity awareness
- Neurodiversity-informed responses
- Gender-specific therapeutic considerations
- Philosophical/existential therapy capability

**Checkpoint**: Save to `therapeutic_moe_stage2/`

---

## Stage 3: Voice Injection - Tim Fletcher Style

**Purpose**: Adopt Tim Fletcher's teaching style, personality, flow, and way of explaining complex trauma concepts

**Datasets**:
- Tim Fletcher synthetic conversations (TBD - to be generated from 913 transcripts)
- Source transcripts: `.notes/transcripts/` (913 YouTube videos on complex trauma, PTSD)

**Training Config**:
```json
{
  "training": {
    "num_epochs": 2,
    "learning_rate": 5e-5,
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 8,
    "warmup_steps": 300,
    "resume_from_checkpoint": "therapeutic_moe_stage2/checkpoint-final"
  },
  "data_paths": [
    "ai/data/tim_fletcher_voice/synthetic_conversations.json"
  ]
}
```

**Expected Outcomes**:
- Tim Fletcher's teaching voice/personality
- His specific flow and explanations
- Way of breaking down complex trauma concepts
- Analogies and examples in his style
- Compassionate, educational tone

**Checkpoint**: Save to `therapeutic_moe_stage3_FINAL/`

---

## Why Staged Training?

**CoT vs Standard Conversations**:
- **CoT**: Teaches "how to THINK" - explicit reasoning, step-by-step clinical logic
- **Standard**: Teaches "how to TALK" - natural dialogue, empathy, flow
- **Mixing Risk**: Model confusion about when to show reasoning vs when to be conversational

**Stage Benefits**:
1. **Clear separation of capabilities**
2. **Independent evaluation** between stages
3. **Rollback capability** if a stage fails
4. **Controlled behavior** - add capabilities incrementally
5. **Style overlay** - Tim's voice as final personality layer

---

## Dataset Access Strategy

**No Bandwidth Issues**:
- All datasets at `/mnt/gdrive/datasets/` (Google Drive mount)
- Training scripts read directly from mounted drive
- No local copying required
- Lightning.ai can access via mount point

**Alternative for Lightning.ai Cloud**:
- Upload dataset registry JSON
- Upload only the specific datasets needed per stage
- Or: compress and upload staged dataset bundles

---

## Monitoring & Checkpoints

**Per Stage**:
- WandB logging for all metrics
- Checkpoint every 30 minutes
- Save best model based on validation loss
- Early stopping after 3 epochs without improvement

**Between Stages**:
- Evaluate model on held-out test set
- Sample responses to verify capabilities
- Compare with previous stage
- Decide whether to proceed or retrain

---

## Estimated Timeline

**Stage 1**: 8-10 hours (largest dataset, foundation training)
**Stage 2**: 4-6 hours (smaller CoT datasets, fine-tuning)
**Stage 3**: 3-4 hours (voice/style injection)

**Total**: ~15-20 hours across 3 separate H100 sessions

---

## Success Metrics

**Stage 1**:
- Natural therapeutic dialogue
- Empathy scores > 0.8
- Conversation coherence across 10+ turns
- No harmful/biased responses

**Stage 2**:
- Demonstrates clinical reasoning when appropriate
- Cultural sensitivity in responses
- Neurodiversity awareness
- Gender-specific considerations

**Stage 3**:
- Tim Fletcher's teaching voice detectable
- Maintains clinical capabilities from Stage 1 & 2
- Improved explanation quality
- Compassionate, educational tone

---

## Next Steps

1. ✅ Dataset registry created → `ai/data/dataset_registry.json`
2. ⏳ Extract Tim Fletcher voice from 913 transcripts
3. ⏳ Generate synthetic conversations with Tim's style
4. ⏳ Update Lightning.ai training configs for 3 stages
5. ⏳ Run Stage 1 training
6. ⏳ Evaluate and proceed to Stage 2
7. ⏳ Evaluate and proceed to Stage 3
8. ⏳ Final model deployment

---

## Files & Locations

**Dataset Registry**: `ai/data/dataset_registry.json`
**Google Drive Mount**: `/mnt/gdrive/datasets/`
**Training Script**: `ai/lightning/production/train_therapeutic_ai.py`
**MoE Config**: `ai/lightning/moe_training_config.json`
**Tim Fletcher Transcripts**: `.notes/transcripts/` (913 files)
**Training Guide**: `ai/lightning/MOE_TRAINING_GUIDE.md`
