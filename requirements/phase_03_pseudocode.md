# Phase 3: Modular Pseudocode with TDD Anchors — Wayfarer-2-12B SFT Pipeline

---

## 1. SFTPipeline Orchestrator

```python
class SFTPipeline:
    def __init__(self, config: PipelineConfig):
        self.config = config
        self.privacy_monitor = PrivacyMonitor(config)
        self.bias_monitor = BiasMonitor(config)
        self.model = None

    def run(self):
        # TEST: Pipeline runs end-to-end with valid config and all modules present
        datasets = DataIngestionModule(self.config, self.privacy_monitor).load_all()
        cleaned = DataCleaningModule(self.config, self.privacy_monitor).clean(datasets)
        deduped = DeduplicationModule(self.config).deduplicate(cleaned)
        chatml = ChatMLConverter(self.config).convert(deduped)
        tokenized = TokenizationModule(self.config).tokenize(chatml)
        self.model = ModelLoader(self.config).load()
        # TEST: Privacy and bias events are emitted and logged at each stage
        # TEST: Pipeline halts on privacy/bias violation
        return tokenized
```

---

## 2. Data Ingestion Module

```python
class DataIngestionModule:
    def __init__(self, config: PipelineConfig, privacy_monitor: PrivacyMonitor):
        self.sources = config.dataset_sources
        self.privacy_monitor = privacy_monitor

    def load_all(self) -> List[ChatSample]:
        samples = []
        for source in self.sources:
            # TEST: Loads local and remote datasets, validates schema
            data = self._load_source(source)
            self.privacy_monitor.check_ingest(data)
            samples.extend(data)
        # TEST: Handles missing/corrupt files gracefully
        return samples

    def _load_source(self, source: DatasetSource) -> List[ChatSample]:
        # TEST: Validates source type, schema, and logs errors
        pass
```

---

## 3. Data Cleaning Module

```python
class DataCleaningModule:
    def __init__(self, config: PipelineConfig, privacy_monitor: PrivacyMonitor):
        self.config = config
        self.privacy_monitor = privacy_monitor

    def clean(self, samples: List[ChatSample]) -> List[ChatSample]:
        cleaned = []
        for sample in samples:
            # TEST: Removes PII, normalizes text, validates structure
            if not self._is_valid(sample):
                continue
            cleaned_sample = self._clean_sample(sample)
            self.privacy_monitor.check_clean(cleaned_sample)
            cleaned.append(cleaned_sample)
        # TEST: Logs cleaning actions for audit
        return cleaned

    def _is_valid(self, sample: ChatSample) -> bool:
        # TEST: Detects and skips invalid samples
        pass

    def _clean_sample(self, sample: ChatSample) -> ChatSample:
        # TEST: PII removal, text normalization
        pass
```

---

## 4. Deduplication Module

```python
class DeduplicationModule:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def deduplicate(self, samples: List[ChatSample]) -> List[ChatSample]:
        # TEST: Removes duplicates across/within datasets
        # TEST: Handles edge cases (near-duplicates, hash collisions)
        unique = self._dedup_logic(samples)
        return unique

    def _dedup_logic(self, samples: List[ChatSample]) -> List[ChatSample]:
        pass
```

---

## 5. ChatML Converter

```python
class ChatMLConverter:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def convert(self, samples: List[ChatSample]) -> List[str]:
        chatml_strings = []
        for sample in samples:
            # TEST: Converts to valid ChatML, optimized for Wayfarer-2-12B
            chatml = self._to_chatml(sample)
            chatml_strings.append(chatml)
        # TEST: Handles conversion errors, logs issues
        return chatml_strings

    def _to_chatml(self, sample: ChatSample) -> str:
        pass
```

---

## 6. Tokenization Module

```python
class TokenizationModule:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def tokenize(self, chatml_strings: List[str]) -> List[TokenizedSample]:
        tokenized = []
        for chatml in chatml_strings:
            # TEST: Tokenizes with Unsloth tokenizer, handles OOV/malformed
            tokens = self._tokenize_chatml(chatml)
            tokenized.append(tokens)
        # TEST: Batch tokenization, error handling, output format
        return tokenized

    def _tokenize_chatml(self, chatml: str) -> TokenizedSample:
        pass
```

---

## 7. Model Loader

```python
class ModelLoader:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def load(self) -> ModelArtifact:
        # TEST: Loads GGUF model via Unsloth, validates path/format
        # TEST: Fails gracefully if model missing/incompatible
        pass
```

---

## 8. Privacy Monitor

```python
class PrivacyMonitor:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def check_ingest(self, data: Any):
        # TEST: Detects PII, emits PrivacyEvent, logs audit
        pass

    def check_clean(self, sample: ChatSample):
        # TEST: Verifies PII removal, logs event
        pass
```

---

## 9. Bias Monitor

```python
class BiasMonitor:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def check(self, data: Any):
        # TEST: Runs bias detection, emits BiasEvent, halts on violation
        pass
```

---

## 10. Error Handling & Validation

- All modules validate inputs/outputs, raise descriptive exceptions on error
- Pipeline halts on privacy/bias/compliance violation
- All user/config inputs validated at entry

---

<!-- TEST: All modules above must be covered by unit/integration tests, with TDD anchors for happy path, edge cases, and error conditions -->