# TypeScript Error Resolution Tasks — Type 6 (cleaned)

## 1) Astro API Route Integration (HIGH)

- [ ] Fix `APIRoute` import errors across all API endpoints
- [ ] Resolve `APIContext` import declaration issues
- [ ] Address Astro framework type compatibility problems
- [ ] Fix API route export and handler type definitions
- [ ] Standardize API response type handling across endpoints

## 2) Bias Detection API Systems (HIGH)

- [ ] Fix bias detection export functionality type errors
- [ ] Resolve historical comparison null assignment issues
- [ ] Address bias detection WebSocket integration problems
- [ ] Fix bias detection preset management type safety
- [ ] Resolve bias analysis result processing errors

## 3) Memory & Authentication Services (HIGH)

- [ ] Fix memory service method signature mismatches (`createMemory`, `updateMemory`, etc.)
- [ ] Resolve authentication result property access errors
- [ ] Address user authentication validation type issues
- [ ] Fix memory search and CRUD operation type safety
- [ ] Resolve session management and user context problems

## 4) FHE API Processing (MEDIUM)

- [ ] Fix FHE service API integration type errors
- [ ] Resolve `processEncrypted` and `rotateKeys` method issues
- [ ] Address FHE security level validation problems
- [ ] Fix FHE service initialization check type errors
- [ ] Resolve encrypted data processing pipeline issues

## 5) Emotional Analysis APIs (MEDIUM)

- [ ] Fix dimensional emotion mapping import errors
- [ ] Resolve real-time emotion analysis type issues
- [ ] Address emotional data processing type safety
- [ ] Fix emotion API response format validation
- [ ] Resolve emotion analysis result serialization

## 6) Export & Notification Systems (MEDIUM)

- [ ] Fix export format type confusion issues (`ExportFormat` value vs type)
- [ ] Resolve conversation export functionality type errors
- [ ] Address notification preferences service integration
- [ ] Fix export service FHE integration compatibility
- [ ] Resolve download API endpoint type validation

## 7) API Utilities & Helpers (LOW)

- [ ] Fix profiling demo API parameter type inference
- [ ] Resolve environment variable access type safety
- [ ] Address API utility function return type validation
- [ ] Fix API response format standardization
- [ ] Resolve deprecated method usage in API code

## 8) Service Integration & Dependencies (LOW)

- [ ] Fix service dependency injection type issues
- [ ] Resolve inter-service communication type safety
- [ ] Address service lifecycle management type errors
- [ ] Fix service configuration and initialization types
- [ ] Resolve service mock and testing type compatibility

---

### Working order
1. Normalize Astro API route types (`APIRoute`/`APIContext`) and handlers
2. Bias detection and memory/auth service signatures
3. FHE API (`processEncrypted`/`rotateKeys`) and security validation
4. Emotional analysis + export endpoints
5. Utilities and cross‑service types

### Current patterns observed
- Astro import/handler typing drift across API routes
- Service method signatures mismatched (bias/memory/auth)
- User/session shapes not narrowed at boundaries
- Export format value vs type confusion
- Env access via index signatures instead of typed accessors
