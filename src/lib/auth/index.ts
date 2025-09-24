export * from './middleware'
export { createSession, endSession, getSession } from './session'

import type { AstroCookies } from 'astro'
import type { User } from './index'

/**
 * Get the current user from AstroCookies
 */
export async function getCurrentUser(cookies: AstroCookies): Promise<User | null> {
  // Try to get the session token from cookies
  const token = cookies.get('auth-token')?.value
  if (!token) {
    return null
  }

  const sessionData = await getSession(token)
  if (!sessionData || !sessionData.user) {
    return null
  }

  return sessionData.user
}

/**
 * Check if the current user has the specified role
 */
export async function hasRole(cookies: AstroCookies, role: string): Promise<boolean> {
  const user = await getCurrentUser(cookies)
  if (!user) {
    return false
  }
  return user.role === role
}

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated(cookies: AstroCookies): Promise<boolean> {
  const user = await getCurrentUser(cookies)
  return !!user
}
export type { SessionData } from './session'
// Export authentication types and middleware
export * from './types'

// Export server-side auth functionality
export {
  verifyServerAuth,
  protectRoute,
  requirePageAuth,
  trackSuspiciousActivity,
} from './serverAuth'

import { createBuildSafeLogger } from '../logging/build-safe-logger'

const logger = createBuildSafeLogger('auth')

export interface User {
  id: string
  email: string
  name?: string
  role: 'user' | 'admin' | 'therapist' | 'patient'
  // Stored as a bcrypt hash in production
  password?: string
  verified: boolean
  createdAt: Date
  lastLoginAt?: Date
}

export interface AuthSession {
  userId: string
  sessionId: string
  expiresAt: Date
  isActive: boolean
  deviceInfo?: {
    userAgent: string
    ip: string
    location?: string
  }
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResult {
  success: boolean
  user?: User
  session?: AuthSession
  error?: string
  requiresVerification?: boolean
}

export interface PasswordResetRequest {
  email: string
  token: string
  expiresAt: Date
  used: boolean
}

/**
 * Authentication Service
 */
export class AuthService {
  private sessions = new Map<string, AuthSession>()
  private users = new Map<string, User>()
  private resetTokens = new Map<string, PasswordResetRequest>()

  constructor() {
    logger.info('AuthService initialized')
    // Initialize demo users asynchronously (fire-and-forget)
    void this.initializeMockUsers()
  }

  /**
   * Authenticate user with email and password
   */
  async authenticate(credentials: AuthCredentials): Promise<AuthResult> {
    try {
      logger.debug('Authenticating user', { email: credentials.email })

      const user = Array.from(this.users.values()).find(
        (u) => u.email === credentials.email,
      )

      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password',
        }
      }

      // Verify password using bcrypt
      if (!(await this.verifyPassword(credentials.password, user))) {
        return {
          success: false,
          error: 'Invalid email or password',
        }
      }

      if (!user.verified) {
        return {
          success: false,
          error: 'Email verification required',
          requiresVerification: true,
        }
      }

      // Create session
      const session = this.createSession(user.id)

      // Update last login
      user.lastLoginAt = new Date()

      logger.info('User authenticated successfully', {
        userId: user.id,
        email: user.email,
      })

