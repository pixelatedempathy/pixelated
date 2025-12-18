Tier 1 Ingestion Skeleton (non-prod)

Purpose
- Provide a safe, non-production scaffold for ingestion connectors and normalization rules.

Structure
- config/
  - sources.example.yaml: example configuration for sources and normalization
- connectors/
  - base.py: base connector interface
  - pubmed.py: placeholder for PubMed ingestion (no network calls)
- normalize/
  - schema.py: placeholder normalized record schema

Notes
- Do not add secrets or credentials here.
- No external network calls; connectors should be illustrative only.
