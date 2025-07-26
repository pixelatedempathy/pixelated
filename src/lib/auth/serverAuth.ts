import type { APIRoute } from 'astro'
import type { AstroCookies } from 'astro'
import type { AuthRole } from '../../config/auth.config'
import type { AuthUser } from '../auth'
import type { ProtectRouteOptions, AuthAPIContext } from './apiRouteTypes'
import { createBuildSafeLogger } from '@/lib/logging/build-safe-logger'
import { createResourceAuditLog, AuditEventType } from '../audit'
import { getCurrentUser, isAuthenticated } from '../auth'
import { RedisService } from '../services/redis/RedisService'
import { hasRolePrivilege } from '../../config/auth.config'

// Initialize services
const logger = createBuildSafeLogger('serverAuth')
const redisService = new RedisService()

// Rate limiting settings
const MAX_AUTH_ATTEMPTS = 5
const RATE_LIMIT_WINDOW = 60 * 15 // 15 minutes in seconds
const RATE_LIMIT_BLOCK_TIME = 60 * 60 // 1 hour in seconds

// Interface for the function parameters
interface ServerAuthOptions {
  cookies: AstroCookies
  request: Request
  requestIp: string
  requiredRole?: AuthRole
  validateIPMatch?: boolean
  validateUserAgent?: boolean
}

/**
 * Enhanced server-side auth check with additional security features
 */
export async function verifyServerAuth({
  cookies,
  request,
  requestIp,
  requiredRole,
  validateIPMatch = true,
  validateUserAgent = true,
}: ServerAuthOptions): Promise<{
  authenticated: boolean
  user: AuthUser | null
  reason?: string
}> {
  try {
    // Check if IP is rate limited
    const isRateLimited = await checkRateLimit(requestIp)
    if (isRateLimited) {
      logger.warn('Rate limit exceeded', { ip: requestIp })
      return { authenticated: false, user: null, reason: 'rate_limited' }
    }

    // Increment attempt counter
    await redisService.incr(`auth_attempts:${requestIp}`)
    await redisService.set(`auth_attempts:${requestIp}`, '', RATE_LIMIT_WINDOW)

    // Basic authentication check
    const authenticated = await isAuthenticated(cookies)
    if (!authenticated) {
      return { authenticated: false, user: null, reason: 'not_authenticated' }
    }

    // Get user details
    const user = await getCurrentUser(cookies)
    if (!user) {
      return { authenticated: false, user: null, reason: 'user_not_found' }
    }

    // If we require a specific role, check it
    if (requiredRole && !hasRolePrivilege(user.role, requiredRole)) {
      await createResourceAuditLog(
        AuditEventType.SERVER_AUTH_DENIED,
        user.id,
        { id: new URL(request.url).pathname, type: 'route' },
        {
          reason: 'insufficient_permissions',
          requiredRole,
          userRole: user.role,
        },
      )
      return { authenticated: false, user, reason: 'insufficient_permissions' }
    }

    // Validate IP match if enabled
    if (validateIPMatch) {
      const lastKnownIp = await redisService.get(`user_ip:${user.id}`)

      // If we have a last known IP and it doesn't match current IP
      if (lastKnownIp && lastKnownIp !== requestIp) {
        logger.warn('IP mismatch detected', {
          userId: user.id,
          previousIp: lastKnownIp,
          currentIp: requestIp,
        })

        // Log suspicious activity but don't block yet - this could be legitimate (VPN, network change)
        await createResourceAuditLog(
          AuditEventType.SUSPICIOUS_IP_CHANGE,
          user.id,
          { id: user.id, type: 'user' },
          {
            previousIp: lastKnownIp,
            currentIp: requestIp,
          },
        )
      }

      // Update the last known IP
      await redisService.set(`user_ip:${user.id}`, requestIp)
      await redisService.set(`user_ip:${user.id}`, requestIp, 60 * 60 * 24 * 7) // 7 days
    }

    // Validate user agent if enabled
    if (validateUserAgent) {
      const userAgent = request.headers.get('user-agent') || 'unknown'
      const lastUserAgent = await redisService.get(`user_agent:${user.id}`)

      // If we have a last known user agent and it doesn't match current one
      if (lastUserAgent && lastUserAgent !== userAgent) {
        logger.warn('User agent change detected', {
          userId: user.id,
          previousUserAgent: lastUserAgent,
          currentUserAgent: userAgent,
        })

        // Log suspicious activity but don't block
        await createResourceAuditLog(
          AuditEventType.SUSPICIOUS_USER_AGENT_CHANGE,
          user.id,
          { id: user.id, type: 'user' },
          {
            previousUserAgent: lastUserAgent,
            currentUserAgent: userAgent,
          },
        )
      }

      // Update the last known user agent
      await redisService.set(`user_agent:${user.id}`, userAgent)
      await redisService.set(
        `user_agent:${user.id}`,
        userAgent,
        60 * 60 * 24 * 7,
      ) // 7 days
    }

    // Reset attempt counter on successful auth
    await redisService.del(`auth_attempts:${requestIp}`)

    // Log successful authentication for auditing
    await createResourceAuditLog(
      AuditEventType.SERVER_AUTH_SUCCESS,
      user.id,
      { id: new URL(request.url).pathname, type: 'route' },
      {
        method: request.method,
        ip: requestIp,
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    )

    return { authenticated: true, user }
  } catch (error) {
    logger.error('Server auth error', {
      error: error instanceof Error ? error.message : String(error),
    })
    return { authenticated: false, user: null, reason: 'server_error' }
  }
}

/**
 * Check if an IP is rate limited
 */
async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    // Check if the IP is blocked
    const isBlocked = await redisService.exists(`auth_blocked:${ip}`)
    if (isBlocked) {
      return true
    }

    // Check attempt count
    const attempts = await redisService.get(`auth_attempts:${ip}`)
    const attemptCount = attempts ? parseInt(attempts, 10) : 0

    // If over threshold, block the IP
    if (attemptCount >= MAX_AUTH_ATTEMPTS) {
      await redisService.set(`auth_blocked:${ip}`, '1')
      await redisService.set(`auth_blocked:${ip}`, '1', RATE_LIMIT_BLOCK_TIME)

      // Log the rate limit event
      await createResourceAuditLog(
        AuditEventType.RATE_LIMIT_TRIGGERED,
        'system',
        { id: ip, type: 'ip_address' },
        {
          attempts: attemptCount,
          blockDuration: RATE_LIMIT_BLOCK_TIME,
        },
      )

      return true
    }

    return false
  } catch (error) {
    logger.error('Rate limit check error', {
      error: error instanceof Error ? error.message : String(error),
    })
    return false // Default to allowing on error
  }
}

