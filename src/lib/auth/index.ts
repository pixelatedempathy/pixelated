/**
 * Authentication Module - Main export for Phase 7 JWT Authentication Service
 * Provides complete authentication system with Better-Auth integration
 */

// JWT Service exports
export {
  generateTokenPair,
  validateToken,
  refreshAccessToken,
  revokeToken,
  cleanupExpiredTokens,
  measureTokenOperation,
  AuthenticationError,
} from './jwt-service'

export type {
  TokenPair,
  TokenValidationResult,
  ClientInfo,
  UserRole,
  TokenType,
} from './jwt-service'

// Better-Auth Integration exports
export {
  registerWithBetterAuth,
  authenticateWithBetterAuth,
  logoutFromBetterAuth,
  getUserAuthentication,
  getUserAuthenticationByBetterAuthId,
  updateUserAuthentication,
  validateJWTAndGetUser,
  hasRequiredRole,
  hasPermission,
  getBetterAuthInstance,
} from './better-auth-integration'

export type {
  UserAuthentication,
  AuthenticationResult,
  LoginCredentials,
  RegisterCredentials,
} from './better-auth-integration'

export { AuthenticationStatus } from './better-auth-integration'

// Middleware exports
export {
  authenticateRequest,
  requireRole,
  requirePermission,
  requireAnyRole,
  requireAnyPermission,
  requireAdmin,
  requireTherapistOrHigher,
  requireAuthenticated,
  optionalAuthentication,
  extractTokenFromRequest,
  getClientIp,
  getClientInfo,
  createAuthRateLimit,
  csrfProtection,
  securityHeaders,
  createAuthMiddlewareStack,
} from './middleware'

export type { AuthenticatedRequest, ClientInfo as MiddlewareClientInfo } from './middleware'

// Utility functions
export * from './utils'

// Configuration
export { getAuthConfig } from './config'

// Integration with Phase 6 MCP Server
export { updatePhase6AuthenticationProgress } from '../mcp/phase6-integration'

/**
 * Initialize authentication system
 */
export async function initializeAuthSystem(): Promise<void> {
  try {
    // Initialize Better-Auth database connection
    const { initializeBetterAuthDatabase } = await import('./better-auth-integration')
    await initializeBetterAuthDatabase()

    // Start token cleanup scheduler
    const { startTokenCleanupScheduler } = await import('./jwt-service')
    startTokenCleanupScheduler()

    console.log('✅ Authentication system initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize authentication system:', error)
    throw error
  }
}

/**
 * Create authentication API routes
 */
export async function createAuthRoutes() {
  const { Router } = await import('express')
  const router = Router()

  // Import route handlers
  const {
    handleRegister,
    handleLogin,
    handleLogout,
    handleRefreshToken,
    handleForgotPassword,
    handleResetPassword,
    handleVerifyEmail,
  } = await import('./routes')

  // Public routes
  router.post('/register', handleRegister)
  router.post('/login', handleLogin)
  router.post('/forgot-password', handleForgotPassword)
  router.post('/reset-password', handleResetPassword)
  router.post('/verify-email', handleVerifyEmail)

  // Protected routes
  router.post('/logout', requireAuthenticated, handleLogout)
  router.post('/refresh-token', handleRefreshToken)

  // User profile routes
  router.get('/profile', requireAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    const user = req.context?.user
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' })
    }

    const userAuth = getUserAuthentication(user.id)
    if (!userAuth) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    res.json({
      success: true,
      user: {
        id: userAuth.id,
        email: userAuth.email,
        role: userAuth.role,
        createdAt: userAuth.createdAt,
        lastLoginAt: userAuth.lastLoginAt,
      },
    })
  })

  return router
}

/**
 * Health check for authentication system
 */
export async function getAuthHealth(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy'
  details: {
    jwtService: boolean
    betterAuth: boolean
    redis: boolean
    database: boolean
  }
}> {
  try {
    const { checkRedisConnection } = await import('../redis')
    const { getBetterAuthInstance } = await import('./better-auth-integration')

    const [redisHealth, betterAuthHealth] = await Promise.allSettled([
      checkRedisConnection(),
      Promise.resolve(true), // Better-Auth health check would go here
    ])

    const details = {
      jwtService: true, // JWT service is stateless
      betterAuth: betterAuthHealth.status === 'fulfilled',
      redis: redisHealth.status === 'fulfilled' && redisHealth.value,
      database: true, // Database health would be checked here
    }

    const allHealthy = Object.values(details).every(health => health)
    
    return {
      status: allHealthy ? 'healthy' : 'degraded',
      details,
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      details: {
        jwtService: false,
        betterAuth: false,
        redis: false,
        database: false,
      },
    }
  }
}

/**
 * Export security event types for external use
 */
export { SecurityEventType } from '../security'

/**
 * Default export for convenience
 */
export default {
  initializeAuthSystem,
  createAuthRoutes,
  getAuthHealth,
  // Add all other exports for convenience
  ...module.exports,
}