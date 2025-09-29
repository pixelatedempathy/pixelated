## PIXEL-ASTRO-12: Prevent runtime error from unsafe DOM writes

- Date: 2025-09-25
- Files changed:
	- `src/components/widgets/SearchSwitch.astro`

- Summary: A Sentry issue (PIXEL-ASTRO-12) reported a client-side runtime exception caused by unsafe DOM writes and non-null assertions when updating `#search-results`. The component used `document.getElementById('search-results')!` with `innerHTML +=` which throws when the element is missing or unexpectedly removed. This change avoids non-null assertions and constructs DOM nodes safely via `createElement`/`appendChild` and guards against missing container elements.

- Follow-ups:
	- Add a simple browser unit test for `SearchSwitch` to assert no-throw behavior when `#search-results` is absent.
	- Consider auditing other components that use `!` non-null assertions with DOM mutations (search results, analytics widgets).

Tech debt: standardize Python installs with uv
--------------------------------------------

Date: 2025-09-25

Summary:
- We should standardize on `uv` (https://github.com/astral-sh/uv) for Python dependency installation and lockfile reproducibility across the repo. This avoids variations caused by pip resolver and enables faster, deterministic installs via `uv sync` and `uv pip`.

Proposed full change (Option A):
- Replace `pip install` occurrences across the repository with `uv` equivalents where executable scripts, Dockerfiles, CI, and install scripts perform real installs.
- Add `uv.lock`/`pyproject.toml` based sync steps in containers and CI where appropriate (e.g., `uv sync --frozen`).
- Ensure `uv` is installed in Docker base stages and CI images before calling `uv`.
- Update developer docs and READMEs to recommend `uv` for reproducible installs.

Notes:
- We implemented a targeted change (Option B) to update Dockerfiles and key install scripts on 2025-09-25. Option A is larger and tracked here as tech debt.
# Technical Debt Log

## Runlog Summary (short)
- Multiple dev services started: analytics, bias-detection, worker, AI services
- Dev server runs with increased Node heap (NODE_OPTIONS=--max-old-space-size=8192)
- Notable services: Analytics (port 8003), JobQueueService, PerformanceOptimizer (background workers), memory/cache services initialized

## Actionable Recommendations
- Add a lightweight health-check aggregator that queries all local dev services and surfaces readiness
- Document required env vars and external endpoints (Serena/SSE, Redis, Mongo, Vercel KV) in a single `ENV.sample` for onboarding
- Consider adding a small `pnpm` script to validate essential services before `dev:all-services`

## Notes
- This file created to replace lost "technical debt" file during merge. Keep concise, append future runlog snippets here.

### Documentation: PIXEL-ASTRO-12 follow-up

- Documented investigation and defensive fixes on 2025-09-25. No tests were run at the user's request. See the SearchSwitch change for the primary fix.
- Status: Closed (defensive fix applied). Recommended follow-ups remain: add unit test(s), run CI, audit similar patterns across UI code.
