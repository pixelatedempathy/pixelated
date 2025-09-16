# Domain Model: LatitudeGames Wayfarer-2-12B Training Pipeline

## Core Entities

### 1. ModelArtifact
- **Attributes:**
  - `path`: str (e.g., ai/wendy/LatitudeGames_Wayfarer-2-12B-IQ4_XS.gguf)
  - `framework`: str (e.g., "Unsloth")
  - `config`: dict (model config, device, precision)
- **Relationships:**
  - Used by TrainingSession

### 2. DatasetSource
- **Attributes:**
  - `name`: str
  - `path`: str
  - `format`: str (json, csv, txt, etc)
  - `license`: str
- **Relationships:**
  - Ingested by DataIngestionPipeline

### 3. ChatSample
- **Attributes:**
  - `conversation_id`: str
  - `turns`: List[ChatTurn]
  - `source`: str
  - `metadata`: dict (demographics, tags, etc)
- **Relationships:**
  - Aggregated in ChatDataset

### 4. ChatTurn
- **Attributes:**
  - `role`: str (system, user, assistant)
  - `content`: str
  - `timestamp`: Optional[datetime]
- **Relationships:**
  - Part of ChatSample

### 5. ChatDataset
- **Attributes:**
  - `samples`: List[ChatSample]
  - `format`: str (raw, ChatML, tokenized)
  - `stats`: dict (counts, deduplication, bias metrics)
- **Relationships:**
  - Produced by DataCleaningPipeline, consumed by TokenizationPipeline

### 6. BiasReport
- **Attributes:**
  - `sample_id`: str
  - `bias_scores`: dict (demographic: float)
  - `compliance_status`: bool
  - `details`: dict
- **Relationships:**
  - Linked to ChatSample, logged in AuditTrail

### 7. AuditTrail
- **Attributes:**
  - `event_type`: str (ingest, clean, dedup, convert, tokenize, train)
  - `timestamp`: datetime
  - `details`: dict
- **Relationships:**
  - Linked to all pipeline steps

### 8. TrainingConfig
- **Attributes:**
  - `batch_size`: int
  - `precision`: str (fp16, bf16)
  - `gradient_checkpointing`: bool
  - `privacy_mode`: str (FHE, standard)
  - `platform`: str (Lightning.ai Studio)
  - `device`: str (H100)
- **Relationships:**
  - Used by TrainingSession

### 9. TrainingSession
- **Attributes:**
  - `model`: ModelArtifact
  - `dataset`: ChatDataset
  - `config`: TrainingConfig
  - `status`: str (pending, running, completed, failed)
  - `logs`: List[AuditTrail]
- **Relationships:**
  - Orchestrates the full pipeline

## Relationships Diagram (Textual)

- TrainingSession
  - uses ModelArtifact
  - uses ChatDataset (produced from DatasetSource via DataIngestionPipeline → DataCleaningPipeline → ChatMLConversion → TokenizationPipeline)
  - uses TrainingConfig
  - logs AuditTrail
- ChatDataset
  - contains ChatSample(s)
  - each ChatSample has ChatTurn(s)
  - each ChatSample may have BiasReport(s)

## Domain Rules

- All data flows must enforce privacy (no PII, FHE for sensitive data).
- BiasReport must be generated for each sample pre- and post-conversion.
- AuditTrail must log every transformation for compliance.
- TrainingConfig must be validated for hardware/platform compatibility.

## Glossary

- **ChatML**: Structured format for multi-turn chat, with explicit role tags.
- **FHE**: Fully Homomorphic Encryption, for zero-knowledge privacy.
- **Unsloth**: Framework for efficient LLM fine-tuning.
- **Lightning.ai Studio**: Cloud platform for distributed model training.
