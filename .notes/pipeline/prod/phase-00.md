## Phase 00 — Product Consolidation & Release Readiness

Date: 2025-09-28

Summary
-------
This phase is about bringing all pieces together into a cohesive, deployable product. It covers repository reorganization, consolidating scattered docs, wiring frontend → API → MCP → pipeline, creating a minimal production deployment (docker-compose/k8s manifests), centralizing configuration and secrets guidance, and removing development leftovers and demo-only code paths. The goal: a single, repeatable developer and CI workflow that produces a production artifact and a validated smoke-test.

Success criteria
- A documented, repeatable local/dev deployment that runs the MCP and the dataset pipeline and passes a smoke-test.
- Clear locations for pipeline entry points (web API routes, CLI, MCP) and README onboarding.
- No outstanding demo-only API endpoints being brandished as production.

Top-level tasks (high-level, actionable)
- [ ] Create `docker/compose.prod.yml` (or `docker-compose.prod.yml`) that composes MCP + pipeline + minimal DB and Redis for local staging
- [ ] Add `deploy/` or `infra/` manifests for a minimal k8s deployment and a README describing deployment strategy
- [ ] Implement server-side API adapters (e.g., `src/pages/api/pipelines/*`) that proxy to MCP or directly call orchestrators in dev mode
- [ ] Add a consolidated CLI in `scripts/pipeline-cli.py` (start/status/run-task/export) and document installation
- [ ] Consolidate docs: create a single `docs/pipeline/README.md` summarizing phases and links to each phase doc
- [ ] Move or rename demo-only client-side stubs to clearly-labeled demo locations; add TODOs and remove misleading comments
- [ ] Add a CI smoke test job (using Docker Compose) that verifies full pipeline run with a mock agent
- [ ] Centralize configuration and secret guidance: `.env.example` and `docs/ops/secrets.md` with recommended secret store workflows
- [ ] Audit and remove hard-coded secrets and debug-only logging in production paths
- [ ] Create a release checklist and a `release/` script that produces a deployable artifact and release notes
- [ ] Run a dependency and security sweep (npm audit / pip-audit) and document allowed exceptions
- [ ] Add simple observability/health endpoints for pipeline and MCP and wire to a basic health dashboard

Notes
- Keep tasks intentionally high-level here; each of the above should spawn its own phase-specific subtasks (drilled in phases 01-09).
