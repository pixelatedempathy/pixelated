# Dataset Expansion Decision - Action Plan

**Date**: 2025-12-18  
**Status**: Approved - Phased Implementation  
**Decision**: Complete foundation first, then conditional strategic expansion

---

## Executive Summary

After comprehensive analysis of current dataset status (6.4GB, 300K+ conversations), training infrastructure, and research on LLM scaling laws, we recommend a **phased approach with quality gates**:

1. **Phase 1**: Complete missing foundation data (1.86GB) and optimize quality
2. **Phase 2**: Validate baseline with training metrics
3. **Phase 3**: Conditional expansion based on empirical gaps

**Rationale**: Research shows diminishing returns beyond optimal dataset sizes, and quality matters more than quantity. Current data already exceeds target (300K vs 100K), but missing Tier 1 priority data (40% training weight) is critical.

---

## Project Links and Execution Checklist

- Jira project: https://gemcityxyz.atlassian.net/browse/KAN
- Confluence page: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7307265
  - Governance & Licensing: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7372801
  - Ingestion & Quality Scoring: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7471105
  - Quality-Aware Curriculum: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7503873
  - Training & Ablations: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7438337
  - Evaluation & Safety Gates: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7405569
  - Observability & Drift: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7340033
  - Documentation & Knowledge Base: https://gemcityxyz.atlassian.net/wiki/spaces/PE/pages/7176194
- Source notes: [.notes/dataset-expansion-decision/00-README.md](../dataset-expansion-decision/00-README.md), [.notes/dataset-expansion-decision/02-DEEP-ANALYSIS.md](../dataset-expansion-decision/02-DEEP-ANALYSIS.md), [.notes/dataset-expansion-decision/03-RESEARCH-COMPARISON.md](../dataset-expansion-decision/03-RESEARCH-COMPARISON.md)

Checklist (Phase 1–2 focus)
- [ ] Governance: finalize data source matrix and license checks
- [ ] Provenance pipeline: attach source + license metadata to all records
- [ ] PII/PHI redaction MVP + audit sampling
- [ ] Ingest missing Tier 1/2/3 datasets (per commands below)
- [ ] Quality scoring v1 (empathy, fidelity, harmfulness, domain relevance)
- [ ] Dedup to <1%; leakage prevention; holdout isolation
- [ ] Bias/safety filters tuned with red-team feedback
- [ ] Curriculum/mix policy defined and simulated
- [ ] Baseline and ablation runs completed
- [ ] Eval suite integrated and thresholds set (therapy-bench, clinical similarity, MI, toxicity/harms, refusal, crisis)
- [ ] All safety gates pass vs baseline
- [ ] Final compilation + manifest + verification report

## Phase 1: Foundation Completion (Weeks 1-2)

### 1.1 Download Missing GDrive Data (Priority: CRITICAL)

**Objective**: Acquire 1.86GB of missing high-quality data, especially Tier 1 priority (40% training weight)

**Tasks**:

#### Tier 1 Priority Datasets (1.16GB) - **HIGHEST PRIORITY**
```bash
# On remote server - download wendy priority datasets
rclone copy gdrive:datasets/datasets-wendy ~/datasets/consolidated/priority_wendy/ --progress
```

**Expected Files**:
- `priority_1_FINAL.jsonl` + summary.json (462MB)
- `priority_2_FINAL.jsonl` + summary.json (330MB)
- `priority_3_FINAL.jsonl` + summary.json (370MB)
- `priority_4_FINAL.jsonl` + summary.json (TBD)
- `priority_5_FINAL.jsonl` + summary.json (TBD)

**Success Criteria**:
- ✅ All 5 priority files downloaded and verified
- ✅ File integrity checksums match
- ✅ Files accessible via S3 manifest

**Owner**: Dataset Team  
**Timeline**: Days 1-2

#### Tier 3 CoT Datasets (86MB)
```bash
# Download missing CoT datasets
rclone copy gdrive:datasets/CoT_Neurodivergent_vs_Neurotypical_Interactions ~/datasets/consolidated/cot/
rclone copy gdrive:datasets/CoT_Philosophical_Understanding ~/datasets/consolidated/cot/
```

**Expected Files**:
- `CoT_Neurodivergent_vs_Neurotypical_Interactions` (53MB)
- `CoT_Philosophical_Understanding` (33MB, 60K entries)

