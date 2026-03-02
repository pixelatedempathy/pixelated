## 2025-05-23 - Parallelization of Independent Analysis Layers
**Learning:** In `BiasDetectionEngine.analyzeSession`, executing four independent analysis layers sequentially created a significant bottleneck (sum of all latencies). Parallelizing these with `Promise.allSettled` reduced the total execution time to approximately the duration of the slowest call, resulting in a ~3x speedup in benchmarks (from ~3000ms to ~1000ms).

**Action:** Always check for independent asynchronous operations that are currently awaited sequentially. Use `Promise.allSettled` for safety to ensure that one failing layer doesn't abort the entire process. Wrap each call in an async IIFE `(async () => ... )()` to safely convert any synchronous exceptions (common in complex bridge or mock logic) into promise rejections, maintaining engine stability.

## 2025-05-24 - Optimization of Deep Cloning in Security Pipelines
**Learning:** Replacing `JSON.parse(JSON.stringify(data))` with the project's specialized `deepClone(data)` utility in `src/lib/security/pii/index.ts` resulted in a ~26% performance boost for object cloning within the PII redaction pipeline. Benchmarks confirm that `deepClone` is significantly faster than the serialization-deserialization approach, especially for complex objects.

**Action:** Avoid `JSON.parse(JSON.stringify(obj))` for deep cloning in performance-critical paths. Prefer the centralized `deepClone` utility in `src/lib/utils.ts` (or `structuredClone` in modern environments if compatible). Always verify that custom cloning utilities handle relevant data types (Dates, Maps, etc.) correctly before replacement.
