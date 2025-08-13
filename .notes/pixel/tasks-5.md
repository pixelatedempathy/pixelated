# TypeScript Error Resolution Tasks — Type 5 (cleaned)

## 1) FHE store & encryption (HIGH)
- [ ] Align encryption/decryption function signatures (input/output generics)
- [ ] Fix `HomomorphicOperationResult` assignment and narrowing
- [ ] Replace `EncryptedData<unknown>` casts with safe discriminated unions
- [ ] Make `processEncrypted` accept/return a single, strict generic shape
- [ ] Integrate key‑rotation service types with FHE adapters

## 2) WebSocket server & comms (HIGH)
- [ ] Solidify `ConnectionHandler`/`MockWebSocket` typings for tests
- [ ] Strongly type message envelope and handlers (publish/subscribe)
- [ ] Type client registry and lifecycle (connect/close/error)
- [ ] Ensure event handler params are correctly inferred in mocks

## 3) Demo helpers & integration tests (MEDIUM)
- [ ] Type demo helper utilities (params/returns) and narrow `any`
- [ ] Fix Response/body conversion in integration tests
- [ ] Unify fetch mocks (headers/body/url) with platform types
- [ ] Validate session payload shapes and IDs (parse/generate)

## 4) Supabase types (MEDIUM)
- [ ] Resolve module path aliases and imports
- [ ] Normalize `Json` type import/export
- [ ] Reconcile DB schema types vs client usage
- [ ] Type‑safe client configuration

## 5) Utilities & helpers (MEDIUM)
- [ ] Stabilize logger mock exports (named/default parity)
- [ ] Tighten parameter inference and return types
- [ ] Replace deprecated `.substr()` with `.slice()`

## 6) Store state management (LOW)
- [ ] Formalize state types and mutation signatures
- [ ] Validate action params; ensure hydration/persistence types
- [ ] Type subscriptions and notifications

## 7) Test infra & mocking (LOW)
- [ ] Normalize mock object shapes; remove implicit `any`
- [ ] Ensure test env setup typings (vitest config/globals)
- [ ] Harden assertions with precise types

## 8) Async & promises (LOW)
- [ ] Remove unnecessary `await`s
- [ ] Fix promise inference; prefer explicit generics where needed
- [ ] Validate concurrent flows and error paths

---

### Working order
1. FHE encryption generics + key rotation wiring
2. WebSocket types and mocks (unblock flaky tests)
3. Demo helpers + integration Response/fetch typing
4. Supabase types alignment
5. Utilities cleanup and deprecated API replacements

### Current patterns observed
- Type conversion/casting hotspots (encryption/results)
- Mock/mismatch in test doubles for WS and fetch
- Module aliasing/import drift (supabase/db)
- Minor async/style issues (unnecessary await, deprecated methods)
