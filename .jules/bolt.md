# Bolt's Performance Journal ⚡

## 2025-05-15 - [Parallelizing Analysis Layers in BiasDetectionEngine]
**Learning:** Independent external service calls (like the four analysis layers in `BiasDetectionEngine`) were being executed sequentially, leading to additive latency. Parallelizing them with `Promise.allSettled` reduced the total latency from the sum of all calls to the maximum latency of a single call.
**Action:** Always check if multiple `await` calls to independent services or data sources can be parallelized.

## 2025-05-15 - [Suboptimal memoize implementation]
**Learning:** The default `memoize` implementation in `src/lib/utils.ts` used `String(args[0])` for single arguments. This is an anti-pattern for objects as they all stringify to `"[object Object]"`, causing cache collisions (incorrect results) and unnecessary stringification overhead.
**Action:** Use `Map<unknown, any>` and use the argument directly as the key for single-argument functions to support reference-based caching and avoid stringification.
