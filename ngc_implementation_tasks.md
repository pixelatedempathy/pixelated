# 📋 NGC Implementation Tasks

## Production Ready ✅

## 🎯 CURRENT FOCUS: DATASET COMPLETION

### Phase 1: Foundation Completion (Weeks 1-2) - **IN PROGRESS**

#### 🔥 CRITICAL TASKS (80% of Phase 1 weight)

##### 1.1 Download Missing Priority Datasets
**Estimated Time:** 1-2 hours
**Impact:** 40% of training weight

```bash
# Tier 1 Priority (1.16GB)
rclone copy gdrive:datasets/datasets-wendy ~/datasets/consolidated/priority_wendy/

# Tier 3 CoT Datasets (86MB)
rclone copy gdrive:datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions ~/datasets/consolidated/cot/
rclone copy gdrive:datasets/CoT_Philosophical_Understanding ~/datasets/consolidated/cot/

# Tier 4 Reddit Data (700MB+)
rclone copy gdrive:datasets/reddit_mental_health/mental_disorders_reddit.csv ~/datasets/consolidated/reddit/
rclone copy gdrive:datasets/reddit_mental_health/Suicide_Detection.csv ~/datasets/consolidated/reddit/
```

##### 1.2 Generate Missing Datasets
**Estimated Time:** 30-60 minutes per dataset

- **Edge Case Synthetic Dataset (10,000 samples):**
  ```bash
  python ai/training_ready/scripts/generate_edge_case_synthetic_dataset.py \
    --output ai/training_ready/data/generated/edge_case_synthetic.jsonl \
    --categories all --count 10000
  ```

- **CPTSD Dataset from Tim Fletcher Transcripts:**
  ```bash
  python ai/training_ready/scripts/build_cptsd_dataset_from_transcripts.py \
    --input-dir ~/datasets/gdrive/tier4_voice_persona/Tim\ Fletcher/ \
    --output ai/training_ready/data/generated/cptsd_transcripts.jsonl
  ```

##### 1.3 Quality Optimization
**Estimated Time:** 1-2 hours

- **Deduplication (<1% duplicate rate):**
  ```bash
  uv run python ai/training_ready/scripts/enhanced_deduplication.py --dry-run
  uv run python ai/training_ready/scripts/enhanced_deduplication.py --confirm
  ```

- **UTF-8 Encoding Fix:**
  ```bash
  python ai/training_ready/scripts/fix_encoding.py \
    --input-dir ~/datasets/consolidated/ \
    --output-dir ~/datasets/consolidated/fixed/
  ```

- **8-Gate Quality Validation:**
  ```bash
  python ai/training_ready/scripts/verify_final_dataset.py --report
  ```

##### 1.4 Final Compilation
**Estimated Time:** 30-60 minutes

```bash
# Compile and upload to S3
python ai/training_ready/scripts/compile_final_dataset.py \
  --s3-bucket pixel-data \
  --upload-canonical

# Verify upload
aws s3 ls s3://pixel-data/final_dataset/ --recursive
```

### Phase 2: Baseline Validation (Weeks 3-4) - **PENDING**

#### 2.1 Stage 1 Training
- Launch foundation training
- Monitor metrics (Empathy: ≥0.70, Therapeutic appropriateness: ≥0.75, Safety: ≥0.80)

#### 2.2 Metrics Analysis
- Generate metrics dashboard
- Identify specific gaps
- Decision: Proceed to Phase 3 or optimize current data

### Phase 3: Conditional Strategic Expansion (Weeks 5-8) - **PENDING**

*Only triggered if Phase 2 metrics show specific gaps*

#### 3.1 Journal Research Searches (6 parallel)
- Psychotherapy Transcripts Search
- Clinical Reasoning Search
- Emotion Recognition Search
- Crisis Intervention Search
- Trauma-Informed Care Search
- Motivational Interviewing Search

#### 3.2 HuggingFace Deep Dive
- Search mental health conversation datasets
- Search Chain-of-thought reasoning datasets
- Search emotional support datasets
- Evaluate and prioritize discoveries

#### 3.3 Integration
- Integrate top 5 discoveries
- Update manifest
- Re-run quality validation
- Re-train and validate improvement

## 📊 PROGRESS OVERVIEW

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1 | ⚠️ In Progress | 75% Complete |
| Phase 2 | ⏳ Pending | 0% Complete |
| Phase 3 | ⏳ Pending | 0% Complete |

## ✅ COMPLETED TASKS

### Core Infrastructure ✅

#### Data Sources ✅
- Tim Fletcher integration complete (913 transcripts) ✅
- Multi-source voice persona integration (Understood, Wu Wei Wisdom, Unfilteredd, etc.) ✅
- Video transcripts (all .notes/transcripts/ files) ✅
- 52.20GB dataset confirmed in S3 ✅

#### Configuration ✅
- Training curriculum 2025 finalized ✅
- Enhanced `extract_long_running_therapy.py` with S3 streaming, upload, and dir scanning ✅
- Updated `MASTER_TRAINING_EPIC.md` to reflect dataset focus ✅
- Updated .memory files to track progress ✅

## 🎯 IMMEDIATE ACTIONS (Copy-Paste Ready)

```bash
# 1. Download priority datasets (CRITICAL)
rclone copy gdrive:datasets/datasets-wendy ~/datasets/consolidated/priority_wendy/
rclone copy gdrive:datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions ~/datasets/consolidated/cot/
rclone copy gdrive:datasets/CoT_Philosophical_Understanding ~/datasets/consolidated/cot/
rclone copy gdrive:datasets/reddit_mental_health/mental_disorders_reddit.csv ~/datasets/consolidated/reddit/
rclone copy gdrive:datasets/reddit_mental_health/Suicide_Detection.csv ~/datasets/consolidated/reddit/

# 2. Generate synthetic datasets
python ai/training_ready/scripts/generate_edge_case_synthetic_dataset.py \
  --output ai/training_ready/data/generated/edge_case_synthetic.jsonl \
  --categories all --count 10000
python ai/training_ready/scripts/build_cptsd_dataset_from_transcripts.py \
  --input-dir ~/datasets/gdrive/tier4_voice_persona/Tim\ Fletcher/ \
  --output ai/training_ready/data/generated/cptsd_transcripts.jsonl

# 3. Quality optimization
uv run python ai/training_ready/scripts/enhanced_deduplication.py --dry-run
uv run python ai/training_ready/scripts/enhanced_deduplication.py --confirm
python ai/training_ready/scripts/fix_encoding.py \
  --input-dir ~/datasets/consolidated/ \
  --output-dir ~/datasets/consolidated/fixed/
python ai/training_ready/scripts/verify_final_dataset.py --report

# 4. Compile and verify
python ai/training_ready/scripts/compile_final_dataset.py --s3-bucket pixel-data --upload-canonical
aws s3 ls s3://pixel-data/final_dataset/ --recursive
```

## 📝 NOTE TO TEAM

All coding agents should:
1. Focus on completing Phase 1 tasks FIRST before moving to other work
2. Document any issues or delays in .memory/60-issues.md
3. Update progress in .memory/50-progress.md after each task
4. Use the provided rclone and script commands to avoid errors

**Current bottleneck:** Downloading Tier 1 Priority datasets - this is required before any other training can proceed.

---

Last Updated: 2026-01-25
