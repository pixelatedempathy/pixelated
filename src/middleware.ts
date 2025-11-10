import { generateCspNonce } from './lib/middleware/csp'
import { securityHeaders } from './lib/middleware/securityHeaders'
import { sequence, defineMiddleware } from 'astro:middleware'

// Simple route matcher for protected API routes
const protectedRoutePatterns: RegExp[] = [/\/api\/protected(.*)/]

function isProtectedRoute(request: Request) {
  try {
    const url = new URL(request.url)
    return protectedRoutePatterns.some((r) => r.test(url.pathname))
  } catch (_err) {
    return false
  }
}

/**
 * Lightweight auth middleware that defers session loading
 */
const projectAuthMiddleware = defineMiddleware(async (context, next) => {
  const { request } = context

  // Allow non-protected routes through quickly
  if (!isProtectedRoute(request)) {
    return next()
  }

  // Lazy load session utilities only when needed
  const { getSession } = await import('./lib/auth/session')
  
  try {
    const session = await getSession(request)
    if (!session) {
      const signInUrl = new URL('/auth/sign-in', request.url)
      signInUrl.searchParams.set('redirect', request.url)
      return new Response(null, {
        status: 302,
        headers: { Location: signInUrl.toString() },
      })
    }

    if (context.locals) {
      ;(context.locals as any).user = session.user
      ;(context.locals as any).session = session.session
    }
  } catch (_err) {
    const signInUrl = new URL('/auth/sign-in', request.url)
    signInUrl.searchParams.set('redirect', request.url)
    return new Response(null, {
      status: 302,
      headers: { Location: signInUrl.toString() },
    })
  }

  return next()
})

// Single, clean middleware sequence
export const onRequest = sequence(
  generateCspNonce as any,
  securityHeaders as any,
  projectAuthMiddleware as any,
)
