## Phase 03 — Standardization & Deduplication

Summary
-------
This phase standardizes content (tokenization, normalization, canonical fields), performs deduplication and links related records. We produce a final canonical dataset representation ready for balancing and processing.

Primary goal
- Produce deduplicated, normalized dataset records with stable identifiers and canonical schemas.

Tasks (complete to production scale)
- [ ] Implement canonical tokenization and normalization pipeline (`chatml_tokenizer`, `format_converter`)
- [ ] Build deduplication service (hashing, LSH/tfidf clustering) and validate precision/recall
- [ ] Implement cross-dataset linking for related conversations and metadata
- [ ] Add fast inde ing for dedup checks and rechecks post-modification
- [ ] Provide deterministic stable identifiers for records for traceability
- [ ] Add tests for dedup edge cases and large-batch runs
- [ ] Add reprocessing hooks to re-run dedup after mapping changes
- [ ] Integrate dedup metrics into dashboards (duplicate rates, false-positive rates)
- [ ] Add throttling/limits for reprocessing to avoid runaway compute
- [ ] Document how canonical formats map to downstream models in `docs/pipeline/standardization.md`
- [ ] Provide tooling to inspect clusters and manual overrides for de-duplication
