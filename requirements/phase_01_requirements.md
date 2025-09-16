# Phase 1: Requirements Specification — Wayfarer-2-12B SFT Pipeline

## 1. Project Background & Goals

- **Goal:** Build a modular, testable Python pipeline for supervised fine-tuning (SFT) of Wayfarer-2-12B on Lightning.ai Studio (H100 GPU).
- **Target Model:** ai/wendy/LatitudeGames_Wayfarer-2-12B-IQ4_XS.gguf, loaded via Unsloth for SFT.
- **Data Sources:**  
  - ai/wendy/datasets-wendy  
  - Amod/mental_health_counseling_conversations  
  - mpingale/mental-health-chat-dataset  
  - heliosbrahma/mental_health_chatbot_dataset

## 2. Functional Requirements

1. **Model Loading**
   - Load Wayfarer-2-12B GGUF model into Unsloth for SFT.
   - Validate model file path and format.
   - Support Lightning.ai Studio H100 environment.

2. **Data Ingestion**
   - Ingest all specified datasets (local and remote).
   - Validate dataset integrity and schema.
   - Handle missing, malformed, or duplicate data gracefully.

3. **Data Cleaning & Deduplication**
   - Remove duplicates across and within datasets.
   - Clean data (strip PII, normalize text, remove invalid samples).
   - Log cleaning actions for audit trail.

4. **Data Merging**
   - Merge all datasets into a unified format.
   - Ensure consistent schema and metadata.
   - Validate merged dataset for completeness.

5. **ChatML Conversion**
   - Convert all data to ChatML format optimized for Wayfarer-2-12B.
   - Validate conversion correctness and compatibility.

6. **Tokenization**
   - Tokenize ChatML data for SFT.
   - Support batch tokenization and error handling.
   - Output tokenized dataset ready for Unsloth.

7. **Privacy & Bias Monitoring**
   - Integrate privacy hooks (FHE, PII detection, audit logging).
   - Integrate bias monitoring (real-time, configurable thresholds).
   - Log all privacy/bias events for compliance.

8. **Configuration Management**
   - All configs via environment variables or secure config files.
   - No hardcoded secrets or env vars in code.

9. **Lightning.ai Studio Compatibility**
   - Ensure pipeline runs on H100 GPU.
   - Validate resource allocation and runtime environment.

10. **Testing & Validation**
    - Modular unit and integration tests for all pipeline stages.
    - TDD anchors for all critical logic and edge cases.
    - Performance tests for <50ms response time in critical sections.

## 3. Non-Functional Requirements

- **Modularity:** Each module <500 lines, single responsibility.
- **Extensibility:** Easy to add new datasets, models, or hooks.
- **Performance:** Optimize for H100, batch processing, memory efficiency.
- **Security:** HIPAA++ and zero-knowledge compliance; FHE for sensitive data.
- **Auditability:** Log all data transformations, privacy/bias events.
- **Documentation:** Inline docstrings, external docs for all modules.
- **Testability:** 80%+ coverage, TDD anchors, mockable interfaces.

## 4. Edge Cases

- Corrupt or missing dataset files.
- Inconsistent schemas between datasets.
- Model file not found or incompatible format.
- Privacy/bias hooks fail or return unexpected results.
- Tokenization errors (e.g., out-of-vocab, malformed ChatML).
- Resource exhaustion on H100 (memory, disk, GPU).
- Invalid or missing configuration.

## 5. Constraints

- No hardcoded secrets, env vars, or config values.
- All user inputs validated before processing.
- Each file <500 lines, modular boundaries enforced.
- Must run on Lightning.ai Studio H100.
- All code must be testable and documented.

## 6. Acceptance Criteria

- Pipeline runs end-to-end on Lightning.ai Studio (H100).
- All data deduplicated, cleaned, and in ChatML format.
- Tokenization and Unsloth integration work out of the box.
- Privacy/bias monitoring hooks present and testable.
- No hardcoded secrets; all configs via env or secure config.
- Modular, testable, documented codebase.

## 7. Out of Scope

- Model training logic (beyond SFT data prep and Unsloth integration).
- UI/UX for pipeline operation.
- Non-H100 environments.

## 8. Stakeholders

- ML engineers (pipeline devs)
- Data privacy/compliance officers
- Lightning.ai Studio operators
- Clinical/therapeutic domain experts

---
<!-- TEST: All requirements above must be covered by pseudocode modules and TDD anchors in subsequent phases -->