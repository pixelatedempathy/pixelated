## 2026-02-21 - [Memoize Key Collision]
**Learning:** Using `String(args[0])` for memoization keys causes all objects to collide as `[object Object]`. This is a performance anti-pattern that also breaks correctness.
**Action:** Use the argument itself as a Map key for single primitives (fastest) and `JSON.stringify(args)` or reference-based keys for objects to ensure both speed and correctness.
