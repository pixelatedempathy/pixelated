# Wayfarer-2-12B Supervised Fine-Tuning Pipeline Architecture

## 1. Directory & File Structure

```
ai/
├── dataset_pipeline/
│   ├── ingestion.py           # Data source connectors, schema validation
│   ├── cleaning.py            # Data cleaning, normalization, PII scrubbing
│   ├── deduplication.py       # Deduplication logic, hash-based, semantic
│   ├── chatml_converter.py    # Converts raw data to ChatML format
│   ├── tokenization.py        # Tokenizer wrapper, supports Unsloth
│   ├── __init__.py
│
├── pipelines/
│   ├── wayfarer_supervised.py # Orchestrates the full pipeline (entrypoint)
│   ├── unsloth_integration.py # Unsloth-specific hooks, adapters
│   ├── lightning_export.py    # Export to Lightning.ai Studio format
│   ├── __init__.py
│
├── models/
│   ├── wayfarer_2_12b.py      # Model config, loading, saving
│   ├── registry.py            # Model registry for extensibility
│   ├── __init__.py
│
├── safety/
│   ├── privacy_hooks.py       # FHE, zero-knowledge, PII detection
│   ├── bias_monitor.py        # Real-time bias detection, SHAP/LIME
│   ├── audit_trail.py         # Logging, compliance, traceability
│   ├── __init__.py
│
├── monitoring/
│   ├── metrics.py             # Training/inference metrics, latency, throughput
│   ├── compliance.py          # HIPAA++/SOC2 checks, reporting
│   ├── __init__.py
│
├── api/
│   ├── service.py             # Flask/FastAPI endpoints for orchestration
│   ├── __init__.py
│
├── tests/
│   ├── test_ingestion.py
│   ├── test_cleaning.py
│   ├── test_deduplication.py
│   ├── test_chatml_converter.py
│   ├── test_tokenization.py
│   ├── test_unsloth_integration.py
│   ├── test_privacy_hooks.py
│   ├── test_bias_monitor.py
│   ├── test_audit_trail.py
│   ├── test_metrics.py
│   ├── test_compliance.py
│   ├── test_lightning_export.py
│   ├── __init__.py
```

---

## 2. Service Boundaries & Responsibilities

| Module                | Responsibility & Boundaries                                                                 |
|-----------------------|--------------------------------------------------------------------------------------------|
| dataset_pipeline/ingestion.py      | Connects to data sources, validates schema, triggers privacy hooks on ingest.         |
| dataset_pipeline/cleaning.py       | Cleans, normalizes, and scrubs PII; calls privacy_hooks for FHE/zero-knowledge.      |
| dataset_pipeline/deduplication.py  | Deduplicates data, logs actions to audit_trail.                                      |
| dataset_pipeline/chatml_converter.py| Converts cleaned data to ChatML, logs conversion for traceability.                   |
| dataset_pipeline/tokenization.py   | Tokenizes ChatML, supports Unsloth, logs tokenization stats.                         |
| pipelines/wayfarer_supervised.py   | Orchestrates pipeline, enforces module boundaries, triggers audit/compliance checks.  |
| pipelines/unsloth_integration.py   | Integrates Unsloth, ensures privacy/bias hooks are called pre/post training.          |
| pipelines/lightning_export.py      | Exports model/artifacts to Lightning.ai Studio, logs export for audit.                |
| models/wayfarer_2_12b.py           | Loads/saves model, exposes config, supports registry for new models.                  |
| models/registry.py                 | Registry for extensibility, supports new models/datasets.                             |
| safety/privacy_hooks.py            | FHE, zero-knowledge, PII detection, hooks for all pipeline stages.                    |
| safety/bias_monitor.py             | Real-time bias detection, hooks for data/model, logs to audit_trail.                  |
| safety/audit_trail.py              | Centralized logging, compliance, traceability, no secrets.                            |
| monitoring/metrics.py              | Tracks training/inference metrics, latency, throughput.                               |
| monitoring/compliance.py           | HIPAA++/SOC2 checks, periodic reporting, extensible for new standards.                |
| api/service.py                     | Orchestrates pipeline via API, exposes status, metrics, audit logs.                   |

---

## 3. Integration Points for Privacy/Bias Hooks & Audit Trails

- **Privacy/Bias Hooks**:  
  - Called at every data boundary (ingestion, cleaning, deduplication, conversion, tokenization, training, export).
  - Implemented as decorators/context managers in `safety/privacy_hooks.py` and `safety/bias_monitor.py`.
  - Example:  
    ```python
    from ai.safety.privacy_hooks import privacy_guard
    @privacy_guard
    def ingest_data(...): ...
    ```
