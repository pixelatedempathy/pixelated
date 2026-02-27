## 2025-05-14 - Parallelizing Independent Analysis Layers

**Learning:** Parallelizing independent service calls in the `BiasDetectionEngine` reduced the latency of `analyzeSession` from ~3000ms to ~1000ms (3x speedup). Using `Promise.allSettled` instead of `Promise.all` is critical here to ensure that a failure in one analysis layer doesn't crash the entire session analysis, allowing fallback results to be used for the failed layer while preserving the successful results from others.

**Action:** Always look for sequential `await` calls that don't share data dependencies and parallelize them using `Promise.allSettled` to optimize for latency.
