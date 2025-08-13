# TypeScript Error Resolution Tasks - Set 2

## *Generated from type-2.md analysis - Categorized by error type for systematic resolution*

## 1. Module Resolution & Import Errors (HIGH PRIORITY)

### Missing Astro Type Declarations

- [x] Fix `Module '"astro"' has no exported member 'ImageMetadata'` in:
  - `src/components/widgets/SwiperCarousel.astro`
- [ ] Fix `Module '"astro"' has no exported member 'AstroIntegration'` in:
  - `src/integrations/search.ts`
- [ ] Fix `Module '"astro"' has no exported member 'APIContext'` in:
  - `src/lib/admin/middleware.ts`
- [ ] Fix `Module '"astro"' has no exported member 'AstroCookies'` in:
  - `src/lib/access-control.ts`
- [ ] Fix `Property 'props' does not exist on type '{ url: URL; site: URL; }'` in:
  - `src/layouts/ChatLayout.astro`

### Missing Module Imports & Type Declarations

- [x] Fix `Cannot find module '../lib/security/breach-notification'` missing export 'BreachNotificationSystem' in:
  - `src/e2e/breach-notification.spec.ts`
  - `src/lib/analytics/breach-analytics.ts`
- [ ] Fix `Cannot find module '../services/AuthService'` export issues in:
  - `src/e2e/breach-notification.spec.ts`
- [ ] Fix `Cannot find module '../types/auth.js'` missing export 'Session' in:
  - `src/hooks/auth-types.ts`
- [ ] Fix `Cannot find module '../lib/ai/types/CognitiveDistortions'` in:
  - `src/hooks/useCognitiveDistortionDetection.ts`
- [ ] Fix `Cannot find module '@/lib/ai/temporal/types'` in:
  - `src/hooks/useEmotionProgress.ts`
- [ ] Fix `Cannot find module '../lib/ai/temporal/EmotionTemporalAnalyzer'` missing export 'TemporalEmotionAnalysis' in:
  - `src/hooks/useTemporalEmotionAnalysis.ts`
- [ ] Fix `Cannot find module '@/lib/ai/services/PatientModelService'` missing export 'ModelIdentifier' in:
  - `src/hooks/usePatientModel.ts`
- [ ] Fix `Cannot find module '@/config/env.config'` in:
  - `src/lib/ai/mental-llama/config.ts`

### Bias Detection Test Module Imports

- [x] Fix `Cannot find module './types'` in bias detection tests:
  - `src/lib/ai/bias-detection/__tests__/audit.test.ts`
  - `src/lib/ai/bias-detection/__tests__/cache.test.ts`
  - `src/lib/ai/bias-detection/__tests__/utils.test.ts`
- [x] Fix `Cannot find module './audit'` in:
  - `src/lib/ai/bias-detection/__tests__/audit.test.ts`
- [x] Fix `Cannot find module './cache'` in:
  - `src/lib/ai/bias-detection/__tests__/cache.test.ts`
- [x] Fix `Cannot find module './config'` in:
  - `src/lib/ai/bias-detection/__tests__/config.test.ts`
- [x] Fix `Cannot find module './utils'` in:
  - `src/lib/ai/bias-detection/__tests__/utils.test.ts`

### Analytics Module Import Issues

- [x] Fix `Cannot find module './ml'` missing export 'MachineLearning' in:
  - `src/lib/analytics/breach-analytics.ts`
- [x] Fix `Cannot find module './risk'` missing export 'RiskScoring' in:
  - `src/lib/analytics/breach-analytics.ts`

## 2. Type Definition & Interface Errors (HIGH PRIORITY)

### Button Component Type Issues

- [ ] Fix `Argument of type '"cursor-not-allowed"' is not assignable to parameter of type 'never'` in:
  - `src/components/ui/button/button-types.ts` (line 94)
- [ ] Fix `Argument of type '"cursor-wait"' is not assignable to parameter of type 'never'` in:
  - `src/components/ui/button/button-types.ts` (line 90)
- [ ] Fix `Argument of type '"w-full"' is not assignable to parameter of type 'never'` in:
  - `src/components/ui/button/button-types.ts` (line 86)

### Layout Component Prop Errors

- [ ] Fix `Property 'showNavBar' does not exist on type 'IntrinsicAttributes & Props'` in:
  - `src/layouts/AuthLayout.astro`
