# Cloudflare Pages Deployment Patch

This patch contains all fixes needed to deploy Astro + React to Cloudflare Pages.

## Quick Apply

```bash
# On any branch, apply these changes:
git cherry-pick 71ec47e1  # MessageChannel polyfill
git cherry-pick 2f401538  # Advanced mode config
git cherry-pick 56394f85  # AnimatedCounter fix
```

## Manual Application (if cherry-pick fails)

### 1. MessageChannel Polyfill (`src/middleware.ts`)

Add at the very top of the file:

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

### 2. Cloudflare Functions Middleware (`functions/_middleware.js`)

Create this file:

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

### 3. Astro Config (`astro.config.mjs`)

Update the adapter configuration:

```javascript
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'advanced',
    functionPerRoute: false
  }),
  // ... rest of config
})
```

### 4. AnimatedCounter Fix (`src/components/ui/AnimatedCounter.astro`)

Replace the value processing section:

```typescript
const { value, label, duration = 2000, suffix = '' } = Astro.props

// Ensure value is a string and handle placeholder values
const valueStr = String(value || '--')
const isPlaceholder = valueStr === '--' || !/\d/.test(valueStr)
const displayValue = valueStr
const numericValue = isPlaceholder ? 0 : parseInt(valueStr.replace(/[^\d]/g, '') || '0')
const hasPlus = valueStr.includes('+')
const hasPercent = valueStr.includes('%')
```

And update the script section to skip animation for placeholders:

```typescript
constructor(element: HTMLElement) {
  this.element = element
  this.target = parseInt(element.dataset.target || '0')
  this.duration = parseInt(element.dataset.duration || '2000')
  this.suffix = element.dataset.suffix || ''
  this.hasPlus = element.dataset.hasPlus === 'true'
  this.hasPercent = element.dataset.hasPercent === 'true'
  this.isPlaceholder = element.dataset.isPlaceholder === 'true'
  this.displayValue = element.dataset.displayValue || ''

  // Skip animation for placeholders
  if (!this.isPlaceholder) {
    this.setupIntersectionObserver()
  }
}
```

## Files Changed

1. `src/middleware.ts` - MessageChannel polyfill
2. `functions/_middleware.js` - Cloudflare Functions polyfill (NEW FILE)
3. `astro.config.mjs` - Adapter mode change
4. `src/components/ui/AnimatedCounter.astro` - Placeholder handling

## Testing

After applying:

```bash
pnpm build
# Should complete without errors

# Test locally with Wrangler (optional)
pnpm preview
```

## Why These Changes?

1. **MessageChannel Polyfill**: React SSR requires MessageChannel API which doesn't exist in Cloudflare Workers runtime
2. **Advanced Mode**: Generates single `_worker.js` file compatible with Cloudflare Pages Functions
3. **AnimatedCounter Fix**: Handles `--` placeholder values without trying to parse them as numbers

## Commit Hashes

- `71ec47e1` - MessageChannel polyfill for Workers
- `2f401538` - Advanced mode for Pages
- `56394f85` - AnimatedCounter robustness

## Rollback

If needed, revert in reverse order:

```bash
git revert 56394f85
git revert 2f401538
git revert 71ec47e1
```
