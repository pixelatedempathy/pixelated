/**
 * Shared p5.js loading utility to prevent duplication across components.
 * Uses a module-level variable to encapsulate the p5Promise.
 */
let p5Promise

/**
 * Resets the p5Promise, allowing p5.js to be reloaded.
 * Intended for use in testing/dev environments.
 */
export function resetP5Promise() {
  p5Promise = undefined
  console.log('[loadP5] p5Promise has been reset.')
}

/**
 * Shared p5.js loading utility to prevent duplication across components.
 */
export default function loadP5() {
  if (!p5Promise) {
    console.log('[loadP5] Creating new p5Promise')
    p5Promise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('p5.js can only be loaded in the browser'))
        return
      }
      if (window.p5) {
        console.log(
          '[loadP5] window.p5 already exists, resolving immediately.',
        )
        resolve(window.p5)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/p5@2.0.3/lib/p5.min.js'
      script.integrity =
        'sha384-+QwQ6Q0imeISFRCGDpa2BkLomqKgJo0vvArkH5AO9M/dwZ0pniS3pSkeCZMt2rtI'
      script.crossOrigin = 'anonymous'
      script.onload = () => {
        console.log(
          '[loadP5] p5.js loaded successfully with SRI and crossorigin.',
        )
        resolve(window.p5)
      }
      script.onerror = (event) => {
        console.error(
          '[loadP5] p5.js failed to load:',
          event,
          'script.src:',
          script.src,
          'event.target:',
          event?.target,
        )
        const src = event?.target?.src || script.src || 'unknown'
        reject(new Error(`[loadP5] Failed to load p5.js: ${src}`))
      }
      document.head.appendChild(script)
      console.log('[loadP5] Script tag injected:', script.src)
    })
    p5Promise.then(
      () => console.log('[loadP5] p5Promise resolved.'),
      (err) => console.error('[loadP5] p5Promise rejected:', err),
    )
  } else {
    console.log(
      '[loadP5] Returning existing p5Promise',
    )
  }
  return p5Promise
}

// TEST-ONLY: Reset function for test/dev environments to clear the state.
// Not intended for production use.
if (typeof window !== 'undefined') {
  window.__resetP5Promise = resetP5Promise
}
