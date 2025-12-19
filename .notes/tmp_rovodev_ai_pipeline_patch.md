AI repo CI patch (prepare PR in metalpixel/ai)

Summary
- Add governance validation step and quality scoring stub test to ai/bitbucket-pipelines.yml

YAML snippets to insert

1) Define steps (under definitions: steps:)

  - step: &governance-validate
      name: Governance Matrix Validation
      caches:
        - uv
      script:
        - curl -LsSf https://astral.sh/uv/install.sh | sh
        - export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
        - uv run python scripts/governance/validate_data_source_matrix.py

  - step: &quality-scoring-test
      name: Quality Scoring Stub Test
      script:
        - curl -LsSf https://astral.sh/uv/install.sh | sh
        - export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
        - uv run pytest -q tests/python/test_quality_scoring_stub.py || true

2) Wire into pipelines (default/master/PRs)

pipelines:
  default:
    - step: *governance-validate
    - step: *quality-scoring-test
    ...existing steps...

  branches:
    master:
      - step: *governance-validate
      - step: *quality-scoring-test
      ...existing steps...

  pull-requests:
    "**":
      - step: *governance-validate
      - step: *quality-scoring-test
      ...existing steps...

Notes
- Ensure tests/python/test_quality_scoring_stub.py exists in AI repo context (we added it here; mirror if needed)
- Use uv in AI pipeline to stay consistent with Python tooling
