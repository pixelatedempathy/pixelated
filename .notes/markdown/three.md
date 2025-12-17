# Google Drive → S3 Training Data Consolidation Audit

**Date**: 2025-12-11  
**Task**: Audit Google Drive training packages/datasets and document S3 consolidation structure  
**Architecture**: Google Drive (source/staging) → S3 (training mecca/canonical) → Training Scripts

## Google Drive Access Methods

### Mount Point
- **Primary Mount**: `/mnt/gdrive/datasets` (if mounted locally)
- **rclone Remote**: `gdrive:datasets` (via rclone)
- **Status**: Active rclone uploads running (per `.notes/markdown/one.md`)

### Access Scripts
- `ai/training_ready/platforms/ovh/gdrive-download.sh` - Download/sync scripts
- `ai/training_ready/platforms/ovh/sync-datasets.sh` - OVH sync with Google Drive support
- Registry: `ai/data/dataset_registry.json` - Complete dataset catalog

---

## Discovered Google Drive Training Packages/Datasets

### 1. CoT Reasoning Datasets (`/mnt/gdrive/datasets/CoT_*`)

**Purpose**: Chain of Thought clinical reasoning patterns  
**Total Size**: ~212 MB across 7 datasets  
**Stage**: `stage2_therapeutic_expertise`

