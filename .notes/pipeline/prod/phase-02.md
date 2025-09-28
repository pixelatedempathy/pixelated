## Phase 02 — Validation & Standardization

Summary
-------
Phase 02 ensures incoming data meets schema, content, and safety expectations and is normalized into canonical internal formats. This covers schema enforcement, sanitization, language/format standardization, and initial quality scoring.

Primary goal
- Provide a validation pipeline that rejects bad data early and normalizes accepted data for downstream stages.

Tasks (complete to production scale)
- [x] Define canonical internal schema(s) and document mapping rules for each source type
- [x] Implement schema validators and integrate with the ingestion queue
- [x] Add sanitizers for user-controlled or free-form text (avoid XSS/HTML injection)
- [x] Implement automated format converters (CSV/JSON/Audio → canonical conversation format)
- [x] Build initial quality scoring component and normalize scores across sources
- [x] Add a quarantine store for records that fail validation and an operator review workflow
- [x] Create unit/integration tests for each validation rule and converter
- [x] Add monitoring/alerts for validation rate and quarantine growth
- [x] Ensure metadata and provenance tracking for each record (timestamps, source id)
- [x] Provide tooling to reprocess quarantined records after fixes
- [x] Update documentation and runbook for validation rules in `docs/ops/validation.md`
- [x] Ensure any third-party parsing libraries are up-to-date and audited

## Summary
Phase 02 is 100% complete. All components are implemented, tested, documented, and integrated into the ingestion pipeline. No further work needed for production readiness.

Suggested fixes:
1. Verify the search content exactly matches the file content (including whitespace and case)
2. Check for correct indentation and line endings
3. Use the read_file tool to verify the file's current contents
4. Consider breaking complex changes into smaller diffs
5. Ensure start_line parameter matches the actual content location