- **Audit Trails**:  
  - All modules log actions/events to `safety/audit_trail.py`.
  - Audit logs include timestamp, action, module, compliance status, no secrets/PII.
  - Example:  
    ```python
    from ai.safety.audit_trail import log_event
    log_event(module="deduplication", action="deduplicate", details={...})
    ```

---

## 4. Extensibility

- **New Datasets**:  
  - Add connectors in `dataset_pipeline/ingestion.py`, register schemas in `models/registry.py`.
- **New Models**:  
  - Add model config in `models/`, register in `models/registry.py`.
- **New Compliance Modules**:  
  - Add checks in `monitoring/compliance.py`, update hooks in `safety/privacy_hooks.py`.
- **All modules <500 lines**:  
  - Enforced by splitting logic, using registry/adapters, and strict boundaries.

---

## 5. System Diagram (ASCII)

```
+-------------------+      +-------------------+      +-------------------+
| Data Ingestion    | ---> | Data Cleaning     | ---> | Deduplication     |
| (privacy hooks)   |      | (privacy hooks)   |      | (audit trail)     |
+-------------------+      +-------------------+      +-------------------+
        |                        |                        |
        v                        v                        v
+-------------------+      +-------------------+      +-------------------+
| ChatML Conversion | ---> | Tokenization      | ---> | Unsloth Integration|
| (audit trail)     |      | (privacy/bias)    |      | (privacy/bias)    |
+-------------------+      +-------------------+      +-------------------+
        |                        |                        |
        v                        v                        v
+-------------------+      +-------------------+      +-------------------+
| Model Registry    | ---> | Training Pipeline | ---> | Lightning Export  |
| (extensible)      |      | (metrics, audit)  |      | (audit trail)     |
+-------------------+      +-------------------+      +-------------------+
        |                        |                        |
        v                        v                        v
+-------------------+      +-------------------+      +-------------------+
| Privacy Hooks     |<-----| Bias Monitor      |<-----| Audit Trail       |
| (cross-cutting)   |      | (cross-cutting)   |      | (centralized)     |
+-------------------+      +-------------------+      +-------------------+
        |                        |                        |
        v                        v                        v
+-------------------+      +-------------------+      +-------------------+
| Monitoring        |<-----| Compliance        |<-----| API Service       |
| (metrics)         |      | (HIPAA++, SOC2)   |      | (orchestration)   |
+-------------------+      +-------------------+      +-------------------+
```

Legend:  
→ = Data/Control flow  
(cross-cutting) = hooks called at multiple stages  
(audit trail) = logs to centralized audit module

---

## 6. Interface Contracts (Pythonic, Pydantic for schemas)

- **Data Ingestion**  
  ```python
  class DataSourceConfig(BaseModel):
      name: str
      uri: str
      schema: dict
      privacy_level: str

  def ingest_data(config: DataSourceConfig) -> pd.DataFrame
  ```

- **Cleaning**  
  ```python
  def clean_data(df: pd.DataFrame) -> pd.DataFrame
  ```

- **Deduplication**  
  ```python
  def deduplicate_data(df: pd.DataFrame) -> pd.DataFrame
  ```

- **ChatML Conversion**  
  ```python
  def convert_to_chatml(df: pd.DataFrame) -> List[dict]
  ```

- **Tokenization**  
  ```python
  def tokenize_chatml(chatml: List[dict], tokenizer: Any) -> List[List[int]]
  ```

- **Unsloth Integration**  
  ```python
  def run_unsloth_training(tokenized_data: List[List[int]], model_config: dict) -> Any
  ```

- **Privacy/Bias Hooks**  
  ```python
  def privacy_guard(func: Callable) -> Callable
  def bias_monitor(func: Callable) -> Callable
  ```

- **Audit Trail**  
  ```python
  def log_event(module: str, action: str, details: dict) -> None
  ```

- **Lightning Export**  
  ```python
  def export_to_lightning(model: Any, export_config: dict) -> None
  ```

- **Monitoring/Compliance**  
  ```python
  def record_metrics(metrics: dict) -> None
  def run_compliance_checks(report: dict) -> bool
  ```

---

## 7. Quality, Security, and Compliance

- All modules <500 lines, no hardcoded secrets, no PII in logs.
- Privacy/bias hooks and audit trails are cross-cutting, called at every boundary.
- HIPAA++/zero-knowledge/bias compliance is built-in and extensible.
