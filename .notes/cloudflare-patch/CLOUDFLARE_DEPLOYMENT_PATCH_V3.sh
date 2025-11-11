#!/bin/bash
# Cloudflare Pages Deployment Patch v3.0
# Tested and working on 'q' branch
# Apply this to any branch to enable Cloudflare Pages deployment

set -e

echo "🚀 Applying Cloudflare Pages Deployment Patch v3.0..."

# Get project root (script should be run from project root)
PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
cd "$PROJECT_ROOT"

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
CONFIG_FILE="astro.config.mjs"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "⚠️  astro.config.mjs not found, skipping adapter update"
else
  # Check if Cloudflare adapter is already imported and configured
  HAS_CLOUDFLARE_IMPORT=$(grep -q "@astrojs/cloudflare" "$CONFIG_FILE" && echo "yes" || echo "no")
  HAS_CLOUDFLARE_ADAPTER=$(grep -q "adapter:.*cloudflare" "$CONFIG_FILE" && echo "yes" || echo "no")
  HAS_ADVANCED_MODE=$(grep -q "mode:.*'advanced'" "$CONFIG_FILE" && echo "yes" || echo "no")
  HAS_FUNCTION_PER_ROUTE=$(grep -q "functionPerRoute:" "$CONFIG_FILE" && echo "yes" || echo "no")
  
  # If Cloudflare adapter is not configured, we need to add it
  if [ "$HAS_CLOUDFLARE_ADAPTER" = "no" ]; then
    echo "⚠️  Cloudflare adapter not found in astro.config.mjs"
    echo "   The adapter should be added by running: pnpm astro add cloudflare -y"
    echo "   This is usually done automatically by the apply script."
    echo "   Continuing with other patch steps..."
  else
    # Cloudflare adapter is configured, check if we need to update mode
    UPDATED=0
    
    if [ "$HAS_ADVANCED_MODE" = "no" ]; then
      # Check if mode: 'directory' exists and replace it
      if grep -q "mode: 'directory'" "$CONFIG_FILE" 2>/dev/null; then
        sed -i.bak "s/mode: 'directory'/mode: 'advanced'/g" "$CONFIG_FILE"
        echo "✅ Updated adapter mode from 'directory' to 'advanced'"
        rm -f "$CONFIG_FILE.bak"
        UPDATED=1
      elif grep -q 'mode: "directory"' "$CONFIG_FILE" 2>/dev/null; then
        sed -i.bak 's/mode: "directory"/mode: "advanced"/g' "$CONFIG_FILE"
        echo "✅ Updated adapter mode from 'directory' to 'advanced'"
        rm -f "$CONFIG_FILE.bak"
        UPDATED=1
      elif grep -q "adapter: cloudflare()" "$CONFIG_FILE"; then
        # Simple adapter: cloudflare() - replace with configuration using Node.js for reliability
        node -e "
