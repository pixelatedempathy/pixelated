## 2025-05-14 - Identity-based Memoization Optimization
**Learning:** Traditional `JSON.stringify` based memoization keys are expensive for large objects and can cause collisions between different types that stringify the same (e.g., `1` vs `"1"`). Relying on `fn.length` for memoization strategy is unreliable due to default and rest parameters.
**Action:** Use nested `Map` or `WeakMap` for multi-argument memoization to implement identity-based caching. Use the actual number of arguments passed (`args.length`) rather than `fn.length` to determine the caching path.