**Success Criteria**:
- ✅ Both files downloaded and verified
- ✅ Integrated into Stage 2 (Therapeutic Expertise) training

**Owner**: Dataset Team  
**Timeline**: Days 2-3

#### Tier 4 Reddit Data (700MB+)
```bash
# Download additional reddit mental health
rclone copy gdrive:datasets/reddit_mental_health/mental_disorders_reddit.csv ~/datasets/consolidated/reddit/
rclone copy gdrive:datasets/reddit_mental_health/Suicide_Detection.csv ~/datasets/consolidated/reddit/
rclone copy gdrive:datasets/reddit_mental_health/merged_mental_health_dataset.jsonl ~/datasets/consolidated/reddit/
```

**Expected Files**:
- `mental_disorders_reddit.csv` (561MB)
- `Suicide_Detection.csv` (159MB)
- `merged_mental_health_dataset.jsonl` (85MB)

**Success Criteria**:
- ✅ All 3 files downloaded and verified
- ✅ Integrated into Stage 3 (Edge Stress Test) training

**Owner**: Dataset Team  
**Timeline**: Days 3-4

#### Tier 2 Missing Professional Datasets
```bash
# Download LLAMA3 and additional professional datasets
rclone copy gdrive:datasets/LLAMA3_Mental_Counseling_Data ~/datasets/consolidated/professional/
```

**Success Criteria**:
- ✅ LLAMA3 dataset downloaded and verified
- ✅ Integrated into Stage 1 (Foundation) training

**Owner**: Dataset Team  
**Timeline**: Days 4-5

---

### 1.2 Generate Missing Datasets (Priority: HIGH)

**Objective**: Complete the 3 missing/partial dataset families

#### Edge Case Synthetic Dataset
**Current Status**: 1 object (partial)  
**Action**: Run edge case generator to create comprehensive synthetic edge cases

```bash
python ai/training_ready/scripts/generate_edge_case_synthetic_dataset.py \
  --output ai/training_ready/data/generated/edge_case_synthetic.jsonl \
  --categories all \
  --count 10000
```

**Success Criteria**:
- ✅ Generated 10K+ synthetic edge cases
- ✅ All 25 difficulty categories represented
- ✅ Quality validation passed
- ✅ Uploaded to S3 canonical location

**Owner**: Edge Case Team  
**Timeline**: Days 5-7

#### Long-Running Therapy Dataset
**Current Status**: 1 object (partial)  
**Action**: Extract long sessions (>20 turns) from existing therapy datasets

```bash
python ai/training_ready/scripts/extract_long_running_therapy.py \
  --input-dir ~/datasets/consolidated/ \
  --output ai/training_ready/data/generated/long_running_therapy.jsonl \
  --min-turns 20
```

**Success Criteria**:
- ✅ Extracted 5K+ long-running sessions
- ✅ Sessions preserve full context
- ✅ Quality validation passed
- ✅ Uploaded to S3 canonical location

**Owner**: Dataset Team  
**Timeline**: Days 6-8

#### CPTSD Dataset
**Current Status**: 296 objects present but needs proper tagging  
**Action**: Tag Tim Fletcher transcripts and other CPTSD content properly

```bash
python ai/training_ready/scripts/build_cptsd_dataset_from_transcripts.py \
  --input-dir ~/datasets/gdrive/tier4_voice_persona/Tim\ Fletcher/ \
  --output ai/training_ready/data/generated/cptsd_transcripts.jsonl \
  --tag-strategy comprehensive
```

**Success Criteria**:
- ✅ All Tim Fletcher transcripts tagged with CPTSD metadata
- ✅ CPTSD-specific content identified and categorized
- ✅ Quality validation passed
- ✅ Uploaded to S3 canonical location

**Owner**: Voice/Persona Team  
**Timeline**: Days 7-9

---

### 1.3 Quality Optimization (Priority: HIGH)

**Objective**: Remove duplicates, fix encoding, ensure data quality

#### Enhanced Deduplication
**Current Status**: 4,007 duplicates (8% duplication rate)

```bash
# Dry run first
uv run python ai/training_ready/scripts/enhanced_deduplication.py --dry-run

# Execute with priority order strategy
uv run python ai/training_ready/scripts/enhanced_deduplication.py \
  --keep-strategy priority_order \
  --confirm
```