const fs = require('fs');
let content = fs.readFileSync('$CONFIG_FILE', 'utf8');
content = content.replace(
  /adapter:\s*cloudflare\(\)/g,
  \`adapter: cloudflare({
    mode: 'advanced',
    functionPerRoute: false
  })\`
);
fs.writeFileSync('$CONFIG_FILE', content);
" 2>/dev/null && {
          echo "✅ Added advanced mode configuration to adapter"
          UPDATED=1
        } || {
          # Fallback to sed if node is not available
          echo "⚠️  Could not update adapter configuration automatically"
          echo "   Please manually update astro.config.mjs:"
          echo "   adapter: cloudflare({ mode: 'advanced', functionPerRoute: false })"
        }
      elif grep -q "adapter: cloudflare({" "$CONFIG_FILE"; then
        # Adapter config exists but no mode specified, add it after the opening brace
        # Use node to insert the configuration reliably
        node -e "
const fs = require('fs');
let content = fs.readFileSync('$CONFIG_FILE', 'utf8');
// Find adapter: cloudflare({ and add mode and functionPerRoute after it
content = content.replace(
  /adapter:\s*cloudflare\(\{/g,
  \`adapter: cloudflare({
    mode: 'advanced',
    functionPerRoute: false,\`
);
fs.writeFileSync('$CONFIG_FILE', content);
" 2>/dev/null && {
          echo "✅ Added mode: 'advanced' and functionPerRoute: false to adapter configuration"
          UPDATED=1
        } || {
          # Fallback: try to add after adapter line with sed
          LINE_NUM=$(grep -n "adapter: cloudflare({" "$CONFIG_FILE" | head -1 | cut -d: -f1)
          if [ -n "$LINE_NUM" ]; then
            sed -i.bak "${LINE_NUM}a\\
    mode: 'advanced',\\
    functionPerRoute: false," "$CONFIG_FILE"
            rm -f "$CONFIG_FILE.bak"
            echo "✅ Added mode: 'advanced' and functionPerRoute: false to adapter configuration"
            UPDATED=1
          fi
        }
      fi
    fi
    
    # Add functionPerRoute: false if not present and mode is advanced
    if [ "$HAS_FUNCTION_PER_ROUTE" = "no" ] && [ "$HAS_ADVANCED_MODE" = "yes" ]; then
      # Mode is advanced but functionPerRoute is missing, add it
      if grep -q "mode:.*'advanced'" "$CONFIG_FILE" || grep -q 'mode:.*"advanced"' "$CONFIG_FILE"; then
        sed -i.bak "/mode:.*advanced/a\    functionPerRoute: false," "$CONFIG_FILE"
        echo "✅ Added functionPerRoute: false"
        rm -f "$CONFIG_FILE.bak"
        UPDATED=1
      fi
    fi
    
    # Remove platformProxy if it exists (not needed for Cloudflare Pages)
    if grep -q "platformProxy:" "$CONFIG_FILE"; then
      # Remove platformProxy block using Node.js for reliability
      node -e "
const fs = require('fs');
let content = fs.readFileSync('$CONFIG_FILE', 'utf8');
// Remove platformProxy block (simple pattern matching)
content = content.replace(/platformProxy:\s*\{[^}]*\},?\s*/g, '');
fs.writeFileSync('$CONFIG_FILE', content);
" 2>/dev/null && {
          echo "✅ Removed platformProxy configuration"
          UPDATED=1
        } || {
          # Fallback: try to remove with sed (may not work for multiline)
          sed -i.bak '/platformProxy:/d' "$CONFIG_FILE"
          rm -f "$CONFIG_FILE.bak"
          echo "✅ Attempted to remove platformProxy configuration"
          UPDATED=1
        }
    fi
    
    if [ $UPDATED -eq 0 ] && [ "$HAS_ADVANCED_MODE" = "yes" ] && [ "$HAS_FUNCTION_PER_ROUTE" = "yes" ]; then
      echo "✅ Adapter already configured with advanced mode and functionPerRoute"
    fi
  fi
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
    rm -f /tmp/middleware_prefix.ts /tmp/middleware_new.ts
    echo "✅ Added polyfill to middleware"
  else
    echo "✅ Polyfill already present"
  fi
else
  echo "ℹ️  src/middleware.ts not found (optional for Cloudflare Pages)"
fi

# 4. Add prerender to static pages
echo "📄 Adding prerender exports to static pages..."
PAGES_DIR="src/pages"
PRERENDER_COUNT=0

if [ -d "$PAGES_DIR" ]; then
  # List of common static pages to prerender
  STATIC_PAGES=(
    "index.astro"
    "about.astro"
    "features.astro"
    "contact.astro"
    "pricing.astro"
    "team.astro"
    "careers.astro"
    "demos.astro"
    "support.astro"
    "status.astro"
    "404.astro"
  )
  
  for page in "${STATIC_PAGES[@]}"; do
    PAGE_PATH="$PAGES_DIR/$page"
    if [ -f "$PAGE_PATH" ]; then
      # Check if prerender export already exists
      if ! grep -q "export const prerender" "$PAGE_PATH"; then
        # Check if file has frontmatter (starts with ---)
        if head -n 1 "$PAGE_PATH" | grep -q "^---"; then
          # Find the first --- line and add prerender after it
          sed -i.bak '1a\
export const prerender = true;
' "$PAGE_PATH"
          rm -f "$PAGE_PATH.bak"
          PRERENDER_COUNT=$((PRERENDER_COUNT + 1))
          echo "✅ Added prerender to $page"
        fi
      fi
    fi
  done
  
  if [ $PRERENDER_COUNT -eq 0 ]; then
    echo "ℹ️  No static pages needed prerender exports (or they already have them)"
  fi
else
  echo "ℹ️  src/pages directory not found"
fi

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
- `src/middleware.ts` - Astro middleware (if present)

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
