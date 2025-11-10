import type { APIContext } from 'astro'

/**
 * Middleware to generate a CSP nonce for each request
 * This nonce will be used in the CSP header and in script tags
 */
export async function generateCspNonce(context: APIContext, next: any) {
  const { locals } = context
  
  // Use Web Crypto API for Cloudflare Workers compatibility
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  const nonce = btoa(String.fromCharCode(...array))

  // Store the nonce in locals so it can be accessed by other middleware and components
  ;(locals as any).cspNonce = nonce

  // Return the result of calling next()
  return next()
}
