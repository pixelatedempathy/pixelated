# Cloudflare Deployment Memory Limit Issue

## Problem
The Worker bundle exceeds Cloudflare Workers startup memory limits (error code 10021).

**Current bundle size:** 23MB uncompressed  
**Cloudflare Workers limit:** ~1MB compressed for startup code

## Root Causes
1. **Large dependencies in worker bundle:**
   - NotificationService: 5.1MB (includes axios, jsonwebtoken, crypto)
   - Data layer content: 5.0MB
   - Icon components: 1.6MB
   - WASM modules: 1.5MB
   - Manifest: 788KB

2. **All pages bundled into single worker** - 100+ routes in manifest

## Solutions (Choose One)

### Option 1: Use Cloudflare Pages (Recommended)
Cloudflare Pages has higher limits and is better suited for Astro SSR.

```bash
# Deploy to Pages instead of Workers
pnpm wrangler pages deploy dist --project-name=pixelated-empathy
```

**Benefits:**
- Higher bundle size limits
- Better Astro integration
- Automatic preview deployments
- Built-in analytics

### Option 2: Reduce Bundle Size
If you must use Workers, reduce the bundle:

1. **Lazy load heavy components:**
```typescript
// Instead of:
import { NotificationService } from './services/notification'

// Use:
const { NotificationService } = await import('./services/notification')
```

2. **Remove unused dependencies:**
- Remove axios (use native fetch)
- Remove jsonwebtoken (use Web Crypto API)
- Externalize MongoDB client
- Remove unused icon components

3. **Split into multiple workers:**
- Separate admin routes
- Separate API routes
- Use service bindings

### Option 3: Hybrid Rendering (Future)
Wait for Astro 5.x to support hybrid rendering, then prerender static pages.

## Applied Optimizations

Already applied in this PR:
- ✅ Disabled Sentry for production (reduces ~500KB)
- ✅ Disabled sourcemaps (reduces ~2MB)
- ✅ Aggressive minification with Terser
- ✅ Externalized heavy Node.js modules
- ✅ Lazy-loaded auth middleware
- ✅ Used Web Crypto API instead of Node crypto
- ✅ Aggressive code splitting

## Recommended Next Steps

1. **Switch to Cloudflare Pages** (easiest, recommended)
2. **Or** refactor NotificationService to use native APIs
3. **Or** split application into microservices

## Deployment Command

For Pages deployment:
```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN=your_token
export CLOUDFLARE_ACCOUNT_ID=your_account_id

# Deploy
pnpm build
pnpm wrangler pages deploy dist --project-name=pixelated-empathy --branch=main
```

## References
- [Cloudflare Workers Limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare Pages vs Workers](https://developers.cloudflare.com/pages/functions/)
- [Astro Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
