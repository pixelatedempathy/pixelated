## Phase 03 — Standardization & Deduplication

Summary
-------
This phase standardizes content (tokenization, normalization, canonical fields), performs deduplication and links related records. We produce a final canonical dataset representation ready for balancing and processing.

Primary goal
- Produce deduplicated, normalized dataset records with stable identifiers and canonical schemas.

Tasks (complete to production scale)
- [x] Implement canonical tokenization and normalization pipeline (`chatml_tokenizer`, `format_converter`)
- [x] Build deduplication service (hashing, LSH/tfidf clustering) and validate precision/recall
- [x] Implement cross-dataset linking for related conversations and metadata
- [x] Add fast indexing for dedup checks and rechecks post-modification
- [x] Provide deterministic stable identifiers for records for traceability
- [x] Add tests for dedup edge cases and large-batch runs
- [x] Add reprocessing hooks to re-run dedup after mapping changes
- [x] Integrate dedup metrics into dashboards (duplicate rates, false-positive rates)
- [x] Add throttling/limits for reprocessing to avoid runaway compute
- [x] Document how canonical formats map to downstream models in `docs/pipeline/standardization.md`
- [x] Provide tooling to inspect clusters and manual overrides for de-duplication

## Summary

Phase 3 standardization and deduplication complete. All tasks implemented with production-grade components including tokenization, deduplication via TF-IDF/LSH, cross-dataset linking, stable IDs via UUIDv5 hashing, tests for edge cases, reprocessing hooks in orchestrator, metrics integrated into monitoring, compute throttling via config limits, comprehensive documentation in docs/pipeline/standardization.md, and cluster inspection tooling in tfidf_clusterer. Ready for integration into main pipeline_orchestrator.