**Success Criteria**:
- ✅ Duplicates removed (target: <1% duplication rate)
- ✅ Split leakage prevented
- ✅ Holdout families isolated
- ✅ Deduplication report generated

**Owner**: Data Quality Team  
**Timeline**: Days 8-10

#### Encoding Fix
**Current Status**: Some files have UTF-8 decode errors

```bash
python ai/training_ready/scripts/fix_encoding.py \
  --input-dir ~/datasets/consolidated/ \
  --output-dir ~/datasets/consolidated/fixed/ \
  --normalize-utf8
```

**Success Criteria**:
- ✅ All files UTF-8 normalized
- ✅ No encoding errors in validation
- ✅ Encoding fix report generated

**Owner**: Data Quality Team  
**Timeline**: Days 9-11

#### Quality Validation
```bash
python ai/training_ready/scripts/verify_final_dataset.py \
  --manifest ai/training_ready/data/s3_manifest.json \
  --output ai/training_ready/data/verification_report.json
```

**8 Verification Gates**:
1. ✅ Coverage Gate: All 14 families present
2. ✅ Leakage Gate: No cross-split duplicates
3. ✅ Distribution Gate: Balanced splits (90/5/5)
4. ✅ PII Gate: No requires_review conversations
5. ✅ Provenance Gate: All conversations have provenance
6. ✅ Hash Gate: All conversations have valid content_hash
7. ✅ Split Gate: Holdout families only in test
8. ✅ Stats Gate: Distribution statistics present

**Success Criteria**:
- ✅ All 8 gates pass
- ✅ Verification report generated
- ✅ Ready for final compilation

**Owner**: Data Quality Team  
**Timeline**: Days 11-12

---

### 1.4 Final Dataset Compilation (Priority: CRITICAL)

**Objective**: Create final training dataset with manifest and compiled export

```bash
python ai/training_ready/scripts/compile_final_dataset.py \
  --manifest ai/training_ready/data/s3_manifest.json \
  --output-dir ai/training_ready/data/final_dataset/ \
  --split-ratio 0.90 0.05 0.05
```

**Outputs**:
- `manifest.json` - Dataset index with shards and provenance
- `compiled/final_training_dataset.jsonl` - Single-file export
- `shards/train/*.jsonl` - Training shards
- `shards/val/*.jsonl` - Validation shards
- `shards/test/*.jsonl` - Test shards

**Upload to S3**:
```bash
# Upload to canonical locations
aws s3 cp ai/training_ready/data/final_dataset/manifest.json s3://pixel-data/final_dataset/manifest.json
aws s3 cp ai/training_ready/data/final_dataset/compiled/final_training_dataset.jsonl s3://pixel-data/final_dataset/compiled/final_training_dataset.jsonl
aws s3 sync ai/training_ready/data/final_dataset/shards/ s3://pixel-data/final_dataset/shards/
```

**Success Criteria**:
- ✅ Manifest generated with all metadata
- ✅ Compiled export created
- ✅ Sharded datasets created
- ✅ All files uploaded to S3
- ✅ S3 paths verified

**Owner**: Dataset Team  
**Timeline**: Days 12-14

---

## Phase 2: Baseline Validation (Weeks 3-4)

### 2.1 Stage 1 Training (Foundation)

**Objective**: Train Stage 1 (Foundation) and evaluate baseline metrics

```bash
python ai/training_ready/scripts/train_enhanced.py \
  --phase sft \
  --stage 1 \
  --config ai/training_ready/configs/training_curriculum_2025.json \
  --checkpoint-dir s3://pixelated-checkpoints/foundation/stage1_foundation/
```

**Success Metrics** (from TRAINING_PLAN.md):
- Empathy: ≥ 0.70
- Therapeutic appropriateness: ≥ 0.75
- Safety: ≥ 0.80

**Evaluation**:
- Validation loss curves
- Perplexity metrics
- Therapeutic quality scores
- Early stopping (patience: 3 epochs)

**Owner**: Training Team  
**Timeline**: Days 15-21

---

### 2.2 Metrics Analysis

**Objective**: Analyze training metrics to identify gaps

**Metrics to Track**:
- Training loss vs validation loss
- Empathy score progression
- Therapeutic appropriateness scores
- Crisis response accuracy (if applicable)
- Cultural competency scores
- Bias scores

