## Pipeline Entry-Points Audit

Date: 2025-09-28

This document audits the planned pipeline entry points described in `plan/pipeline-entry-points-1.md` and inspects the repository for actual implementations, tests, integration points, and UI/CLI/MCP entry points. The audit focuses on completeness, depth of integration, production-readiness, and recommended next steps.

### Summary Findings (TL;DR)
- The repository contains a substantial, production-quality Python dataset pipeline under `ai/dataset_pipeline/`. Core orchestrators, many stage implementations, and extensive unit tests exist.
- There is a demo frontend and several Astro pages and client-side demo APIs (e.g., `src/lib/api/psychology-pipeline-demo.ts` and `src/pages/demo/psychology-pipeline-processor.astro`) that provide UI prototypes. These are primarily demo/stub code intended for internal demos, not a hardened production pipeline UI.
- A comprehensive MCP design and many MCP artifacts/specs are present under `docs/architecture` and `ai/api/mcp_server/` (and `mcp_server/`). There are FastAPI-style specifications and adapter code; however, the MCP server implementation appears to be largely in docs/specs and example modules rather than an actively deployed service in `mcp_server/` (there is a `mcp_server` folder with tests and integration pieces but it looks separate from the main deployed web frontend).
- CLI-like scripts and JS/TS client-side scripts that run pipeline flows exist (e.g., `src/scripts/run_full_dialogue_pipeline.js`, `ai/dataset_pipeline/run_task_*`), but a formal CLI tool with clear commands, help, and robust error handling is mixed between demo scripts and internal Python run_task scripts.
- End-to-end connectivity is partially implemented: `ai/dataset_pipeline/pipeline_orchestrator.py` (and related `production_pipeline_orchestrator.py`) implement orchestration logic and there are tests for complete pipeline journeys. Communication modules for MCP/TechDeck integration exist under `ai/api/techdeck_integration` with event bus and coordinator implementations.

### Inventory (evidence)
- Dataset pipeline implementation: `ai/dataset_pipeline/` — many modules, orchestrators, validators, processors, run_task scripts, and unit tests (e.g., `test_pipeline_orchestrator.py`, many `test_*.py`).
- Pipeline orchestrator(s): `ai/dataset_pipeline/pipeline_orchestrator.py`, `ai/dataset_pipeline/production_pipeline_orchestrator.py`, `ai/api/techdeck_integration/integration/pipeline_orchestrator.py`.
- Demo frontend / UI client helpers:
  - `src/lib/api/psychology-pipeline-demo.ts` (client-side demo functions that simulate API calls)
  - `src/pages/demo/psychology-pipeline-processor.astro` (demo page referencing analytics and demo endpoints)
  - `src/lib/analytics/demo-analytics-config.ts` includes demo page configs
- API endpoints (frontend): many `/api/*` routes exist (e.g., `/api/ai/mental-health/analyze.ts`) but no direct `/api/pipelines/*` HTTP API endpoint was found in `src/pages/api` that proxies to `ai/dataset_pipeline` for production orchestration.
- MCP artifacts & design: `docs/architecture/mcp-*`, `docs/specs/*` and a dedicated `mcp_server/` tree containing integration tests and WebSocket router code.
- TechDeck integration: `ai/api/techdeck_integration/` with communication, event bus, pipeline_coordinator, and tests for the six-stage pipeline communication.
- CLI/run scripts:
  - Python run_task scripts in `ai/dataset_pipeline/run_task_*` (entry points for individual tasks)
  - `ai/scripts/*` and `src/scripts/run_full_dialogue_pipeline.js` (Node.js scripts that orchestrate local demo flows)