**Datasets**:
1. **CoT_Clinical_Diagnosis_Mental_Health** (20 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Reasoning_Clinical_Diagnosis_Mental_Health/CoT_Reasoning_Clinical_Diagnosis_Mental_Health.json`
   - Focus: Clinical diagnosis reasoning

2. **CoT_Heartbreak_and_Breakups** (37 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Heartbreak_and_Breakups_downloaded.json`
   - Focus: Emotional intelligence, relationship therapy

3. **CoT_Neurodivergent_vs_Neurotypical** (53 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions_downloaded.json`
   - Focus: Neurodiversity-aware therapeutic approaches

4. **CoT_Mens_Mental_Health** (17 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Reasoning_Mens_Mental_Health_downloaded.json`
   - Focus: Gender-specific therapeutic reasoning

5. **CoT_Cultural_Nuances** (43 MB)
   - Path: `/mnt/gdrive/datasets/CoT-Reasoning_Cultural_Nuances/CoT-Reasoning_Cultural_Nuances_Dataset.json`
   - Focus: Culturally-sensitive therapeutic approaches

6. **CoT_Philosophical_Understanding** (33 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Philosophical_Understanding/CoT_Philosophical_Understanding.json`
   - Focus: Existential, philosophical therapy

7. **CoT_Temporal_Reasoning** (15 MB)
   - Path: `/mnt/gdrive/datasets/CoT_Temporal_Reasoning_Dataset/CoT_Temporal_Reasoning_Dataset.json`
   - Focus: Time-based therapeutic planning

**Organization Issues**:
- Inconsistent naming (some in folders, some as single files)
- Mixed path structures (`CoT_Reasoning_*` vs `CoT-Reasoning_*` vs `*_downloaded.json`)
- No clear consolidation folder

**Consolidation Opportunity**: Create `/mnt/gdrive/datasets/cot_reasoning/` and organize all CoT datasets there

---

### 2. Professional Therapeutic Datasets (`/mnt/gdrive/datasets/`)

**Purpose**: Licensed therapist responses and professional counseling  
**Total Size**: ~480 MB+ across 7 datasets  
**Stage**: `stage1_foundation`

**Datasets**:
1. **mental_health_counseling_conversations** (4.8 MB)
   - Path: `/mnt/gdrive/datasets/mental_health_counseling_conversations`
   - Focus: Licensed therapist responses

2. **SoulChat2.0**
   - Path: `/mnt/gdrive/datasets/SoulChat2.0`
   - Focus: Advanced psychological counselor digital twin

3. **counsel_chat**
   - Path: `/mnt/gdrive/datasets/counsel-chat`
   - Focus: Professional counseling conversation archive

4. **LLAMA3_Mental_Counseling_Data**
   - Path: `/mnt/gdrive/datasets/LLAMA3_Mental_Counseling_Data`
   - Focus: Advanced AI counseling conversations

5. **therapist_sft** (406 MB - largest)
   - Path: `/mnt/gdrive/datasets/therapist-sft-format`
   - Focus: Structured therapist training data

6. **neuro_qa_sft** (6.1 MB)
   - Path: `/mnt/gdrive/datasets/neuro_qa_SFT_Trainer`
   - Focus: Neurology/psychology Q&A

7. **Psych8k** (6.3 MB)
   - Path: `/mnt/gdrive/datasets/Psych8k`
   - Focus: Alexander Street professional therapy conversations

**Organization Issues**:
- All in root `/mnt/gdrive/datasets/` - no grouping
- Inconsistent naming conventions (kebab-case vs snake_case vs CamelCase)
- No clear distinction between raw vs processed data

**Consolidation Opportunity**: Create `/mnt/gdrive/datasets/professional_therapeutic/` and organize all professional datasets there

---

### 3. Priority Datasets (`/mnt/gdrive/datasets/datasets-wendy/`)

**Purpose**: Top-tier curated therapeutic conversations  
**Total Size**: Unknown (JSONL files)  
**Stage**: `stage1_foundation`  
**Quality Profile**: `foundation` (highest tier)

**Datasets**:
1. **priority_1_FINAL.jsonl**
   - Path: `/mnt/gdrive/datasets/datasets-wendy/priority_1_FINAL.jsonl`
   - Tier: 1 (highest)
   - Focus: Top-tier therapeutic conversations

2. **priority_2_FINAL.jsonl**
   - Path: `/mnt/gdrive/datasets/datasets-wendy/priority_2_FINAL.jsonl`
   - Tier: 1
   - Focus: High-quality mental health data

3. **priority_3_FINAL.jsonl**
   - Path: `/mnt/gdrive/datasets/datasets-wendy/priority_3_FINAL.jsonl`
   - Tier: 1
   - Focus: Specialized therapeutic content

**Organization Status**: ✅ Already organized in `datasets-wendy/` subfolder

**Consolidation Opportunity**: Keep structure, but consider renaming to `priority/` for clarity

---

### 4. Edge Case Sources (`/mnt/gdrive/datasets/reddit/`)

**Purpose**: Raw forum data for crisis scenarios  
**Stage**: `stage3_edge_stress_test`  
**Quality Profile**: `edge_raw`

**Datasets**:
- **reddit_archives**
  - Path: `/mnt/gdrive/datasets/reddit`
  - Focus: Reddit anxiety/depression/suicide watch dumps
  - Status: Raw forum data, needs processing

**Organization Issues**:
- Generic name (`reddit`) - unclear what's inside
- No processing status indicators
- May overlap with local `ai/datasets/tier4_reddit_archive`

**Consolidation Opportunity**: Organize under `/mnt/gdrive/datasets/edge_cases/raw/reddit/`

---

## Overlap Analysis

### Potential Duplicates

1. **mental_health_counseling_conversations**
   - Google Drive: `/mnt/gdrive/datasets/mental_health_counseling_conversations`
   - Local: `ai/data/acquired_datasets/mental_health_counseling.json` (3,512 conversations)
   - **Status**: May be same dataset, different formats
   - **Action**: Verify if same content, document relationship

2. **CoT Reasoning**
   - Google Drive: Multiple CoT datasets
   - Local: `ai/data/acquired_datasets/cot_reasoning.json` (300 conversations)
   - **Status**: Local is subset/filtered version
   - **Action**: Document that local is filtered subset of Drive datasets

3. **Reddit Archives**
   - Google Drive: `/mnt/gdrive/datasets/reddit`
   - Local: `ai/datasets/tier4_reddit_archive` (19 Kaggle TF-IDF exports)
   - **Status**: Different sources, may have overlap
   - **Action**: Document relationship, avoid duplicate processing

---

## Proposed S3 Consolidation Structure (Training Mecca)

### Target Structure on S3 (Canonical Training Data Location)

**Primary Bucket**: `s3://pixel-data/`

**Note**: Google Drive structure organization is secondary - the important consolidation is on S3 where training actually happens.

```
gdrive:datasets/
├── cot_reasoning/                    # All CoT reasoning datasets
│   ├── clinical_diagnosis_mental_health.json
│   ├── heartbreak_and_breakups.json
│   ├── neurodivergent_vs_neurotypical.json
│   ├── mens_mental_health.json
│   ├── cultural_nuances.json
│   ├── philosophical_understanding.json
│   └── temporal_reasoning.json
├── professional_therapeutic/         # All professional datasets
│   ├── mental_health_counseling/
│   ├── soulchat2.0/
│   ├── counsel_chat/
│   ├── llama3_mental_counseling/
│   ├── therapist_sft/                # 406 MB - largest
│   ├── neuro_qa_sft/
│   └── psych8k/
├── priority/                         # Renamed from datasets-wendy
│   ├── priority_1_FINAL.jsonl
│   ├── priority_2_FINAL.jsonl
│   └── priority_3_FINAL.jsonl
├── edge_cases/                       # Edge case and crisis data
│   ├── raw/
│   │   └── reddit/                   # Reddit archives
│   └── processed/                    # Processed edge cases (if any)
├── voice_persona/                    # Voice/persona training data
│   └── tim_fletcher/                 # If stored on Drive
└── training_packages/                # Complete training packages (if any)
    ├── lightning_package/            # If any Lightning packages stored
    └── therapeutic_package/          # If any therapeutic packages stored
```

---

## Consolidation Strategy: S3 as Training Mecca

### Phase 1: Documentation & S3 Structure ✅ COMPLETE
- [x] Document current Google Drive structure (this file)
- [x] Document S3 structure as canonical (`S3_TRAINING_DATA_STRUCTURE.md`)
- [x] Create Google Drive structure reference (`GDRIVE_STRUCTURE.md` - updated to clarify S3 is canonical)
- [x] Update `dataset_registry.json` with S3 paths as primary
- [x] Create summary document (`.notes/markdown/four.md`)

### Phase 2: S3 Organization (Primary Focus)
- [ ] Complete raw sync: Google Drive → `s3://pixel-data/gdrive/raw/` (in progress)
- [ ] Process and organize: `gdrive/raw/` → `gdrive/processed/` (canonical structure)
- [ ] Create organized S3 structure:
  - `gdrive/processed/cot_reasoning/`
  - `gdrive/processed/professional_therapeutic/`
  - `gdrive/processed/priority/`
  - `gdrive/processed/edge_cases/`

### Phase 3: Update Training Scripts (S3-First)
- [ ] Update all training scripts to read from S3 (not Google Drive or local)
- [ ] Update `dataset_registry.json` with S3 paths as canonical references
- [ ] Update sync scripts to organize data in S3 during upload
- [ ] Document S3 access patterns in training scripts
- [ ] Create S3DatasetLoader for streaming from S3 (per `S3_EXECUTION_ORDER.md`)

### Phase 4: Google Drive Organization (Optional - Secondary)
- [ ] Organize Google Drive for easier syncing (optional, not required for training)
- [ ] Update sync scripts to maintain organized structure in S3 (regardless of Drive structure)

---

## Access Patterns & Scripts

### Current Access Methods

1. **Direct Mount** (if available):
   ```bash
   ls /mnt/gdrive/datasets/
   ```

2. **rclone** (recommended):
   ```bash
   rclone lsd gdrive:datasets
   rclone copy gdrive:datasets/CoT_Reasoning_* ./local/cot_reasoning/
   ```

3. **Download Scripts**:
   ```bash
   ./ai/training_ready/platforms/ovh/gdrive-download.sh download-all
   ```

4. **OVH Sync**:
   ```bash
   ./ai/training_ready/platforms/ovh/sync-datasets.sh upload
   # Includes Google Drive datasets if mounted
   ```

---

## Missing Information to Gather

1. **Training Packages on Drive**:
   - Are there any complete training packages stored on Google Drive?
   - Any Lightning.ai deployment packages?
   - Any therapeutic package snapshots?

2. **Dataset Sizes**:
   - Exact sizes for all datasets (some missing in registry)
   - Total storage used
   - Storage quotas/limits

3. **Access Permissions**:
   - Who has access to Google Drive?
   - Can we reorganize folders?
   - Are there shared folders vs personal folders?

4. **Processing Status**:
   - Which datasets are raw vs processed?
   - Any intermediate processing artifacts?
   - Any duplicate processing efforts?

---

## Integration with S3 (Training Mecca)

### Data Flow Architecture

```
Google Drive (Source/Staging)
    ↓ [rclone sync - active uploads running]
S3: s3://pixel-data/gdrive/raw/ (backup)
    ↓ [process & organize]
S3: s3://pixel-data/gdrive/processed/ (canonical)
    ↓ [training scripts read from]
Model Training
```

### Relationship to `ai/training_ready/`

The local consolidation in `ai/training_ready/` should:
1. **Reference S3 paths** in configs/docs (S3 is canonical)
2. **Use dataset_registry.json** with S3 paths as primary
3. **Read from S3** in training scripts (not Google Drive or local)
4. **Document S3 access patterns** - see `S3_TRAINING_DATA_STRUCTURE.md`

### Example Integration (S3-First)

```python
# Training scripts should read from S3
import boto3

def get_training_dataset(dataset_name: str, category: str):
    """Get dataset from S3 - the training mecca"""
    s3 = boto3.client('s3', endpoint_url='https://s3.us-east-va.cloud.ovh.us')
    bucket = 'pixel-data'
    
    # Try canonical processed structure first
    key = f'gdrive/processed/{category}/{dataset_name}'
    try:
        obj = s3.get_object(Bucket=bucket, Key=key)
        return json.loads(obj['Body'].read())
    except:
        # Fallback to raw structure
        key = f'gdrive/raw/{dataset_name}'
        obj = s3.get_object(Bucket=bucket, Key=key)
        return json.loads(obj['Body'].read())
```

---

## Next Steps

1. **Immediate** (Documentation - ✅ COMPLETE):
   - [x] Complete this audit document
   - [x] Create `S3_TRAINING_DATA_STRUCTURE.md` - **S3 as training mecca**
   - [x] Create `GDRIVE_STRUCTURE.md` - Google Drive as source/staging
   - [x] Update `dataset_registry.json` with S3 canonical notes
   - [x] Update sync scripts with S3 structure awareness

2. **Short-term** (S3 Organization):
   - [ ] Complete raw sync: Google Drive → `s3://pixel-data/gdrive/raw/` (in progress)
   - [ ] Process and organize raw data into `gdrive/processed/` canonical structure
   - [ ] Verify S3 access patterns and test S3DatasetLoader
   - [ ] Update training scripts to read from S3 (not Google Drive or local)

3. **Long-term** (S3-First Training):
   - [ ] All training scripts read from S3 canonical paths
   - [ ] Update `dataset_registry.json` with S3 paths as primary references
   - [ ] Implement S3 streaming loaders per `S3_EXECUTION_ORDER.md`
   - [ ] Optional: Organize Google Drive for easier syncing (secondary priority)

---

## Documentation Created

- ✅ `ai/training_ready/docs/S3_TRAINING_DATA_STRUCTURE.md` - **S3 training mecca structure** ⭐
- ✅ `ai/training_ready/docs/GDRIVE_STRUCTURE.md` - Google Drive source/staging reference
- ✅ `ai/training_ready/docs/GDRIVE_MIGRATION_GUIDE.md` - Google Drive reorganization (optional)
- ✅ `.notes/markdown/four.md` - S3 consolidation summary
- ✅ Updated `ai/data/dataset_registry.json` with S3 canonical notes
- ✅ Updated sync scripts with S3 structure awareness

---

## Notes

- **S3 is the training mecca** - All training scripts should read from S3, not Google Drive or local
- **Google Drive is source/staging** - Syncs to S3 via rclone (active uploads running)
- **S3 structure is canonical** - `s3://pixel-data/gdrive/processed/` is where training happens
- **No local copying required** - Training scripts read directly from S3
- **Registry should reference S3** - `dataset_registry.json` should use S3 paths as primary
- **Backward compatibility** - Sync scripts support both old and new structures during transition
