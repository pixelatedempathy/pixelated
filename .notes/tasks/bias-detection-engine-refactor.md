# BiasDetectionEngine.ts Refactoring Task List

## Overview
Refactor the massive BiasDetectionEngine.ts file (5,854 lines) into smaller, more manageable and maintainable pieces to reduce crashes and improve development experience.

## Current Analysis
- **Total size**: 5,854 lines (extremely large)
- **Main components identified**:
  1. Type definitions and interfaces (~280 lines)
  2. PythonBiasDetectionBridge class (~639 lines)  
  3. BiasMetricsCollector class (~542 lines)
  4. BiasAlertSystem class (~873 lines)
  5. BiasDetectionEngine class (~3500+ lines)

## Refactoring Strategy
Break down into logical modules following clean architecture principles:
- **Interfaces module**: All type definitions
- **Bridge module**: Python service communication
- **Metrics module**: Metrics collection and reporting  
- **Alerts module**: Alert system and notifications
- **Core engine**: Main orchestration logic (slimmed down)

## Tasks

### Phase 1: Create Type Definitions Module
- [ ] Extract all interfaces and types to `bias-detection-interfaces.ts`
- [ ] Update imports in the main file
- [ ] Ensure type safety is maintained

> Audit note: This step has already been completed in the repository.

- [x] Extract all interfaces and types to `bias-detection-interfaces.ts` (file: `/src/lib/ai/bias-detection/bias-detection-interfaces.ts`)
- [x] Updated imports in dependent modules (python-bridge, metrics-collector, alerts-system)
- [x] Verified type exports; note: `bias-detection-interfaces.ts` re-exports from `./types.ts` which creates some overlap and potential duplication. Recommend merging/cleaning duplicate definitions.

### Phase 2: Extract Python Bridge Module  
- [ ] Create `python-bridge.ts` for PythonBiasDetectionBridge class
- [ ] Move all Python service communication logic
- [ ] Update imports and exports
- [ ] Add proper error handling and logging

> Audit note: This step has been implemented and verified.

- [x] `python-bridge.ts` exists at `/src/lib/ai/bias-detection/python-bridge.ts` and contains the `PythonBiasDetectionBridge` implementation (approx. 678 lines). Key features: connection pooling, request queue, retries/backoff, health checks, response mapping, and fallback result generation.

### Phase 3: Extract Metrics Module
- [ ] Create `metrics-collector.ts` for BiasMetricsCollector class
- [ ] Move all metrics collection and dashboard functionality
- [ ] Ensure proper separation of concerns
- [ ] Update imports and exports

> Audit note: File exists; content verification in-progress.

- [ ] `metrics-collector.ts` file found at `/src/lib/ai/bias-detection/metrics-collector.ts`. Verifying exported methods and references in the engine.

### Phase 4: Extract Alerts Module
- [ ] Create `alerts-system.ts` for BiasAlertSystem class  
- [ ] Move all alert handling and notification logic
- [ ] Implement proper alert escalation
- [ ] Update imports and exports

> Audit note: File exists; content verification pending.

- [ ] `alerts-system.ts` found at `/src/lib/ai/bias-detection/alerts-system.ts`. The file imports types from `bias-detection-interfaces` but contains comments warning of duplicated Alert-related type definitions. Recommendation: dedupe alert-related types and centralize in `bias-detection-interfaces.ts`.

### Phase 5: Refactor Core Engine
- [ ] Slim down BiasDetectionEngine class to orchestration only
- [ ] Remove extracted functionality from main file
- [ ] Update imports to use new modules
- [ ] Ensure all functionality still works

> Audit note: `BiasDetectionEngine.ts` is present at `/src/lib/ai/bias-detection/BiasDetectionEngine.ts` and currently wires the extracted modules (`python-bridge.ts`, `metrics-collector.ts`, `alerts-system.ts`).

- [ ] Verify that the engine file no longer contains duplicated logic from the extracted modules. Initial inspection shows it still contains fallback logic and orchestration. Recommend a code sweep to ensure extracted functions are not duplicated in both places.

