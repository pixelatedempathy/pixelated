# Phase 2: Domain Model — Wayfarer-2-12B SFT Pipeline

## 1. Core Entities

### 1.1 ModelArtifact
- **Attributes:**  
  - `model_path: str`  
  - `format: str`  
  - `framework: str`  
  - `device: str`  
  - `config: dict`
- **Relationships:**  
  - Used by SFTPipeline for loading and training

### 1.2 DatasetSource
- **Attributes:**  
  - `name: str`  
  - `path_or_url: str`  
  - `schema: dict`  
  - `source_type: Literal["local", "remote"]`
- **Relationships:**  
  - Ingested by DataIngestionModule

### 1.3 ChatSample
- **Attributes:**  
  - `conversation_id: str`  
  - `messages: List[ChatMessage]`  
  - `metadata: dict`
- **Relationships:**  
  - Produced by DataCleaningModule, consumed by ChatMLConverter

### 1.4 ChatMessage
- **Attributes:**  
  - `role: Literal["user", "assistant", "system"]`  
  - `content: str`  
  - `timestamp: Optional[datetime]`  
  - `metadata: dict`

### 1.5 TokenizedSample
- **Attributes:**  
  - `input_ids: List[int]`  
  - `attention_mask: List[int]`  
  - `metadata: dict`
- **Relationships:**  
  - Output of TokenizationModule

### 1.6 PrivacyEvent
- **Attributes:**  
  - `event_type: Literal["PII_DETECTED", "FHE_ENCRYPTED", "AUDIT_LOG"]`  
  - `details: dict`  
  - `timestamp: datetime`
- **Relationships:**  
  - Emitted by PrivacyMonitor

### 1.7 BiasEvent
- **Attributes:**  
  - `event_type: Literal["BIAS_DETECTED", "BIAS_OK"]`  
  - `details: dict`  
  - `score: float`  
  - `threshold: float`  
  - `timestamp: datetime`
- **Relationships:**  
  - Emitted by BiasMonitor

### 1.8 PipelineConfig
- **Attributes:**  
  - `env_vars: dict`  
  - `secure_config: dict`  
  - `resource_limits: dict`  
  - `logging_config: dict`
- **Relationships:**  
  - Used by all modules for configuration

## 2. Key Relationships

- **SFTPipeline**  
  - Orchestrates: ModelArtifact, DatasetSource, ChatSample, TokenizedSample, PrivacyEvent, BiasEvent, PipelineConfig

- **DataIngestionModule**  
  - Loads DatasetSource → List[ChatSample]

- **DataCleaningModule**  
  - Cleans List[ChatSample] → List[ChatSample]

- **DeduplicationModule**  
  - Deduplicates List[ChatSample] → List[ChatSample]

- **ChatMLConverter**  
  - Converts List[ChatSample] → List[ChatMLString]

- **TokenizationModule**  
  - Tokenizes List[ChatMLString] → List[TokenizedSample]

- **PrivacyMonitor**  
  - Monitors all data flows, emits PrivacyEvent

- **BiasMonitor**  
  - Monitors all data flows, emits BiasEvent

## 3. Data Flow Overview

1. **Ingestion:**  
   DatasetSource → DataIngestionModule → List[ChatSample]
2. **Cleaning & Deduplication:**  
   List[ChatSample] → DataCleaningModule → DeduplicationModule → List[ChatSample]
3. **ChatML Conversion:**  
   List[ChatSample] → ChatMLConverter → List[ChatMLString]
4. **Tokenization:**  
   List[ChatMLString] → TokenizationModule → List[TokenizedSample]
5. **Monitoring:**  
   All stages → PrivacyMonitor, BiasMonitor → [PrivacyEvent, BiasEvent]
6. **Output:**  
   List[TokenizedSample] → SFT-ready dataset

## 4. Validation & Error Handling

- All entities validated on creation (type, schema, required fields)
- All module boundaries enforce input/output type checks
- Privacy/Bias events logged and trigger pipeline halt on violation

## 5. Glossary

- **ChatMLString:** String in ChatML format, optimized for Wayfarer-2-12B
- **SFT:** Supervised Fine-Tuning
- **Unsloth:** Efficient LLM fine-tuning library
- **H100:** NVIDIA Hopper GPU (Lightning.ai Studio)

---
<!-- TEST: All entities, relationships, and flows above must be reflected in pseudocode modules and TDD anchors in subsequent phases -->