### Frontend (Web UI) Assessment
- What exists: demo pages (Astro) and client-side demo APIs that simulate calls. `psychology-pipeline-demo.ts` uses simulated delays and returns generated data — clearly marked as demo.
- Production readiness: Not production-grade. There are no server-side API endpoints implemented to invoke the Python pipeline directly from the web frontend. The demo code stubs client-side fetch calls to `/api/psychology-pipeline/*` but these endpoints are commented out or not implemented in the server API routes.
- Observed issues:
  - Demo uses synthetic delays and random quality scores — helpful for UI prototyping but not connected to real pipeline backends.
  - No end-to-end authenticated UI flow found that triggers `ai/dataset_pipeline` orchestrators through a secure, tested API.

### CLI Assessment
- What exists: many task scripts inside `ai/dataset_pipeline/` (e.g., `run_task_*.py`) and Python scripts under `ai/scripts/` that modify sys.path and run migrations or orchestrator functions. There is no single top-level CLI binary with `--help`, subcommands, and documented usage in `scripts/` or `bin/`.
- Production readiness: The Python task scripts are runnable and appear to be used by CI and internal operations, but they are not consolidated into a robust user-facing CLI tool. The scripts are suitable for ops/dev usage but would benefit from a formal CLI wrapper (click/argparse/typer) and better docs.

### MCP / Agent Integration Assessment
- What exists: Extensive design and spec material under `docs/architecture/*` and `docs/specs/*`. There is a separate `mcp_server/` package with WebSocket routers and Flask integration tests.
- Implementation state: There are code artifacts in `ai/api/mcp_server/` and `mcp_server/` that implement integration pieces (routers, services). The MCP appears to be a parallel service (FastAPI + WebSocket) intended to orchestrate the Python pipeline via HTTP/gRPC and queue systems. The codebase contains tests, configs, and docker-compose snippets for MCP.
- Production readiness: The MCP is designed in-depth and partially implemented (routers/services/tests), but it's not clearly wired into the main web frontend or a deployed runtime in this repository. The MCP implementation looks substantial but may require deployment and runtime wiring (secrets, docker compose, ingress) to be production-ready.

### End-to-End Integration & Tests
- Tests: Many unit tests exist for pipeline components (see `ai/dataset_pipeline/test_*.py`) including `test_pipeline_orchestrator.py` and `test_phase6_complete.py`. There are also tests in `ai/api/techdeck_integration/communication/tests` for the six-stage communication and integration tests in `mcp_server/tests/`.
- Evidence of end-to-end flows: The test suite contains integration-style tests that simulate running all 6 stages and assert stage count and metadata; run_task scripts provide runnable entry points for offline processing.
- Gaps: While tests simulate or run the orchestration locally, there is no single smoke-test harness that invokes the web frontend → API → MCP (if present) → Python pipeline in a fully integrated environment within this repo. Parts are well-tested in isolation; glue for HTTP/API/live WebSocket integration seems scoped to `mcp_server` and `ai/api/techdeck_integration`, which would require deployment to validate fully.

### Quality & Production-Grade Check
- Code quality: The Python pipeline directory is large, with many focused modules and unit tests — a sign of mature code. Several `production_*` modules exist (e.g., `production_pipeline_orchestrator.py`, `production_exporter.py`). There are audit and QA notes.
- Demo vs production: Frontend demo code intentionally uses simulated responses. CLI functionality is split across scripts and internal Python modules. MCP is documented and partially implemented; enterprise-grade deployment artifacts (docker/k8s manifests) exist in `docs/architecture` and `mcp_server/docker-compose.*`.

### Notable Files & Where to Look (quick map)
- Core pipeline implementation and tests: `ai/dataset_pipeline/` and `ai/dataset_pipeline/test_*.py`
- Pipeline orchestrator: `ai/dataset_pipeline/pipeline_orchestrator.py`
- Production orchestrator variant: `ai/dataset_pipeline/production_pipeline_orchestrator.py`
- TechDeck integration and six-stage communication: `ai/api/techdeck_integration/` (communication/, event_bus.py, pipeline_coordinator.py)
- MCP design and artifacts: `docs/architecture/mcp-*`, `ai/api/mcp_server/`, `mcp_server/` (routers, services, tests)
- Frontend demo: `src/lib/api/psychology-pipeline-demo.ts`, `src/pages/demo/psychology-pipeline-processor.astro`
- CLI/run scripts: `ai/dataset_pipeline/run_task_*.py`, `ai/scripts/`, `src/scripts/run_full_dialogue_pipeline.js`

