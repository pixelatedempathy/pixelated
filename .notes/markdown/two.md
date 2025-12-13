# Training Package Consolidation Audit - Findings & Plan

**Date**: 2025-12-11  
**Task**: Consolidate all training packages into `ai/training_ready/` as single canonical home

## Discovered Training Packages

### 1. `ai/lightning_training_package/` (KAN-28 Enhanced)
**Purpose**: Lightning.ai deployment package with KAN-28 component integration  
**Status**: Self-contained package, references large datasets (2.49GB) not in repo

**Contents**:
- `scripts/`: train_enhanced.py, train_moe_h100.py, data_preparation.py, training_utils.py
- `config/`: enhanced_training_config.json, moe_training_config.json, lightning_deployment_config.json
- `data/`: ULTIMATE_FINAL_INTEGRATION_SUMMARY.json, unified_6_component_summary.json
- `models/`: moe_architecture.py, therapeutic_progress_tracker.py
- `validation_scripts/`: benchmark_inference.py, inference_service.py
- `README.md`, `PACKAGE_MANIFEST.md`, `requirements.txt`, `quick_start.py`

**Unique Value**: KAN-28 component integration (6 components), Lightning.ai deployment focus

**Missing References**: 
- Large dataset files referenced in manifest (ULTIMATE_FINAL_DATASET.jsonl - 2.49GB, 608K conversations) not present in repo

---

### 2. `ai/therapeutic_ai_training_package_20251028_204104/` (v5.0 Production Ready)
**Purpose**: Complete H100 MoE training system with inference and progress tracking  
**Status**: Most complete/up-to-date package, references historical `ai/lightning/` paths

**Contents**:
- `training_scripts/`: train_optimized.py, train_moe_h100.py, inference_service.py, inference_optimizer.py, progress_tracking_api.py, therapeutic_progress_tracker.py, training_optimizer.py, moe_architecture.py
- `configs/`: moe_training_config.json, requirements_moe.txt
- `data_pipeline/`: integrated_training_pipeline.py, dual_persona_loader.py, edge_case_jsonl_loader.py, pixel_voice_loader.py, psychology_knowledge_loader.py
- `docs/`: IMPLEMENTATION_COMPLETE.md, LIGHTNING_H100_QUICK_DEPLOY.md, QUICK_START_GUIDE.md
- `utils/`: logger.py
- `data/dual_persona/`: training_config.json
- `README.md`, `manifest.json`

**Unique Value**: Most complete training/inference/progress tracking system, H100 optimization profiles

**Stale References** (from manifest.json):
- `ai/lightning/MODEL_ARCHITECTURE_PERFORMANCE.md` (missing)
- `ai/lightning/TRAINING_PROCEDURES.md` (missing)
- `ai/lightning/USER_GUIDE.md` (missing)
- `ai/lightning/training_dataset.json` (missing)
- `ai/pipelines/dual_persona_training/dual_persona_training_data.jsonl` (missing)
- `ai/pipelines/edge_case_pipeline_standalone/output/edge_cases_training_format.jsonl` (missing)
- `ai/training_data_consolidated/dsm5_concepts.json` (missing)
- `ai/training_data_consolidated/psychology_knowledge_base.json` (missing)
- `ai/training_data_consolidated/therapeutic_techniques.json` (missing)