**Gap Analysis**:
- Compare actual vs target metrics
- Identify specific capability gaps
- Document areas needing improvement

**Success Criteria**:
- ✅ Metrics dashboard generated
- ✅ Gap analysis report created
- ✅ Decision point: Proceed to Phase 3 or optimize current data

**Owner**: Training Team + Data Science Team  
**Timeline**: Days 22-28

---

## Phase 3: Conditional Strategic Expansion (Weeks 5-8)

**Trigger Condition**: Phase 2 metrics show specific gaps that additional data could address

### 3.1 Journal Research Searches (6 Parallel Searches)

**Objective**: Discover academic sources for identified gaps

#### Search 1: Psychotherapy Transcripts
```bash
python -m ai.journal_dataset_research.main \
  --keywords "psychotherapy transcript corpus" "counseling dialogue dataset" "therapeutic conversation" \
  --sources "zenodo" "dryad" "pubmed" "doaj" \
  --session-id "psychotherapy_search_2025"
```

#### Search 2: Clinical Reasoning
```bash
python -m ai.journal_dataset_research.main \
  --keywords "clinical reasoning dataset" "diagnostic reasoning corpus" "medical decision making" \
  --sources "zenodo" "pubmed" "doaj" \
  --session-id "clinical_reasoning_2025"
```

#### Search 3: Emotion Recognition
```bash
python -m ai.journal_dataset_research.main \
  --keywords "emotion recognition dialogue" "empathetic response dataset" "emotional intelligence corpus" \
  --sources "zenodo" "dryad" "pubmed" \
  --session-id "emotion_recognition_2025"
```

#### Search 4: Crisis Intervention
```bash
python -m ai.journal_dataset_research.main \
  --keywords "crisis intervention training" "suicide prevention dialogue" "emergency mental health" \
  --sources "zenodo" "pubmed" "clinicaltrials" \
  --session-id "crisis_intervention_2025"
```

#### Search 5: Trauma-Informed Care
```bash
python -m ai.journal_dataset_research.main \
  --keywords "trauma informed care dialogue" "PTSD therapeutic conversation" "trauma therapy transcript" \
  --sources "zenodo" "dryad" "pubmed" \
  --session-id "trauma_care_2025"
```

#### Search 6: Motivational Interviewing
```bash
python -m ai.journal_dataset_research.main \
  --keywords "motivational interviewing corpus" "MI training dataset" "behavioral change dialogue" \
  --sources "zenodo" "pubmed" "doaj" \
  --session-id "motivational_interviewing_2025"
```

**Success Criteria**:
- ✅ All 6 searches completed
- ✅ Results evaluated and prioritized
- ✅ High-value datasets identified
- ✅ Integration plans created

**Owner**: Research Team  
**Timeline**: Days 29-35

---

### 3.2 HuggingFace Deep Dive

**Objective**: Discover additional high-quality datasets

**Search Categories**:
- Mental health conversation datasets
- Chain-of-thought reasoning (non-domain-specific)
- Instruction-following datasets with empathy
- Multi-turn dialogue datasets
- Emotional support conversation
- Crisis intervention training data
- Therapeutic alliance datasets
- Motivational interviewing corpora
- Cognitive behavioral therapy datasets
- Dialectical behavior therapy examples

**Evaluation Criteria**:
- Therapeutic relevance
- Data structure compatibility
- Integration potential
- Ethical accessibility

**Success Criteria**:
- ✅ HuggingFace search completed
- ✅ Promising datasets identified
- ✅ Evaluation reports generated
- ✅ Integration plans created

**Owner**: Dataset Team  
**Timeline**: Days 30-36

---

### 3.3 Evaluate and Integrate Discoveries

**Objective**: Integrate high-value discoveries into training pipeline

**Process**:
1. Review journal research results
2. Review HuggingFace discoveries
3. Prioritize based on gap analysis
4. Plan integration for high-priority datasets
5. Execute integration
6. Update manifest

**Success Criteria**:
- ✅ Top 5 discoveries integrated
- ✅ Manifest updated
- ✅ Quality validation passed
- ✅ Ready for training

**Owner**: Integration Team  
**Timeline**: Days 37-42

---

### 3.4 Re-train and Validate

**Objective**: Validate that expansion improved metrics

**Process**:
1. Re-run Stage 1 training with expanded data
2. Compare metrics to Phase 2 baseline
3. Validate improvement in identified gaps

