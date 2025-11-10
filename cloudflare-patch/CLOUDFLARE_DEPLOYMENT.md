# Cloudflare Pages Deployment Guide

## Applied Changes

This branch has been patched for Cloudflare Pages compatibility.

### 1. Adapter Configuration
**File:** `astro.config.mjs`
```javascript
adapter: cloudflare({
  mode: 'advanced',
  functionPerRoute: false
})
```

### 2. MessageChannel Polyfill
**Files:** 
- `functions/_middleware.js` - Cloudflare Pages Functions middleware
- `src/middleware.ts` - Astro middleware

Polyfills MessageChannel for React SSR compatibility in Cloudflare Workers.

### 3. Static Page Prerendering
Added `export const prerender = true` to static pages:
- Homepage, About, Features, Contact
- Pricing, Team, Careers, Demos
- Support, Status, 404

### 4. Build Configuration
- Output: `server` (SSR enabled)
- Format: `directory`
- Advanced mode: Single `_worker.js` file

## Deployment Steps

1. **Build:**
   ```bash
   pnpm build
   ```

2. **Deploy to Cloudflare Pages:**
   - Build command: `pnpm build`
   - Build output: `dist`
   - Node version: 24+

3. **Environment Variables:**
   Set in Cloudflare Pages dashboard as needed.

## Troubleshooting

### MessageChannel Error
If you see "MessageChannel is not defined":
- Verify `functions/_middleware.js` exists
- Check polyfill is first in `src/middleware.ts`

### Build Errors
- Ensure Node.js 24+ is used
- Clear `.astro` cache: `rm -rf .astro`
- Rebuild: `pnpm build`

### Runtime Errors
- Check Cloudflare Pages Functions logs
- Verify adapter mode is 'advanced'
- Ensure functionPerRoute is false

## Patch Version
v3.0 - Tested on 'q' branch (2025-11-10)
