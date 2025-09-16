# Wayfarer-2-12B Fine-Tuning Pipeline Architecture

## Overview

A modular Python pipeline for privacy-preserving, bias-monitored supervised fine-tuning of Wayfarer-2-12B (IQ4_XS.gguf) using Unsloth and Lightning.ai Studio (H100 GPU). The system ingests, cleans, deduplicates, merges, and converts multiple mental health datasets to ChatML, then tokenizes and prepares data for training, with integrated bias and privacy monitoring.

---

## C4 Container Diagram

```mermaid
flowchart TD
    subgraph DataSources
        DS1["ai/wendy/datasets-wendy"]
        DS2["Amod/mental_health_counseling_conversations"]
        DS3["mpingale/mental-health-chat-dataset"]
        DS4["heliosbrahma/mental_health_chatbot_dataset"]
    end

    subgraph Pipeline
        A[DataIngestionService]
        B[PreprocessingService]
        C[DeduplicationService]
        D[ChatMLConversionService]
        E[TokenizationService]
        F[TrainingOrchestrator]
    end

    subgraph Monitoring
        M1[BiasDetectionEngine]
        M2[PrivacyComplianceMonitor]
        M3[AuditLogger]
    end

    subgraph Model
        M[Wayfarer-2-12B (Unsloth Loader)]
    end

    DS1 --> A
    DS2 --> A
    DS3 --> A
    DS4 --> A
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> M

    B --calls--> M1
    D --calls--> M1
    E --calls--> M1
    B --calls--> M2
    D --calls--> M2
    E --calls--> M2
    F --logs--> M3
    M1 --logs--> M3
    M2 --logs--> M3
```

**Legend:**  
- Rectangles: Services/Modules  
- Ovals: Data sources/model  
- Arrows: Data flow  
- Dashed arrows: Monitoring calls/logs

---

## Module Boundaries & Responsibilities

| Module                   | Responsibility                                                                 | Extensibility Points                | Integration                |
|--------------------------|-------------------------------------------------------------------------------|-------------------------------------|----------------------------|
| DataIngestionService     | Load datasets from local/remote sources, validate schema                      | Add new dataset connectors          | Monitoring, Preprocessing  |
| PreprocessingService     | Clean, normalize, anonymize, validate data                                    | Plug-in custom cleaning functions   | Bias/Privacy Monitoring    |
| DeduplicationService     | Remove duplicates, merge datasets, resolve conflicts                          | Custom deduplication strategies     | Audit Logging              |
| ChatMLConversionService  | Convert all data to ChatML, optimize for Wayfarer-2-12B                      | Support new formats, templates      | Bias/Privacy Monitoring    |
| TokenizationService      | Tokenize ChatML data for Unsloth/Lightning.ai, batch for H100                 | Swap tokenizers, batch configs      | Bias/Privacy Monitoring    |
| TrainingOrchestrator     | Manage Unsloth model loading, Lightning.ai job submission, resource config    | Add training backends, hyperparams  | Audit Logging, Model       |
| BiasDetectionEngine      | Real-time bias analysis (SHAP, LIME, AIF360, custom)                          | New algorithms, thresholds          | All pipeline stages        |
| PrivacyComplianceMonitor | Enforce HIPAA++, FHE, zero-knowledge checks, PII removal                      | New privacy rules, FHE backends     | All pipeline stages        |
| AuditLogger              | Log all actions, compliance events, bias/privacy metrics                      | Log sinks, alerting integrations    | All modules                |

---

## Data Flow & Integration Points

1. **Ingestion:**  
   - Loads all datasets, validates schema, logs source metadata.
   - Extensible for new sources (local, S3, HuggingFace).

2. **Preprocessing:**  
   - Cleans, anonymizes, normalizes data.
   - Calls BiasDetectionEngine and PrivacyComplianceMonitor for every batch.
   - Extensible for custom cleaning/anonymization.

3. **Deduplication/Merging:**  
   - Deduplicates and merges datasets, resolves schema conflicts.
   - Logs all merge decisions for audit.

4. **ChatML Conversion:**  
   - Converts merged data to ChatML, optimized for Wayfarer-2-12B.
   - Extensible for new prompt templates, role mappings.
   - Bias and privacy checks on output.

5. **Tokenization:**  
   - Tokenizes ChatML for Unsloth, batches for H100.
   - Extensible for tokenizer swaps, batch configs.
   - Bias/privacy checks on tokenized data.

6. **Training Orchestration:**  
   - Loads model via Unsloth, submits job to Lightning.ai Studio.
   - Configures for H100, mixed precision, gradient checkpointing.
   - Logs all training events, integrates with monitoring.

7. **Monitoring:**  
   - BiasDetectionEngine and PrivacyComplianceMonitor are called at every stage.
   - AuditLogger records all compliance, bias, and privacy events.

---

## Rationale for Architectural Decisions

- **Modular Boundaries:**  
  Each module has a single responsibility, enabling independent development, testing, and extension. This supports rapid iteration and compliance with privacy/bias requirements.

- **Extensibility:**  
  All modules expose clear interfaces for plugging in new datasets, cleaning functions, conversion templates, tokenizers, and monitoring algorithms.

- **Monitoring Integration:**  
  Bias and privacy monitoring are cross-cutting concerns, invoked at every stage. This ensures compliance and real-time feedback, with audit trails for all actions.

- **Performance Optimization:**  
  Data is batched and tokenized for H100, with mixed precision and gradient checkpointing. All modules are designed for parallelism and efficient memory usage.

- **Security & Privacy:**  
  PrivacyComplianceMonitor enforces HIPAA++, FHE, and zero-knowledge principles. All PII is removed before training, and audit logs are maintained for every operation.

- **Deployment & Scalability:**  
  Training is orchestrated for Lightning.ai Studio, but the pipeline is backend-agnostic and can be extended to other platforms. All modules are containerizable for reproducibility.

---

## Extensibility Points

- **Datasets:**  
  Add new connectors in DataIngestionService.

- **Cleaning/Anonymization:**  
  Plug in custom functions in PreprocessingService.

- **Deduplication:**  
  Swap strategies in DeduplicationService.

- **ChatML Templates:**  
  Add new templates in ChatMLConversionService.

- **Tokenization:**  
  Swap tokenizers/batch configs in TokenizationService.

- **Monitoring:**  
  Add new bias/privacy algorithms in BiasDetectionEngine/PrivacyComplianceMonitor.

- **Training Backends:**  
  Extend TrainingOrchestrator for new platforms.

---

## Compliance & Monitoring

- **Bias Detection:**  
  SHAP, LIME, AIF360, custom rules at every stage.

- **Privacy:**  
  FHE, zero-knowledge, PII removal, compliance checks.

- **Audit Logging:**  
  All actions, decisions, and compliance events are logged for traceability.

---

## Deployment View

- **Lightning.ai Studio (Ubuntu, H100 GPU):**  
  Training jobs are submitted via TrainingOrchestrator, with resource configs for H100, mixed precision, and checkpointing.

- **Containerization:**  
  All modules are containerizable for reproducibility and scalability.

---

## Glossary

- **ChatML:**  
  Standardized conversational data format for LLMs.

- **Unsloth:**  
  Efficient LLM training library supporting GGUF models.

- **Wayfarer-2-12B:**  
  Target LLM model for fine-tuning.

- **BiasDetectionEngine:**  
  Service for real-time bias analysis.

- **PrivacyComplianceMonitor:**  
  Service for privacy and compliance enforcement.

---