### Ratings (1-5) and Explanation
- Core dataset pipeline implementation: 5/5 — many modules, production variants, and comprehensive unit tests.
- Pipeline orchestrator (internal): 5/5 — implemented, tested, and used by other modules.
- Web frontend entry point: 2/5 — demo/UX components exist, but no secure, production API wiring to the pipeline; demo stubs in the frontend are explicitly synthetic.
- CLI entry point: 3/5 — many runnable scripts exist, but no consolidated CLI tool with polished UX (help, subcommands, installable entry point).
- MCP agent entry point: 4/5 — strong design, specs, and partial implementation; likely requires deployment/integration work to be fully operational and discoverable by the frontend.
- End-to-end deployment (UI → API → MCP → pipeline → storage): 3/5 — components exist across the codebase, tests simulate flows, but complete production wiring and an automated smoke-test are not present in this repo.

### Gaps, Risks, and Recommendations
1. Frontend-to-backend API wiring
   - Gap: No production `/api/pipelines/*` endpoints in `src/pages/api/` that trigger `ai/dataset_pipeline` orchestrators.
   - Risk: UIs are demos that could mislead stakeholders about readiness.
   - Recommendation: Implement a secure API adapter (server-side route) that proxies authenticated requests to the pipeline orchestrator (via local call, gRPC, or MCP). Add integration tests.

2. Single, documented CLI
   - Gap: Multiple run scripts exist without a consolidated CLI UX.
   - Recommendation: Create a small CLI using `typer` or `click` (e.g., `scripts/pipeline-cli.py`) with subcommands: `start`, `run-task`, `status`, `export`, `validate` and proper logging and exit codes.

3. MCP deployment & runtime wiring
   - Gap: MCP code and docs are extensive, but there is no single, documented deploy/run recipe in the repo root. Docker/k8s manifests exist in docs but may be stale.
   - Recommendation: Add `mcp_server/docker-compose.mcp.yml` (or update existing) to `docker/` with clear env examples. Add a smoke-test that registers a test agent and triggers a simple pipeline run.

4. End-to-end smoke tests and CI gating
   - Gap: Tests cover units and some integration, but a CI-level smoke test that runs the full flow (UI/API/MCP/Pipeline) is missing.
   - Recommendation: Add a lightweight integration test (possibly using Docker Compose in CI) that brings up the MCP server in a minimal mode, calls the API endpoint, and asserts stage completion.

5. Documentation clarity
   - Gap: Many design docs and specs exist; some paths reference `ai/pipelines/dataset_pipeline` vs `ai/dataset_pipeline` (organizing differences). This can confuse new contributors.
   - Recommendation: Add a short README at `ai/dataset_pipeline/README.md` summarizing entry points, how to run tasks, and how to connect the web UI and MCP. Link to MCP docs and provide a 'how to run locally' section.

### Next Steps (minimal, actionable)
1. Implement a small server-side API route `src/pages/api/pipelines/trigger.ts` that safely forwards requests to `ai/dataset_pipeline/pipeline_orchestrator.execute_pipeline` (or to MCP adapter) and returns status (start simple with auth/mock user in dev).
2. Add a CLI wrapper `scripts/pipeline-cli.py` with `start` and `status` commands that call `production_pipeline_orchestrator`.
3. Create a Docker Compose development fixture that composes `mcp_server` (minimal) + `pipeline` service so CI can run a smoke test.
4. Add an integration test that runs a minimal six-stage pipeline and asserts 6 stage results (re-using existing tests under `ai/api/techdeck_integration/communication/tests`).

---

Audit performed by repository scan on 2025-09-28. Evidence cited above (file locations and tests) was found in the repository. This file intentionally lists locations rather than copy large file contents.