- [ ] Fix `Property 'ogImage' does not exist on type 'IntrinsicAttributes & Props'` in:
  - `src/layouts/BlogPostLayout.astro`

### Cognitive Model Data Type Issues

- [ ] Fix `Type 'string' is not assignable to type 'SkillAcquired'` in:
  - `src/data/sample-cognitive-models.ts` (multiple lines: 1136, 1135, 1134, 749, 748, 747, 361, 360, 359)
- [ ] Fix `Object literal may only specify known properties, and 'resistance' does not exist in type 'ConversationalStyle'` in:
  - `src/data/sample-cognitive-models.ts` (lines 1087, 704, 318)

### AI Service Type Mismatches

- [ ] Fix missing properties in `PatientModelService`:
  - `Property 'generatePatientPrompt' does not exist` (line 136)
  - `Property 'createResponseContext' does not exist` (line 123)
  - `Property 'getModelById' does not exist` (line 69)

## 3. Function & Method Signature Errors (MEDIUM PRIORITY)

### Authentication Service Issues

- [ ] Fix incorrect argument counts in auth service calls:
  - `Expected 1 arguments, but got 0` in `authSignOut()` (line 213)
  - `Expected 1 arguments, but got 0` in `getCurrentUser()` (line 74)
- [ ] Fix missing property access issues:
  - `Property 'user' does not exist on type '{ success: boolean; error: unknown; }'` (lines 265, 264)
  - `Property 'error' does not exist on type` in auth results (lines 163, 127)

### Test Framework Method Signature Issues

- [ ] Fix bias detection engine test method signatures:
  - `Expected 1 arguments, but got 3` in `analyzeSession` calls (lines 439, 384, 355, 328)
  - `Expected 1 arguments, but got 2` in `startMonitoring` (line 432)
- [ ] Fix missing properties in test report types:
  - Add missing properties: `appendices`, `recommendations`, `detailedAnalysis`, `executiveSummary`, etc.

### Crisis Service Database Method Issues

- [ ] Fix MongoDB query issues in `CrisisSessionFlaggingService`:
  - `Property 'from' does not exist on type 'MongoDB'` (lines 327, 292, 255, 217)
  - `Cannot find name 'db'` (lines 133, 112)

## 4. Array & Object Type Issues (MEDIUM PRIORITY)

### Array Push Type Conflicts

- [ ] Fix `Argument of type '...' is not assignable to parameter of type 'never'` in:
  - `src/hooks/useEmotionProgress.ts` (line 206)
  - `src/hooks/usePasswordStrength.ts` (multiple suggestions array pushes)
  - `src/lib/ai/bias-detection/database-service.ts` (recommendations pushes)
  - `src/lib/analytics/ml.ts` (predictions push)
  - `src/lib/analytics/risk.ts` (factorResults push)
  - `src/lib/ai/temporal/TemporalAnalysisAlgorithm.ts` (multiple pattern arrays)

### Object Property Type Mismatches

- [ ] Fix object literal property conflicts:
  - `Property 'timestamp' does not exist in type 'Message'` in pattern detection tests
  - `Property 'sessionLength' does not exist in type 'SessionMetadata'` in baseline scenarios
  - `Property 'name' does not exist in type 'TrainingScenario'` in test fixtures

## 5. Null Safety & Undefined Issues (MEDIUM PRIORITY)

### Potential Undefined Access

- [ ] Fix `Object is possibly 'undefined'` in:
  - `src/lib/ai/bias-detection/config.ts` (multiple config property accesses)
  - `src/lib/ai/temporal/TemporalAnalysisAlgorithm.ts` (array index accesses)
  - `src/lib/crypto.ts` (parts array access)
  - `src/lib/fhe.ts` (bytes array access)
  - `src/lib/markdown.ts` (regex match results)

### String Type Safety Issues

- [ ] Fix `Type 'string | undefined' is not assignable to type 'string'` in:
  - `src/components/views/GithubView.astro` (pkgName, versionNum)
  - `src/lib/cache.ts` (oldestKey)
  - `src/lib/ai/bias-detection/config.ts` (pythonServiceUrl)

## 6. Environment Variable & Configuration Issues (LOW PRIORITY)

