# 📋 Active Tasks: **DATASET COMPLETION FOCUS**

## Current State
- **Dataset Status**: 75% Complete - Focus on Phase 1 completion
- **S3 Dataset Size**: 52.20GB across 19,330 objects
- **Training Target**: Wayfarer-2-12B / Harbringer-24B mental health specialization
- **Stage**: Phase 1 - Foundation Completion (Weeks 1-2) - CRITICAL
- **Execution Environment**: VPS (for all data-intensive tasks)

## 🎯 Task Plan (Phase 1 Completion)

### 🔥 Task 1: Download Tier 1 Priority Datasets (CRITICAL)
**Estimated Time**: 1-2 hours  
**Impact**: 40% of training weight  
**VPS Command**:
```bash
rclone copy gdrive:datasets/datasets-wendy ~/datasets/consolidated/priority_wendy/
```
- `priority_1_FINAL.jsonl` (462MB)
- `priority_2_FINAL.jsonl` (330MB) 
- `priority_3_FINAL.jsonl` (370MB)
- `priority_4_FINAL.jsonl`
- `priority_5_FINAL.jsonl`

### 🔥 Task 2: Download Tier 3 CoT Datasets
**Estimated Time**: 30 minutes  
**VPS Command**:
```bash
rclone copy gdrive:datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions ~/datasets/consolidated/cot/
rclone copy gdrive:datasets/CoT_Philosophical_Understanding ~/datasets/consolidated/cot/
```

### 🔥 Task 3: Download Tier 4 Reddit Data
**Estimated Time**: 45 minutes  
**VPS Command**:
```bash
rclone copy gdrive:datasets/reddit_mental_health/mental_disorders_reddit.csv ~/datasets/consolidated/reddit/
rclone copy gdrive:datasets/reddit_mental_health/Suicide_Detection.csv ~/datasets/consolidated/reddit/
```

### 🔥 Task 4: Generate Edge Case Synthetic Dataset (10,000 samples)
**Estimated Time**: 60 minutes  
**VPS Command**:
```bash
python ai/training_ready/scripts/generate_edge_case_synthetic_dataset.py \
  --output ai/training_ready/data/generated/edge_case_synthetic.jsonl \
  --categories all --count 10000
```

### 🔥 Task 5: Build CPTSD Dataset from Tim Fletcher Transcripts
**Estimated Time**: 45 minutes  
**VPS Command**:
```bash
python ai/training_ready/scripts/build_cptsd_dataset_from_transcripts.py \
  --input-dir ~/datasets/gdrive/tier4_voice_persona/Tim\ Fletcher/ \
  --output ai/training_ready/data/generated/cptsd_transcripts.jsonl
```

### 🔥 Task 6: Run Deduplication (<1% duplicate rate)
**Estimated Time**: 60 minutes  
**VPS Command**:
```bash
uv run python ai/training_ready/scripts/enhanced_deduplication.py --dry-run
uv run python ai/training_ready/scripts/enhanced_deduplication.py --confirm
```

### 🔥 Task 7: Fix UTF-8 Encoding Issues
**Estimated Time**: 30 minutes  
**VPS Command**:
```bash
python ai/training_ready/scripts/fix_encoding.py \
  --input-dir ~/datasets/consolidated/ \
  --output-dir ~/datasets/consolidated/fixed/
```

### 🔥 Task 8: Run 8-Gate Quality Validation
**Estimated Time**: 45 minutes  
**VPS Command**:
```bash
python ai/training_ready/scripts/verify_final_dataset.py --report
```

### 🔥 Task 9: Compile and Upload to S3
**Estimated Time**: 60 minutes  
**VPS Command**:
```bash
python ai/training_ready/scripts/compile_final_dataset.py \
  --s3-bucket pixel-data \
  --upload-canonical
```

### 🔥 Task 10: Verify S3 Upload
**Estimated Time**: 15 minutes  
**VPS Command**:
```bash
aws s3 ls s3://pixel-data/final_dataset/ --recursive
```

## 📊 Progress Overview

| Task | Status | Priority |
|------|--------|----------|
| Task 1: Download Tier 1 Priority Datasets | ⚠️ In Progress | CRITICAL |
| Task 2: Download Tier 3 CoT Datasets | ⏳ Pending | HIGH |
| Task 3: Download Tier 4 Reddit Data | ⏳ Pending | HIGH |
| Task 4: Generate Edge Case Synthetic Dataset | ⏳ Pending | HIGH |
| Task 5: Build CPTSD Dataset from Tim Fletcher Transcripts | ⏳ Pending | HIGH |
| Task 6: Run Deduplication | ⏳ Pending | MEDIUM |
| Task 7: Fix UTF-8 Encoding Issues | ⏳ Pending | MEDIUM |
| Task 8: Run 8-Gate Quality Validation | ⏳ Pending | MEDIUM |
| Task 9: Compile and Upload to S3 | ⏳ Pending | MEDIUM |
| Task 10: Verify S3 Upload | ⏳ Pending | LOW |

## 📈 Overall Progress

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1 | ⚠️ In Progress | 75% Complete |
| Phase 2 | ⏳ Pending | 0% Complete |
| Phase 3 | ⏳ Pending | 0% Complete |

## 🎯 Execution Strategy

1. **SSH into VPS** first: `ssh user@vps-ip-address`
2. **Navigate to project directory**: `cd ~/pixelated`
3. **Ensure dependencies are installed**: `cd ai && uv sync`
4. **Execute tasks in order** starting with Task 1 (CRITICAL)
5. **Update progress in memory files** after each completed task

---

Last Updated: 2026-01-25
