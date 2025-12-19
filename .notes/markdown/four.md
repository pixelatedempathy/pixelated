# S3 Training Mecca Consolidation Summary

**Date**: 2025-12-11  
**Status**: Documentation Complete

## Architecture Clarification

### Data Flow
```
Google Drive (Source/Staging)
    ↓ [rclone sync - active uploads]
S3: s3://pixel-data/ (Training Mecca - Canonical)
    ↓ [Training Scripts Read From]
Model Training
```

**Key Principle**: 
- **S3 is the training mecca** - single source of truth for all training data
- **Google Drive is source/staging** - syncs to S3, not used directly for training
- **Local is cache only** - temporary caches, not source of truth

---

## Documentation Created

### S3 Structure (Primary)
- ✅ `ai/training_ready/docs/S3_TRAINING_DATA_STRUCTURE.md` - **Canonical S3 structure reference**
  - Complete S3 bucket organization
  - Training stage mappings
  - S3-first access patterns for training scripts
  - Data flow: Google Drive → S3

### Google Drive Structure (Secondary - Source/Staging)
- ✅ `ai/training_ready/docs/GDRIVE_STRUCTURE.md` - Google Drive organization reference
  - Updated to clarify it's source/staging, not canonical
  - Points to S3 as training mecca

### Migration Guides
- ✅ `ai/training_ready/docs/GDRIVE_MIGRATION_GUIDE.md` - Google Drive reorganization (optional)
- ✅ `.notes/markdown/three.md` - Complete audit with S3 focus

### Updated References
- ✅ `ai/data/dataset_registry.json` - Added S3 canonical notes
- ✅ Sync scripts - Updated with S3 structure awareness

---

## S3 Consolidation Status

### Current State
- **Raw sync in progress**: Google Drive → `s3://pixel-data/gdrive/raw/`
  - Status: `processed` tier DONE, `raw` tier IN PROGRESS
  - Log: `upload_raw_final.log`
  - Method: rclone in tmux session (stable, low-priority)

### Target Structure
- **Canonical location**: `s3://pixel-data/gdrive/processed/`
  - Organized by category: `cot_reasoning/`, `professional_therapeutic/`, `priority/`, `edge_cases/`
  - This is where training scripts should read from

### Next Steps
1. Complete raw sync to S3
2. Process and organize raw data into `gdrive/processed/` structure
3. Update all training scripts to read from S3 (not Google Drive or local)
4. Update `dataset_registry.json` with S3 paths as primary

---

## Training Script Pattern (S3-First)

All training scripts should follow this pattern:

```python
# S3 is canonical - read from S3
def get_training_dataset(dataset_name: str, category: str):
    s3_path = f"s3://pixel-data/gdrive/processed/{category}/{dataset_name}"
    # Load from S3, cache locally if needed
    return load_from_s3(s3_path)
```

**Not this** (old pattern):
```python
# ❌ Don't read from Google Drive or local for training
if os.path.exists('/mnt/gdrive/datasets/...'):
    # This is wrong - S3 is canonical
```

---

## Related Documentation

- **S3 Structure**: `ai/training_ready/docs/S3_TRAINING_DATA_STRUCTURE.md` ⭐ **Start here**
- **Google Drive Audit**: `.notes/markdown/three.md`
- **Local Consolidation**: `.notes/markdown/two.md`
- **S3 Execution Order**: `ai/training_ready/docs/S3_EXECUTION_ORDER.md`