### Process.env Index Signature Issues

- [ ] Fix `Property '...' comes from an index signature, so it must be accessed with ['...']` for:
  - Email configuration: `EMAIL_API_KEY`, `SMTP_*` variables in `src/lib/email.ts`
  - Redis configuration: `REDIS_URL`, `UPSTASH_*` variables in `src/lib/redis.ts`
  - Security configuration: `ENCRYPTION_KEY`, `SECRET_KEY`, `NODE_ENV` in `src/lib/security.ts`
  - Analytics configuration: `PUBLIC_ANALYTICS_*` in `src/lib/analytics.ts`
  - MongoDB configuration: `MONGODB_*` in `src/lib/analytics/breach.ts`
  - Test environment variables in bias detection tests

## 7. React & Component Issues (LOW PRIORITY)

### React Deprecation Warnings

- [ ] Address deprecated React DOM methods in `src/integrations/react/`:
  - `'render' is deprecated`
  - `'hydrate' is deprecated`
  - `'unmountComponentAtNode' is deprecated`
  - `'findDOMNode' is deprecated`
  - `'createFactory' is deprecated`

### Astro Script Processing Warnings

- [ ] Add `is:inline` directive to scripts with attributes in:
  - `src/layouts/BlogLayout.astro`
  - `src/layouts/Layout.astro`
  - `src/layouts/TailusLayout.astro`

## 8. Buffer & Encoding Issues (LOW PRIORITY)

### Buffer Type Conversion Issues

- [ ] Fix `No overload matches this call` for Buffer operations in:
  - `src/lib/encryption.ts` (multiple Buffer.from().toString() calls)
- [ ] Fix `Argument of type 'Buffer' is not assignable to parameter of type 'Uint8Array'` in:
  - `src/lib/encryption.ts` (saltArray parameter)

### Redis Connection Issues

- [ ] Fix `No overload matches this call` for Redis constructor in:
  - `src/lib/redis.ts` (Redis connection with URL)

## 9. Test Framework & Mock Issues (LOW PRIORITY)

### Vitest/Jest Mock Type Issues

- [ ] Fix `Cannot find namespace 'vi'` in test files:
  - `src/lib/ai/services/PatientProfileService.test.ts`
  - `src/lib/ai/services/PatientResponseService.test.ts`
  - Multiple service test files
- [ ] Fix `Namespace 'global.jest' has no exported member 'Mocked'` issues
- [ ] Fix Supabase mock type conflicts in crisis service tests

### Test Data Type Conversions

- [ ] Fix `Conversion of type '...' to type 'TherapeuticProgress' may be a mistake` in:
  - Multiple service test files with therapeutic progress mocks

## 10. API Context & Handler Types (LOW PRIORITY)

### API Route Handler Signature Issues

- [ ] Fix `Types of parameters '__0' and 'context' are incompatible` in:
  - `src/lib/ai/bias-detection/__tests__/api-analyze-backup.test.ts`
  - `src/lib/ai/bias-detection/__tests__/api-analyze.test.ts`
- [ ] Fix missing `resetRateLimits` export in API analyze module

### APIContext Type Usage

- [ ] Fix `Cannot find name 'APIContext'` throughout auth and middleware files
- [ ] Ensure proper APIContext type imports and usage

## Implementation Priority Guidelines

1. **Start with Module Resolution (Section 1)**: These block compilation entirely
2. **Address Type Definitions (Section 2)**: Core interface mismatches affect multiple files
3. **Fix Function Signatures (Section 3)**: Method calls with wrong parameters
4. **Resolve Array/Object Types (Section 4)**: Type inference and assignment issues
5. **Handle Null Safety (Section 5)**: Potential runtime errors
6. **Environment Variables (Section 6)**: Configuration and build issues
7. **Component Issues (Section 7)**: React/Astro specific problems
8. **Buffer/Encoding (Section 8)**: Node.js specific type issues
9. **Test Framework (Section 9)**: Development and testing infrastructure
10. **API Context (Section 10)**: Route handler and context type issues

## Notes

- Many issues stem from missing or incorrect type definitions
- Focus on bias detection module first as it has the most errors
- Environment variable access pattern needs standardization
- Test framework mock types need consistent approach (vi vs jest)
- Buffer operations need Node.js type compatibility fixes
