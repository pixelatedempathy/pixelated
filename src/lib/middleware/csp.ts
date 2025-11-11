import type { APIContext } from 'astro'

/**
 * Generate a random nonce using Web Crypto API (compatible with Cloudflare Workers)
 */
async function generateRandomNonce(): Promise<string> {
  // Use Web Crypto API which is available in both Node.js and Cloudflare Workers
  const array = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback for environments without crypto (shouldn't happen in production)
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  // Convert to base64 - use a method compatible with Cloudflare Workers
  // Convert Uint8Array to base64 string
  let binary = ''
  for (let i = 0; i < array.length; i++) {
    binary += String.fromCharCode(array[i])
  }
  return btoa(binary)
}

/**
 * Middleware to generate a CSP nonce for each request
 * This nonce will be used in the CSP header and in script tags
 */
export async function generateCspNonce(context: APIContext, next: any) {
  const { locals } = context
  // Generate a random nonce for this request using Web Crypto API
  const nonce = await generateRandomNonce()

  // Store the nonce in locals so it can be accessed by other middleware and components
  ;(locals as any).cspNonce = nonce

  // Return the result of calling next()
  return next()
}