### Phase 6: Testing & Validation
- [ ] Run existing tests to ensure no regressions
- [ ] Add integration tests for new module boundaries
- [ ] Performance testing to ensure no degradation
- [ ] Lint and type checking

> Audit note: Tests are present under `/src/lib/ai/bias-detection/__tests__/` and project `package.json` contains a `test:bias-detection` script. Running tests is the next recommended step — this will reveal regressions introduced by the merge/refactor. (Not executed yet in this audit.)

### Phase 7: Documentation & Cleanup
- [ ] Update README.md with new architecture
- [ ] Add JSDoc comments to public interfaces
- [ ] Clean up any unused imports or code
- [ ] Update index.ts exports

> Audit note: `README.md` for the bias-detection module references the modular layout and `python-bridge` import. Confirmed `/src/lib/ai/bias-detection/index.ts` exports types and PerformanceMetrics from `bias-detection-interfaces.ts`.

### Discrepancies & Remediation Recommendations

- Duplicate types: `bias-detection-interfaces.ts` re-exports `./types.ts`. There is some duplication and overlapping type definitions across `types.ts`, `bias-detection-interfaces.ts`, and alert-related definitions in `alerts-system.ts`. Action: create a single source-of-truth (`bias-detection-interfaces.ts`) and remove duplicates from `types.ts` and other files or make `types.ts` a narrow shared file.
- Engine duplication: `BiasDetectionEngine.ts` still contains fallback logic and some layer default structures. Ensure that behavior is centralized (e.g., fallback creation in python-bridge) or clearly documented as intentional orchestration fallback values.
- Tests: Several tests reference the engine and may expect specific fallback values or behaviors. Run `pnpm test:bias-detection` to discover failing tests and iterate.

### Verified File Locations (for quick reference)

- `/src/lib/ai/bias-detection/bias-detection-interfaces.ts` — central interfaces
- `/src/lib/ai/bias-detection/python-bridge.ts` — Python service bridge
- `/src/lib/ai/bias-detection/metrics-collector.ts` — metrics collector (audit in-progress)
- `/src/lib/ai/bias-detection/alerts-system.ts` — alerts system (audit pending)
- `/src/lib/ai/bias-detection/BiasDetectionEngine.ts` — core orchestration
- `/src/lib/ai/bias-detection/types.ts` — legacy types (may require merging)
- `/src/lib/ai/bias-detection/index.ts` — module exports
- `/src/lib/ai/bias-detection/__tests__/` — test files

### Immediate Next Steps

1. Verify `metrics-collector.ts` contents and ensure methods used by the engine are implemented and not duplicated.
2. Verify `alerts-system.ts` contents and dedupe any alert-related types; ensure a single source-of-truth for alert interfaces.
3. Run `pnpm test:bias-detection` and capture failures; prioritize fixing tests that assert interface/behavior contracts (fallback values, thresholds, and API signatures).
4. Optional: Run type-checking (`pnpm -s build` or `pnpm -s ts-check` depending on repo scripts) and linting to surface issues.
5. Once tests pass and types are deduped, update `BiasDetectionEngine.ts` to remove any duplicated logic if present and re-run tests.

### Progress Summary

- Interfaces extraction: Completed ✅
- Python bridge extraction: Completed ✅
- Metrics module: In-progress (file located) ⚙️
- Alerts module: Pending verification ⚠️
- Core engine slimming: Pending verification ⚠️
- Tests & validation: Pending execution ▶️
- Documentation & cleanup: Partial (README references updated) ✍️


## Relevant Files
- `/src/lib/ai/bias-detection/BiasDetectionEngine.ts` - Main file to refactor
- `/src/lib/ai/bias-detection/types.ts` - Existing types (may need merging)
- `/src/lib/ai/bias-detection/index.ts` - Main exports
- `/src/lib/ai/bias-detection/__tests__/` - Test files to update

## Success Criteria
- [ ] All existing functionality preserved
- [ ] File sizes reduced to manageable chunks (<1000 lines each)
- [ ] Clear separation of concerns
- [ ] Improved maintainability and readability
- [ ] No performance degradation
- [ ] All tests passing
- [ ] Clean import/export structure
