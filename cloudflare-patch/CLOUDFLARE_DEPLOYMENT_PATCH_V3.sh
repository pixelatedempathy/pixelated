#!/bin/bash
# Cloudflare Pages Deployment Patch v3.0
# Tested and working on 'q' branch
# Apply this to any branch to enable Cloudflare Pages deployment

set -e

echo "🚀 Applying Cloudflare Pages Deployment Patch v3.0..."

# 1. Create functions directory and middleware
echo "📁 Creating functions/_middleware.js..."
mkdir -p functions
cat > functions/_middleware.js << 'EOF'
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
EOF

# 2. Update astro.config.mjs adapter settings
echo "⚙️  Updating astro.config.mjs..."
if grep -q "mode: 'directory'" astro.config.mjs 2>/dev/null; then
  sed -i "s/mode: 'directory'/mode: 'advanced'/g" astro.config.mjs
  sed -i '/platformProxy:/,/}/d' astro.config.mjs
  sed -i '/mode: .advanced./a\    functionPerRoute: false' astro.config.mjs
  echo "✅ Updated adapter to advanced mode"
else
  echo "⚠️  Adapter already configured or not found"
fi

# 3. Add MessageChannel polyfill to src/middleware.ts (if not present)
echo "🔧 Checking src/middleware.ts..."
if [ -f "src/middleware.ts" ]; then
  if ! grep -q "MessageChannel" src/middleware.ts; then
    echo "Adding MessageChannel polyfill to middleware..."
    cat > /tmp/middleware_prefix.ts << 'EOF'
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

EOF
    cat /tmp/middleware_prefix.ts src/middleware.ts > /tmp/middleware_new.ts
    mv /tmp/middleware_new.ts src/middleware.ts
    echo "✅ Added polyfill to middleware"
  else
    echo "✅ Polyfill already present"
  fi
fi

# 4. Add prerender to static pages
echo "📄 Adding prerender exports to static pages..."
for page in src/pages/{index,about,features,contact,pricing,team,careers,demos,support,status,404}.astro; do
  if [ -f "$page" ]; then
    if ! grep -q "export const prerender" "$page"; then
      sed -i '1i export const prerender = true\n' "$page"
      echo "✅ Added prerender to $page"
    fi
  fi
done

# 5. Create deployment documentation
echo "📝 Creating CLOUDFLARE_DEPLOYMENT.md..."
cat > CLOUDFLARE_DEPLOYMENT.md << 'EOF'
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
EOF

echo ""
echo "✅ Cloudflare Pages Deployment Patch v3.0 Applied Successfully!"
echo ""
echo "📋 Summary:"
echo "  - Created functions/_middleware.js"
echo "  - Updated astro.config.mjs adapter"
echo "  - Added MessageChannel polyfill to middleware"
echo "  - Added prerender exports to static pages"
echo "  - Created CLOUDFLARE_DEPLOYMENT.md"
echo ""
echo "🚀 Next Steps:"
echo "  1. Review changes: git diff"
echo "  2. Test build: pnpm build"
echo "  3. Commit: git add . && git commit -m 'feat: Add Cloudflare Pages compatibility'"
echo "  4. Deploy to Cloudflare Pages"
echo ""