**Copied From** (historical paths, now need updating):
- Files originally from `ai/lightning/...` (directory doesn't exist anymore)
- Files from `ai/dataset_pipeline/...` (still exists)
- Files from `ai/pipelines/...` (still exists)

---

### 3. `ai/training_ready/` (Current Homebase)
**Purpose**: S3-first execution workflow for training data preparation  
**Status**: Starting to centralize, has phase scripts and S3 execution order

**Current Contents**:
- `scripts/`: run_phase1_acquisition.py, run_phase2_processing.py, run_phase3_modalities.py, run_phase4_synthesis.py, run_voice_ingestion.py, test_simulation.py, upload_to_s3.py
- `experimental/h100_moe/README.md`: Links to therapeutic package but references non-existent paths
- `S3_EXECUTION_ORDER.md`: S3-first workflow documentation

**Unique Value**: S3-first data pipeline, phase-based orchestration

---

### 4. `ai/ovh/` (OVH Platform Integration)
**Purpose**: OVHcloud AI Training integration for Wayfarer-2-12B  
**Status**: Platform-specific training package

**Contents**:
- `train_ovh.py`, `training-job.yaml`, `run-training.sh`
- `sync-datasets.sh`, `upload_to_s3.sh`, `gdrive-download.sh`
- `Dockerfile.training`, `Dockerfile.inference`, `Dockerfile.ollama`
- `inference_server.py`, `process_datasets_chatml.py`, `process_datasets_streaming.py`
- `deploy-inference.sh`, `ollama-entrypoint.sh`
- `README.md`, `DATASET_EXPANSION_DISCOVERY_PLAN.md`

**Unique Value**: OVH-specific deployment and dataset sync

---

### 5. `ai/training_data_consolidated/`
**Purpose**: Consolidated training data manifests  
**Status**: Minimal, only has final/MASTER_STAGE_MANIFEST.json

**Contents**:
- `final/MASTER_STAGE_MANIFEST.json`: References `MASTER_stage1_foundation.jsonl` (not present)

**Missing**: Referenced knowledge base files (dsm5_concepts.json, psychology_knowledge_base.json, therapeutic_techniques.json)

---

### 6. `ai/QUICK_START_GUIDE.md` (Root Level)
**Purpose**: Foundation model training quick start  
**Status**: Duplicate of therapeutic package QUICK_START_GUIDE.md, references `ai/lightning/...`

**Issues**: 
- References non-existent `ai/lightning/` directory
- Duplicate content with therapeutic package docs

---

## Overlap Analysis

### Script Overlaps
- **train_moe_h100.py**: Exists in both lightning_training_package and therapeutic package
  - **Decision**: Keep therapeutic package version (more complete, v5.0)
- **inference_service.py**: Exists in both lightning_training_package/validation_scripts and therapeutic package/training_scripts
  - **Decision**: Keep therapeutic package version (more complete)
- **moe_architecture.py**: Exists in both packages
  - **Decision**: Keep therapeutic package version (v5.0)
- **therapeutic_progress_tracker.py**: Exists in both packages
  - **Decision**: Keep therapeutic package version (v5.0)

### Config Overlaps
- **moe_training_config.json**: Exists in both packages
  - **Decision**: Keep therapeutic package version (v5.0), archive lightning version if different

### Unique Scripts to Keep
- **lightning_training_package**: train_enhanced.py (KAN-28 specific), data_preparation.py, training_utils.py, quick_start.py
- **therapeutic package**: train_optimized.py (automatic optimization), inference_optimizer.py, progress_tracking_api.py, training_optimizer.py, all data_pipeline loaders

---

## Consolidation Strategy

### Target Structure: `ai/training_ready/`
```
ai/training_ready/
├── docs/                          # All training documentation
│   ├── QUICK_START_GUIDE.md      # Canonical quick start (from therapeutic)
│   ├── LIGHTNING_H100_QUICK_DEPLOY.md
│   ├── IMPLEMENTATION_COMPLETE.md
│   ├── S3_EXECUTION_ORDER.md     # Keep existing
│   ├── PACKAGE_MANIFEST.md       # From lightning package
│   └── archive/                  # Archived duplicates
├── scripts/                       # All runnable training scripts
│   ├── train_optimized.py        # Main training (therapeutic v5.0)
│   ├── train_enhanced.py         # KAN-28 enhanced (lightning)
│   ├── train_moe_h100.py        # MoE training (therapeutic v5.0)
│   ├── inference_service.py     # Inference (therapeutic v5.0)
│   ├── inference_optimizer.py
│   ├── progress_tracking_api.py
│   ├── training_optimizer.py
│   ├── data_preparation.py      # From lightning
│   ├── training_utils.py        # From lightning
│   ├── benchmark_inference.py  # From lightning
│   ├── quick_start.py          # Lightning deployment
│   └── [existing phase scripts] # Keep existing
├── configs/                      # All configuration files
│   ├── moe_training_config.json # Canonical (therapeutic v5.0)
│   ├── enhanced_training_config.json # From lightning
│   ├── lightning_deployment_config.json
│   ├── requirements_moe.txt     # Canonical
│   └── requirements.txt         # From lightning
├── pipelines/                     # Data pipeline scripts
│   ├── integrated_training_pipeline.py
│   ├── dual_persona_loader.py
│   ├── edge_case_jsonl_loader.py
│   ├── pixel_voice_loader.py
│   └── psychology_knowledge_loader.py
├── models/                        # Model architecture files
│   ├── moe_architecture.py      # Canonical (therapeutic v5.0)
│   └── therapeutic_progress_tracker.py # Canonical
├── data/                          # Local training data
│   ├── training_data_consolidated/ # Moved from root
│   │   └── final/
│   │       └── MASTER_STAGE_MANIFEST.json
│   ├── ULTIMATE_FINAL_INTEGRATION_SUMMARY.json
│   └── unified_6_component_summary.json
├── platforms/                     # Platform-specific integrations
│   └── ovh/                       # Moved from ai/ovh/
├── utils/                         # Utility modules
│   └── logger.py
└── experimental/                  # Experimental features
    └── h100_moe/                  # Keep, update paths
        └── README.md
```

---

## Upgrade Ideas & Notes

### From `training-infrastructure-optimization-plan.md`:
1. **Streaming Data Processing**: Process conversations in batches of 10K instead of loading entire dataset (70% memory reduction)
2. **Dataset Format Optimization**: Convert to Parquet/Arrow for 50% faster I/O
3. **Intelligent Data Caching**: Redis-based caching for 40-60% reduction in data loading time

### Missing Files to Document:
- Large datasets referenced but not in repo (record in docs, point to S3 if available)
- Knowledge base files (dsm5_concepts.json, psychology_knowledge_base.json, therapeutic_techniques.json) - may need regeneration or S3 pointers

### Path Reference Updates Needed:
- All references to `ai/lightning/...` → `ai/training_ready/...`
- Update `experimental/h100_moe/README.md` to reference real paths
- Update all docs to use canonical `ai/training_ready/...` paths

---

## Execution Checklist

- [x] Inventory all training packages
- [x] Document overlaps and unique values
- [x] Create consolidated structure in `ai/training_ready/`
- [x] Merge scripts/configs/docs/data
- [x] Update all path references
- [x] Delete old package roots
- [x] Verify with Python sanity checks

---

## Related: Google Drive Consolidation

See `.notes/markdown/three.md` for Google Drive training package audit and consolidation planning (files remain on Drive, but structure documented for organization).