**Success Criteria**:
- ✅ Metrics improved in target areas
- ✅ No regression in other areas
- ✅ Expansion validated as beneficial

**Owner**: Training Team  
**Timeline**: Days 43-49

---

## Decision Gates

### Gate 1: After Phase 1
**Question**: Are all 14 dataset families complete and verified?  
**Pass Criteria**: 
- ✅ All missing data downloaded
- ✅ All missing datasets generated
- ✅ Quality optimization complete
- ✅ Final dataset compiled and verified

**If FAIL**: Fix issues before proceeding

---

### Gate 2: After Phase 2
**Question**: Do training metrics meet targets or show specific gaps?  
**Pass Criteria**:
- ✅ Metrics meet targets → Proceed to production training
- ✅ Metrics show specific gaps → Proceed to Phase 3

**If metrics meet targets**: Skip Phase 3, proceed to full training curriculum

**If metrics show gaps**: Proceed to Phase 3 strategic expansion

---

### Gate 3: After Phase 3
**Question**: Did expansion improve metrics in target areas?  
**Pass Criteria**:
- ✅ Metrics improved in identified gaps
- ✅ No regression in other areas

**If PASS**: Proceed to full training curriculum

**If FAIL**: Re-evaluate expansion strategy or optimize current data

---

## Risk Mitigation

### Risk 1: Missing Data Not Available
**Mitigation**: 
- Verify GDrive access before starting
- Have backup sources identified
- Document any unavailable data

### Risk 2: Quality Issues After Download
**Mitigation**:
- Run quality checks immediately after download
- Have cleanup scripts ready
- Document any quality issues

### Risk 3: Training Metrics Don't Improve
**Mitigation**:
- Set clear success criteria
- Have alternative strategies ready
- Document learnings for future

### Risk 4: Expansion Doesn't Help
**Mitigation**:
- Only expand if metrics show specific gaps
- Evaluate discoveries before integration
- Have rollback plan

---

## Success Metrics

### Phase 1 Success
- ✅ All 14 dataset families complete
- ✅ <1% duplication rate
- ✅ All verification gates pass
- ✅ Final dataset compiled and uploaded

### Phase 2 Success
- ✅ Stage 1 training completes
- ✅ Metrics meet or exceed targets OR specific gaps identified
- ✅ Gap analysis report generated

### Phase 3 Success (if triggered)
- ✅ High-value discoveries integrated
- ✅ Metrics improved in target areas
- ✅ No regression in other areas

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 1** | Weeks 1-2 | Complete foundation data, optimize quality, compile final dataset |
| **Phase 2** | Weeks 3-4 | Train Stage 1, analyze metrics, identify gaps |
| **Phase 3** | Weeks 5-8 | Strategic expansion (conditional), integrate discoveries, validate |

**Total Timeline**: 8 weeks (conditional on Phase 3 trigger)

---

## Next Steps

1. **Immediate** (Day 1):
   - Verify GDrive access
   - Set up download infrastructure
   - Assign owners to each task

2. **Week 1**:
   - Download missing GDrive data
   - Start generating missing datasets
   - Begin quality optimization

3. **Week 2**:
   - Complete dataset generation
   - Finish quality optimization
   - Compile final dataset

4. **Week 3-4**:
   - Train Stage 1
   - Analyze metrics
   - Make Phase 3 decision

5. **Week 5-8** (if triggered):
   - Execute strategic expansion
   - Integrate discoveries
   - Validate improvements

---

## References

- **Training Plan**: `ai/training_ready/TRAINING_PLAN.md`
- **Training Curriculum**: `ai/training_ready/docs/TRAINING_CURRICULUM_2025.md`
- **Dataset Expansion Plan**: `ai/training_ready/platforms/ovh/DATASET_EXPANSION_DISCOVERY_PLAN.md`
- **Coverage Report**: `ai/training_ready/data/dataset_coverage_report.json`
- **Deduplication Summary**: `ai/training_ready/data/FULL_DEDUPLICATION_SUMMARY.md`
- **Implementation Summary**: `ai/training_ready/docs/FINAL_DATASET_IMPLEMENTATION_SUMMARY.md`

---

**Document Owner**: Dataset Expansion Decision Team  
**Last Updated**: 2025-12-18  
**Next Review**: After Phase 1 completion