/**
 * Authorization middleware for Astro pages
 * This replaces protectRouteWithContext for page-level protection
 */
export async function requirePageAuth(
  Astro: {
    request: Request
    cookies: AstroCookies
    redirect: (path: string) => Response
    locals?: Record<string, unknown>
  },
  requiredRole?: AuthRole,
): Promise<Response | void> {
  const { request, cookies } = Astro

  // Get the client IP
  const requestIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const { authenticated, user, reason } = await verifyServerAuth({
    cookies,
    request,
    requestIp,
    requiredRole,
  })

  if (!authenticated) {
    // Log the failed auth attempt
    logger.warn('Page auth denied', {
      path: new URL(request.url).pathname,
      reason,
      ip: requestIp,
    })

    // Redirect to login if not authenticated or forbidden if insufficient permissions
    const redirectUrl =
      reason === 'insufficient_permissions'
        ? '/forbidden'
        : `/login?redirect=${encodeURIComponent(request.url)}`

    return Astro.redirect(redirectUrl)
  }

  // Attach user to locals for consumption in the page
  if (Astro.locals) {
    Astro.locals.user = user
  }

  return
}

/**
 * Higher-order function to protect API routes with server-side auth
 * This is the new implementation that matches how it's used in most of the codebase
 */
export function protectRoute<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
>(
  options: ProtectRouteOptions = {},
): (
  handler: (
    context: AuthAPIContext<Props, Params>,
  ) => Response | Promise<Response>,
) => APIRoute {
  return (handler) => {
    const apiRouteHandler: APIRoute = async (context) => {
      const { request, cookies } = context

      // Get the client IP
      const requestIp =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown'

      try {
        // Check if IP is rate limited
        const isRateLimited = await checkRateLimit(requestIp)
        if (isRateLimited) {
          logger.warn('Rate limit exceeded', { ip: requestIp })
          return new Response(
            JSON.stringify({ error: 'Too many authentication attempts' }),
            {
              status: 429,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        // Increment attempt counter
        await redisService.incr(`auth_attempts:${requestIp}`)
        await redisService.set(
          `auth_attempts:${requestIp}`,
          '',
          RATE_LIMIT_WINDOW,
        )

        // Basic authentication check
        const authenticated = await isAuthenticated(cookies)
        if (!authenticated) {
          return new Response(
            JSON.stringify({ error: 'Authentication required' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        // Get user details
        const user = await getCurrentUser(cookies)
        if (!user) {
          return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        // If we require a specific role, check it
        if (
          options.requiredRole &&
          !hasRolePrivilege(user.role, options.requiredRole)
        ) {
          await createResourceAuditLog(
            AuditEventType.SERVER_AUTH_DENIED,
            user.id,
            { id: new URL(request.url).pathname, type: 'route' },
            {
              reason: 'insufficient_permissions',
              requiredRole: options.requiredRole,
              userRole: user.role,
            },
          )
          return new Response(
            JSON.stringify({ error: 'Insufficient permissions' }),
            {
              status: 403,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        // Validate IP match if enabled
        if (options.validateIPMatch !== false) {
          const lastKnownIp = await redisService.get(`user_ip:${user.id}`)

          // If we have a last known IP and it doesn't match current IP
          if (lastKnownIp && lastKnownIp !== requestIp) {
            logger.warn('IP mismatch detected', {
              userId: user.id,
              previousIp: lastKnownIp,
              currentIp: requestIp,
            })

            // Log suspicious activity but don't block yet - this could be legitimate (VPN, network change)
            await createResourceAuditLog(
              AuditEventType.SUSPICIOUS_IP_CHANGE,
              user.id,
              { id: user.id, type: 'user' },
              {
                previousIp: lastKnownIp,
                currentIp: requestIp,
              },
            )
          }

          // Update the last known IP
          await redisService.set(`user_ip:${user.id}`, requestIp)
          await redisService.set(
            `user_ip:${user.id}`,
            requestIp,
            60 * 60 * 24 * 7,
          ) // 7 days
        }

        // Validate user agent if enabled
        if (options.validateUserAgent !== false) {
          const userAgent = request.headers.get('user-agent') || 'unknown'
          const lastUserAgent = await redisService.get(`user_agent:${user.id}`)

          // If we have a last known user agent and it doesn't match current one
          if (lastUserAgent && lastUserAgent !== userAgent) {
            logger.warn('User agent change detected', {
              userId: user.id,
              previousUserAgent: lastUserAgent,
              currentUserAgent: userAgent,
            })

            // Log suspicious activity but don't block
            await createResourceAuditLog(
              AuditEventType.SUSPICIOUS_USER_AGENT_CHANGE,
              user.id,
              { id: user.id, type: 'user' },
              {
                previousUserAgent: lastUserAgent,
                currentUserAgent: userAgent,
              },
            )
          }

          // Update the last known user agent
          await redisService.set(`user_agent:${user.id}`, userAgent)
          await redisService.set(
            `user_agent:${user.id}`,
            userAgent,
            60 * 60 * 24 * 7,
          ) // 7 days
        }

        // Reset attempt counter on successful auth
        await redisService.del(`auth_attempts:${requestIp}`)

        // Log successful authentication for auditing
        await createResourceAuditLog(
          AuditEventType.SERVER_AUTH_SUCCESS,
          user.id,
          { id: new URL(request.url).pathname, type: 'route' },
          {
            method: request.method,
            ip: requestIp,
            userAgent: request.headers.get('user-agent') || 'unknown',
          },
        )

        // Create an auth context with the user
        const authContext = {
          ...context,
          locals: {
            ...context.locals,
            user,
          },
        } as unknown as AuthAPIContext<Props, Params>

        // Continue to the route handler
        return handler(authContext)
      } catch (error) {
        logger.error('Server auth error', {
          error: error instanceof Error ? error.message : String(error),
        })
        return new Response(
          JSON.stringify({ error: 'An unexpected error occurred' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }
    }

    return apiRouteHandler
  }
}

/**
 * Utility for monitoring and logging out suspicious activity
 */
export async function trackSuspiciousActivity(
  user: AuthUser,
  request: Request,
  reason: string,
): Promise<void> {
  const requestIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  await createResourceAuditLog(
    AuditEventType.SUSPICIOUS_ACTIVITY,
    user.id,
    { id: user.id, type: 'user' },
    {
      reason,
      ip: requestIp,
      userAgent: request.headers.get('user-agent') || 'unknown',
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    },
  )

  logger.warn('Suspicious activity detected', {
    userId: user.id,
    reason,
    ip: requestIp,
    url: request.url,
  })
}