      return {
        success: true,
        user,
        session,
      }
    } catch (error: unknown) {
      logger.error('Authentication failed', { error, email: credentials.email })
      return {
        success: false,
        error: 'Authentication failed',
      }
    }
  }

  /**
   * Create a new user account
   */
  async createUser(userData: {
    email: string
    password: string
    name?: string
    role?: User['role']
  }): Promise<AuthResult> {
    try {
      logger.debug('Creating new user', { email: userData.email })

      // Check if user already exists
      const existingUser = Array.from(this.users.values()).find(
        (u) => u.email === userData.email,
      )
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists',
        }
      }

      // Create new user
      // Hash password before storing
      const bcrypt = await import('bcryptjs')
      const hashed = await bcrypt.hash(userData.password, 12)

      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: userData.email,
        name: userData.name ?? '', // Ensure name is always a string
        role: userData.role || 'user',
        // Store bcrypt hash
        password: hashed,
        verified: false, // Requires email verification
        createdAt: new Date(),
      }

      this.users.set(user.id, user)

      logger.info('User created successfully', {
        userId: user.id,
        email: user.email,
      })

      return {
        success: true,
        user,
        requiresVerification: true,
      }
    } catch (error: unknown) {
      logger.error('User creation failed', { error, email: userData.email })
      return {
        success: false,
        error: 'Failed to create user account',
      }
    }
  }

  /**
   * Verify user session
   */
  async verifySession(sessionId: string): Promise<AuthResult> {
    try {
      const session = this.sessions.get(sessionId)

      if (!session || !session.isActive || session.expiresAt < new Date()) {
        return {
          success: false,
          error: 'Invalid or expired session',
        }
      }

      const user = this.users.get(session.userId)
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        }
      }

      return {
        success: true,
        user,
        session,
      }
    } catch (error: unknown) {
      logger.error('Session verification failed', { error, sessionId })
      return {
        success: false,
        error: 'Session verification failed',
      }
    }
  }

  /**
   * Logout user and invalidate session
   */
  async logout(sessionId: string): Promise<boolean> {
    try {
      const session = this.sessions.get(sessionId)
      if (session) {
        session.isActive = false
        logger.info('User logged out', { userId: session.userId, sessionId })
      }
      return true
    } catch (error: unknown) {
      logger.error('Logout failed', { error, sessionId })
      return false
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      const user = Array.from(this.users.values()).find(
        (u) => u.email === email,
      )
      if (!user) {
        // Don't reveal if email exists
        return true
      }

      const token = this.generateResetToken()
      const resetRequest: PasswordResetRequest = {
        email,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
        used: false,
      }

      this.resetTokens.set(token, resetRequest)

      logger.info('Password reset requested', { email, token })
      return true
    } catch (error: unknown) {
      logger.error('Password reset request failed', { error, email })
      return false
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const resetRequest = this.resetTokens.get(token)

      if (
        !resetRequest ||
        resetRequest.used ||
        resetRequest.expiresAt < new Date()
      ) {
        return false
      }

      const user = Array.from(this.users.values()).find(
        (u) => u.email === resetRequest.email,
      )
      if (!user) {
        return false
      }

      // Hash and set the new password
      const bcrypt = await import('bcryptjs')
      user.password = await bcrypt.hash(newPassword, 12)
      resetRequest.used = true

      logger.info('Password reset successfully', {
        userId: user.id,
        passwordLength: newPassword.length,
      })
      return true
    } catch (error: unknown) {
      logger.error('Password reset failed', { error, token })
      return false
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null
  }

  private createSession(userId: string): AuthSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const session: AuthSession = {
      userId,
      sessionId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
    }

    this.sessions.set(sessionId, session)
    return session
  }

  private async verifyPassword(password: string, user: User): Promise<boolean> {
    if (!user.password) return false
    try {
      const bcrypt = await import('bcryptjs')
      return await bcrypt.compare(password, user.password)
    } catch (_err) {
      logger.error('Password verification error', { error: _err })
      return false
    }
  }

  private generateResetToken(): string {
    return `reset_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`
  }

  private async initializeMockUsers() {
    // Create some demo users for testing
    const demoUsers: User[] = [
      {
        id: 'user_demo_admin',
        email: 'admin@pixelated.health',
        name: 'System Administrator',
        role: 'admin',
        verified: true,
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'user_demo_therapist',
        email: 'therapist@pixelated.health',
        name: 'Dr. Sarah Johnson',
        role: 'therapist',
        verified: true,
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 'user_demo_patient',
        email: 'patient@pixelated.health',
        name: 'John Doe',
        role: 'patient',
        verified: true,
        createdAt: new Date('2024-02-01'),
      },
    ]

    // Assign a default demo password for demo accounts and hash it
    const bcrypt = await import('bcryptjs')
    const defaultPassword = 'password123'
    await Promise.all(
      demoUsers.map(async (user) => {
        const hashed = await bcrypt.hash(defaultPassword, 12)
        user.password = hashed
        this.users.set(user.id, user)
      }),
    )

    logger.info('Demo users initialized', { count: demoUsers.length })
  }
}

// Default auth service instance
let authServiceInstance: AuthService | null = null

/**
 * Get the default auth service instance
 */
export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService()
  }
  return authServiceInstance
}

/**
 * Authenticate user
 */
export async function authenticate(
  credentials: AuthCredentials,
): Promise<AuthResult> {
  const authService = getAuthService()
  return authService.authenticate(credentials)
}

/**
 * Verify session
 */
export async function verifySession(sessionId: string): Promise<AuthResult> {
  const authService = getAuthService()
  return authService.verifySession(sessionId)
}

/**
 * Create new user
 */
export async function createUser(
  userData: Parameters<AuthService['createUser']>[0],
): Promise<AuthResult> {
  const authService = getAuthService()
  return authService.createUser(userData)
}

/**
 * Auth utility object for API routes
 */
export const auth = {
  verifySession,
  getCurrentUser,
  isAuthenticated,
  hasRole,
  authenticate,
  createUser,
}
export { requirePageAuth as requireAuth } from './serverAuth'
export { requirePageAuth as requireAuth } from './serverAuth'
