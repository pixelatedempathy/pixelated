# Cloudflare Pages Deployment Patch v3.0

**Status:** ✅ Tested and working on `q` branch  
**Date:** 2025-11-10  
**Compatibility:** Astro 5.x + Cloudflare Pages

---

## Quick Start

### Option 1: Automated Script (Recommended)

```bash
# Extract and run the patch script
tar -xzf cloudflare-pages-patch-v3.tar.gz
cd cloudflare-patch
./CLOUDFLARE_DEPLOYMENT_PATCH_V3.sh
```

### Option 2: Manual Application

1. **Create `functions/_middleware.js`:**
```javascript
// Polyfill MessageChannel for Cloudflare Workers - MUST BE FIRST
if (typeof MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {}, addEventListener: () => {}, removeEventListener: () => {} }
      this.port2 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {}, addEventListener: () => {}, removeEventListener: () => {} }
    }
  }
}

export async function onRequest(context) {
  return await context.next()
}
```

2. **Update `astro.config.mjs`:**
```javascript
adapter: cloudflare({
  mode: 'advanced',           // Changed from 'directory'
  functionPerRoute: false     // Single _worker.js file
})
```

3. **Add polyfill to `src/middleware.ts` (first lines):**
```typescript
// Polyfill MessageChannel for Cloudflare Workers (must be first)
if (typeof MessageChannel === 'undefined') {
  class MessagePortPolyfill {
    onmessage = null
    postMessage() {}
    start() {}
    close() {}
  }
  
  globalThis.MessageChannel = class MessageChannel {
    port1 = new MessagePortPolyfill()
    port2 = new MessagePortPolyfill()
  } as any
}
```

4. **Add prerender to static pages:**
```typescript
export const prerender = true
```
Add to: index, about, features, contact, pricing, team, careers, demos, support, status, 404

---

## What This Patch Fixes

### 1. MessageChannel Error
**Problem:** React SSR fails in Cloudflare Workers with "MessageChannel is not defined"  
**Solution:** Polyfill in both `functions/_middleware.js` and `src/middleware.ts`

### 2. Build Output
**Problem:** Directory mode creates multiple files incompatible with Pages Functions  
**Solution:** Advanced mode generates single `_worker.js` file

### 3. Performance
**Problem:** All pages rendered server-side increases worker load  
**Solution:** Prerender static pages at build time

---

## Files Included

```
cloudflare-pages-patch-v3.tar.gz
├── CLOUDFLARE_DEPLOYMENT_PATCH_V3.sh  (Automated patch script)
└── functions/_middleware.js            (MessageChannel polyfill)
```

---

## Deployment Configuration

### Cloudflare Pages Settings

**Build Configuration:**
- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: `/`

**Environment Variables:**
- Node version: `24` (or latest)
- Add any custom env vars as needed

---

## Verification Steps

1. **Test Build Locally:**
```bash
pnpm build
```

2. **Check for _worker.js:**
```bash
ls -la dist/_worker.js
```

3. **Verify Functions:**
```bash
ls -la functions/_middleware.js
```

4. **Deploy to Cloudflare Pages:**
```bash
# Via Cloudflare dashboard or CLI
wrangler pages deploy dist
```

---

## Troubleshooting

### Build Fails
- Clear cache: `rm -rf .astro node_modules/.vite`
- Reinstall: `pnpm install`
- Rebuild: `pnpm build`

### MessageChannel Still Undefined
- Verify `functions/_middleware.js` exists
- Check polyfill is FIRST in `src/middleware.ts`
- Ensure no other code runs before polyfill

### Pages Functions Not Working
- Verify adapter mode is `'advanced'`
- Check `functionPerRoute: false`
- Review Cloudflare Pages Functions logs

### Static Pages Not Prerendering
- Add `export const prerender = true` to page frontmatter
- Rebuild to regenerate static files
- Check `dist/` for `.html` files

---

## Applying to Other Branches

```bash
# Switch to target branch
git checkout <branch-name>

# Extract patch
tar -xzf cloudflare-pages-patch-v3.tar.gz

# Run patch script
cd cloudflare-patch
./CLOUDFLARE_DEPLOYMENT_PATCH_V3.sh

# Review changes
cd ..
git diff

# Commit
git add .
git commit -m "feat: Add Cloudflare Pages compatibility (patch v3.0)"

# Test
pnpm build

# Push
git push origin <branch-name>
```

---

## Differences from Previous Patches

### v3.0 (Current)
- ✅ Automated script for easy application
- ✅ Comprehensive documentation
- ✅ Tested on production branch
- ✅ Includes prerender optimization

### v2.0
- Manual patch file
- Required manual editing

### v1.0
- Basic MessageChannel polyfill only

---

## Support

**Tested On:**
- Branch: `q`
- Astro: 5.x
- Node: 24+
- Cloudflare Pages: Latest

**Known Working:**
- React SSR ✅
- Static page generation ✅
- API routes ✅
- Middleware ✅

---

## Changelog

**v3.0 (2025-11-10)**
- Automated patch script
- Comprehensive documentation
- Prerender optimization
- Tar archive distribution

**v2.0 (Previous)**
- Complete patch file
- Manual application

**v1.0 (Initial)**
- Basic polyfill only

---

**Created by:** Amazon Q (Qbert)  
**Tested on:** Pixelated Empathy `q` branch  
**Status:** Production Ready ✅
