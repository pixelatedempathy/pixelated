# Docker Build Import Alias Resolution Issue

## Problem
During Docker builds, certain import aliases (like `@/lib/api-client`) may not resolve properly, causing build failures with errors like:

```
[vite:load-fallback] Could not load /app/src/lib/api-client (imported by src/components/demo/CrisisDetectionDemo.tsx): ENOENT: no such file or directory, open '/app/src/lib/api-client'
```

## Root Cause
The issue appears to be related to module resolution differences between local development builds and Docker container builds. While the TypeScript and Vite configurations are set up correctly with path aliases, the containerized build environment may have different resolution behavior.

## Solution
For components in the `src/components/demo/` directory importing from `src/lib/`, use relative imports instead of path aliases:

### ❌ Before (problematic in Docker)
```typescript
import { apiClient, APIError } from '@/lib/api-client'
```

### ✅ After (works in Docker)
```typescript
import { apiClient, APIError } from '../../lib/api-client'
```

## Files Fixed
- `src/components/demo/CrisisDetectionDemo.tsx`
- `src/components/demo/ChatDemo.tsx`
- `src/components/demo/KnowledgeParsingDemo.tsx`

## Prevention
When creating new demo components, prefer relative imports for internal library dependencies to ensure compatibility with both local and Docker builds.

## Configuration Context
- TypeScript config: `"@/*": ["src/*"]` ✓
- Vite config: `'@': path.resolve(__dirname, 'src')` ✓
- Astro config: `'@': path.resolve('./src')` ✓

All configurations are correct, but Docker environment may still have resolution differences.
