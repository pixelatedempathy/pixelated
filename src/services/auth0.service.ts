/**
 * Auth0 Service for Pixelated Empathy Platform
 *
 * This service provides authentication functionality using Auth0 instead of the
 * previous MongoDB-based authentication system.
 */

import { AuthenticationClient, ManagementClient, UserInfoClient } from 'auth0';
import type { Db } from 'mongodb'
import { mongodb } from '../config/mongodb.config'
import { auth0MFAService } from '../lib/auth/auth0-mfa-service'
import { auth0WebAuthnService } from '../lib/auth/auth0-webauthn-service'
import type { MFAFactor, MFAEnrollment, MFAVerification } from '../lib/auth/auth0-mfa-service'
import type { WebAuthnCredential, WebAuthnRegistrationOptions, WebAuthnAuthenticationOptions } from '../lib/auth/auth0-webauthn-service'
import { logSecurityEvent, SecurityEventType } from '../lib/security/index'
import { auth0Config } from '../lib/auth/auth0-config'

// Initialize Auth0 clients
let auth0Management: ManagementClient | null = null
let auth0Authentication: AuthenticationClient | null = null
let auth0UserInfo: UserInfoClient | null = null

/**
 * Initialize Auth0 clients
 */
function initializeAuth0Clients() {
  const { domain, clientId, clientSecret, managementClientId, managementClientSecret } = auth0Config;

  if (!domain || !managementClientId || !managementClientSecret) {
    console.warn('Auth0 configuration is incomplete. Authentication features may not work.', { domain, managementClientId, managementClientSecret })
    return
  }

  if (!auth0Management) {
    auth0Management = new ManagementClient({
      domain: domain,
      clientId: managementClientId,
      clientSecret: managementClientSecret,
      audience: `https://${domain}/api/v2/`,
      scope: 'read:users update:users create:users delete:users read:roles update:roles'
    })
  }

  if (!auth0Authentication) {
    auth0Authentication = new AuthenticationClient({
      domain: domain,
      clientId: clientId,
      clientSecret: clientSecret
    })
  }

  if (!auth0UserInfo) {
    auth0UserInfo = new UserInfoClient({
      domain: domain,
    });
  }
}

/**
 * Reset Auth0 clients (for testing)
 */
export function resetAuth0ServiceClients() {
  auth0Management = null
  auth0Authentication = null
  auth0UserInfo = null
}

/**
 * Auth0 User Service Class
 */
export class Auth0UserService {
  private db: Db | null = null

  constructor() {
    // Initialize Auth0 clients
    initializeAuth0Clients()
  }

  /**
   * Connect to MongoDB for additional user data
   */
  private async connectToDatabase(): Promise<Db> {
    if (!this.db) {
      this.db = await mongodb.connect()
    }
    return this.db
  }

  /**
   * Sign in a user with email and password
   * @param email User email
   * @param password User password
   * @returns User and access token
   */
  async signIn(email: string, password: string) {
    if (!auth0Authentication || !auth0UserInfo) {
      throw new Error('Auth0 authentication client not initialized')
    }

    try {
      // Use Auth0's Resource Owner Password grant for direct authentication
      const { data } = await auth0Authentication.oauth.passwordGrant({
        username: email,
        password: password,
        realm: 'Username-Password-Authentication',
        audience: auth0Config.audience || `https://${auth0Config.domain}/api/v2/`,
        scope: 'openid profile email offline_access',
      });

      const { access_token, refresh_token, expires_in } = data;
      // Get user info
      const { data: userResponse } = await auth0UserInfo.getUserInfo(access_token);

      // Log security event
      await logSecurityEvent(SecurityEventType.LOGIN, {
        userId: userResponse.sub, // Auth0 v5 uses 'sub' for user ID in user info
        email: userResponse.email,
        method: 'password'
      })

      return {
        user: {
          id: userResponse.sub,
          email: userResponse.email,
          emailVerified: userResponse.email_verified,
          role: this.extractRoleFromUser(userResponse),
          fullName: userResponse.name,
          avatarUrl: userResponse.picture,
          createdAt: userResponse.created_at,
          lastLogin: userResponse.updated_at,
          appMetadata: userResponse['https://pixelatedempathy.com/app_metadata'], // Custom namespace
          userMetadata: userResponse['https://pixelatedempathy.com/user_metadata'] // Custom namespace
        },
        token: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      }
    } catch (error) {
      console.error('Auth0 sign in error:', error)
      throw new Error('Invalid credentials')
    }
  }

  /**
   * Create a new user
   * @param email User email
   * @param password User password
   * @param role User role
   * @returns Created user
   */
  async createUser(email: string, password: string, role: string = 'user') {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      // Create user in Auth0
      const { data: auth0User } = await auth0Management.users.create({
        connection: 'Username-Password-Authentication',
        email,
        password,
        email_verified: false,
        verify_email: true,
        app_metadata: {
          roles: [this.mapRoleToAuth0Role(role)],
          imported_from: 'manual_creation'
        },
        user_metadata: {
          role,
          created_at: new Date().toISOString()
        }
      });

      return {
        id: auth0User.user_id,
        email: auth0User.email,
        emailVerified: auth0User.email_verified,
        role,
        fullName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: auth0User.created_at,
        appMetadata: auth0User.app_metadata,
        userMetadata: auth0User.user_metadata
      }
    } catch (error) {
      console.error('Auth0 create user error:', error)
      throw new Error('Failed to create user')
    }
  }

  /**
   * Get user by ID
   * @param userId Auth0 user ID
   * @returns User object or null
   */
  async getUserById(userId: string) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      const { data: auth0User } = await auth0Management.users.get({ id: userId });

      return {
        id: auth0User.user_id,
        email: auth0User.email,
        emailVerified: auth0User.email_verified,
        role: this.extractRoleFromUser(auth0User),
        fullName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: auth0User.created_at,
        lastLogin: auth0User.last_login,
        appMetadata: auth0User.app_metadata,
        userMetadata: auth0User.user_metadata
      }
    } catch (error) {
      console.error('Auth0 get user error:', error)
      return null
    }
  }

  /**
   * Get all users (admin only)
   * @returns Array of user objects
   */
  async getAllUsers(): Promise<any[]> {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      const { data: users } = await auth0Management.users.getAll();
      return users.map(user => ({
        id: user.user_id,
        email: user.email,
        emailVerified: user.email_verified,
        role: this.extractRoleFromUser(user),
        fullName: user.name,
        avatarUrl: user.picture,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        appMetadata: user.app_metadata,
        userMetadata: user.user_metadata
      }))
    } catch (error) {
      console.error('Auth0 get all users error:', error)
      return []
    }
  }

  /**
   * Find user by email
   * @param email User email
   * @returns User object or null
   */
  async findUserByEmail(email: string) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      const { data: users } = await auth0Management.users.getAll({
        q: `email:"${email}"`,
        search_engine: 'v3'
      })

      if (users.length === 0) {
        return null
      }

      const auth0User = users[0]

      return {
        id: auth0User.user_id,
        email: auth0User.email,
        emailVerified: auth0User.email_verified,
        role: this.extractRoleFromUser(auth0User),
        fullName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: auth0User.created_at,
        lastLogin: auth0User.last_login,
        appMetadata: auth0User.app_metadata,
        userMetadata: auth0User.user_metadata
      }
    } catch (error) {
      console.error('Auth0 find user error:', error)
      return null
    }
  }

  /**
   * Update user profile
   * @param userId Auth0 user ID
   * @param updates User profile updates
   * @returns Updated user object or null
   */
  async updateUser(userId: string, updates: Record<string, unknown>) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      // Separate metadata updates
      const userUpdates: Record<string, unknown> = {}
      const userMetadataUpdates: Record<string, unknown> = {}
      const appMetadataUpdates: Record<string, unknown> = {}

      // Map fields to appropriate update objects
      for (const [key, value] of Object.entries(updates)) {
        switch (key) {
          case 'email':
          case 'email_verified':
          case 'blocked':
            userUpdates[key] = value
            break
          case 'role':
            // Update both user_metadata and app_metadata for role
            userMetadataUpdates.role = value
            if (typeof value === 'string') {
              appMetadataUpdates.roles = [this.mapRoleToAuth0Role(value)]
            }
            break
          default:
            // Add to user_metadata by default
            userMetadataUpdates[key] = value
            break
        }
      }

      // Update user in Auth0
      const updateParams: any = {}

      if (Object.keys(userUpdates).length > 0) {
        Object.assign(updateParams, userUpdates)
      }

      if (Object.keys(userMetadataUpdates).length > 0) {
        updateParams.user_metadata = userMetadataUpdates
      }

      if (Object.keys(appMetadataUpdates).length > 0) {
        updateParams.app_metadata = appMetadataUpdates
      }

      const { data: auth0User } = await auth0Management.users.update(
        { id: userId },
        updateParams
      )

      return {
        id: auth0User.user_id,
        email: auth0User.email,
        emailVerified: auth0User.email_verified,
        role: this.extractRoleFromUser(auth0User),
        fullName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: auth0User.created_at,
        lastLogin: auth0User.last_login,
        appMetadata: auth0User.app_metadata,
        userMetadata: auth0User.user_metadata
      }
    } catch (error) {
      console.error('Auth0 update user error:', error)
      return null
    }
  }

  /**
   * Assign a role to a user
   * @param userId Auth0 user id
   * @param role Internal role name
   */
  async assignRoleToUser(userId: string, role: string) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      // Get role ID from name
      const auth0RoleName = this.mapRoleToAuth0Role(role)

      // Get all roles to find the ID
      const { data: roles } = await auth0Management.roles.getAll()
      const targetRole = roles.find(r => r.name === auth0RoleName)

      if (!targetRole || !targetRole.id) {
        throw new Error(`Role ${auth0RoleName} not found in Auth0`)
      }

      await auth0Management.users.assignRoles(
        { id: userId },
        { roles: [targetRole.id] }
      )

      // Also update app_metadata for consistency
      await this.updateUser(userId, { role })

      // Log success
      await logSecurityEvent(SecurityEventType.ROLE_ASSIGNED, {
        userId,
        role,
        auth0RoleId: targetRole.id
      })
    } catch (error) {
      console.error('Auth0 assign role error:', error)
      throw new Error(`Failed to assign role ${role} to user ${userId}`)
    }
  }

  /**
   * Change user password
   * @param userId Auth0 user ID
   * @param newPassword New password
   */
  async changePassword(userId: string, newPassword: string) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      await auth0Management.users.update(
        { id: userId },
        { password: newPassword }
      )
    } catch (error) {
      console.error('Auth0 change password error:', error)
      throw new Error('Failed to change password')
    }
  }

  /**
   * Sign out user (invalidate refresh token)
   * @param refreshToken Refresh token to invalidate
   */
  async signOut(refreshToken: string) {
    if (!auth0Authentication) {
      throw new Error('Auth0 authentication client not initialized')
    }

    try {
      // Revoke refresh token
      await auth0Authentication.oauth.revokeRefreshToken({
        token: refreshToken
      })
    } catch (error) {
      console.error('Auth0 sign out error:', error)
      // Don't throw error for sign out - it's not critical
    }
  }

  /**
   * Refresh user session
   * @param refreshToken Refresh token
   * @returns New access token and user info
   */
  async refreshSession(refreshToken: string) {
    if (!auth0Authentication || !auth0UserInfo) {
      throw new Error('Auth0 authentication client not initialized')
    }

    try {
      // Exchange refresh token for new access token
      const { data } = await auth0Authentication.oauth.refreshTokenGrant({ refresh_token: refreshToken });

      const { access_token, expires_in } = data;

      // Get user info
      const { data: userResponse } = await auth0UserInfo.getUserInfo(access_token);

      return {
        user: {
          id: userResponse.sub,
          email: userResponse.email,
          emailVerified: userResponse.email_verified,
          role: this.extractRoleFromUser(userResponse),
          fullName: userResponse.name,
          avatarUrl: userResponse.picture,
          createdAt: userResponse.created_at,
          lastLogin: userResponse.updated_at,
          appMetadata: userResponse['https://pixelatedempathy.com/app_metadata'],
          userMetadata: userResponse['https://pixelatedempathy.com/user_metadata']
        },
        session: {
          accessToken: access_token,
          refreshToken: refreshToken,
          expiresAt: new Date(Date.now() + expires_in * 1000)
        },
        accessToken: access_token
      }
    } catch (error) {
      console.error('Auth0 refresh session error:', error)
      throw new Error('Failed to refresh session')
    }
  }

  /**
   * Verify authentication token
   * @param token JWT token
   * @returns User info from token
   */
  async verifyAuthToken(token: string) {
    if (!auth0UserInfo) {
      throw new Error('Auth0 user info client not initialized')
    }

    try {
      // Decode token to get user info
      const { data: decodedToken } = await auth0UserInfo.getUserInfo(token);

      return {
        userId: decodedToken.sub,
        email: decodedToken.email,
        role: this.extractRoleFromUser(decodedToken)
      }
    } catch (error) {
      console.error('Auth0 verify token error:', error)
      throw new Error('Invalid token')
    }
  }

  /**
   * Create password reset ticket
   * @param userId Auth0 user ID
   * @param returnUrl Return URL after reset
   * @returns Password reset ticket URL
   */
  async createPasswordResetTicket(userId: string, returnUrl?: string) {
    if (!auth0Management) {
      throw new Error('Auth0 management client not initialized')
    }

    try {
      const { data: ticket } = await auth0Management.tickets.changePassword({
        user_id: userId,
        result_url: returnUrl,
        ttl_sec: 3600 // 1 hour
      })

      return ticket.ticket
    } catch (error) {
      console.error('Auth0 create password reset ticket error:', error)
      throw new Error('Failed to create password reset ticket')
    }
  }

  /**
   * Get available MFA factors for a user
   * @param userId Auth0 user ID
   * @returns Array of available factor types
   */
  async getAvailableMFAFactors(userId: string): Promise<string[]> {
    return await auth0MFAService.getAvailableFactors(userId)
  }

  /**
   * Start MFA enrollment process
   * @param userId Auth0 user ID
   * @param factor MFA enrollment details
   * @returns MFA challenge information
   */
  async startMFAEnrollment(userId: string, factor: MFAEnrollment): Promise<any> {
    return await auth0MFAService.startEnrollment(userId, factor)
  }

  /**
   * Complete MFA enrollment process
   * @param userId Auth0 user ID
   * @param verification MFA verification details
   * @returns Enrolled MFA factor
   */
  async completeMFAEnrollment(userId: string, verification: MFAVerification): Promise<MFAFactor> {
    return await auth0MFAService.completeEnrollment(userId, verification)
  }

  /**
   * Get user's enrolled MFA factors
   * @param userId Auth0 user ID
   * @returns Array of enrolled MFA factors
   */
  async getUserMFAFactors(userId: string): Promise<MFAFactor[]> {
    return await auth0MFAService.getUserFactors(userId)
  }

  /**
   * Delete/disable a user's MFA factor
   * @param userId Auth0 user ID
   * @param factorId MFA factor ID
   */
  async deleteMFAFactor(userId: string, factorId: string): Promise<void> {
    await auth0MFAService.deleteFactor(userId, factorId)
  }

  /**
   * Challenge user for MFA during authentication
   * @param userId Auth0 user ID
   * @param factorType Type of factor to challenge
   * @returns MFA challenge information
   */
  async challengeUserForMFA(userId: string, factorType: string): Promise<any> {
    return await auth0MFAService.challengeUser(userId, factorType)
  }

  /**
   * Verify MFA challenge response
   * @param userId Auth0 user ID
   * @param verification MFA verification details
   * @returns Whether verification was successful
   */
  async verifyMFAChallenge(userId: string, verification: MFAVerification): Promise<boolean> {
    return await auth0MFAService.verifyChallenge(userId, verification)
  }

  /**
   * Check if user has MFA enabled
   * @param userId Auth0 user ID
   * @returns Whether user has MFA enabled
   */
  async userHasMFA(userId: string): Promise<boolean> {
    return await auth0MFAService.userHasMFA(userId)
  }

  /**
   * Get user's preferred MFA factor
   * @param userId Auth0 user ID
   * @returns User's preferred MFA factor or null
   */
  async getUserPreferredMFAFactor(userId: string): Promise<MFAFactor | null> {
    return await auth0MFAService.getUserPreferredFactor(userId)
  }

  /**
   * Set user's preferred MFA factor
   * @param userId Auth0 user ID
   * @param factorId MFA factor ID
   */
  async setUserPreferredMFAFactor(userId: string, factorId: string): Promise<void> {
    await auth0MFAService.setUserPreferredFactor(userId, factorId)
  }

  /**
   * Get WebAuthn registration options for a new credential
   * @param registrationOptions WebAuthn registration options
   * @returns WebAuthn credential creation options
   */
  async getWebAuthnRegistrationOptions(registrationOptions: WebAuthnRegistrationOptions): Promise<any> {
    return await auth0WebAuthnService.getRegistrationOptions(registrationOptions)
  }

  /**
   * Verify and register a new WebAuthn credential
   * @param userId Auth0 user ID
   * @param credential WebAuthn credential data
   * @returns Registered WebAuthn credential
   */
  async verifyWebAuthnRegistration(userId: string, credential: any): Promise<WebAuthnCredential> {
    return await auth0WebAuthnService.verifyRegistration(userId, credential)
  }

  /**
   * Get WebAuthn authentication options for an existing user
   * @param authenticationOptions WebAuthn authentication options
   * @returns WebAuthn credential request options
   */
  async getWebAuthnAuthenticationOptions(authenticationOptions: WebAuthnAuthenticationOptions): Promise<any> {
    return await auth0WebAuthnService.getAuthenticationOptions(authenticationOptions)
  }

  /**
   * Verify WebAuthn authentication response
   * @param userId Auth0 user ID
   * @param credential WebAuthn credential response
   * @returns Whether authentication was successful
   */
  async verifyWebAuthnAuthentication(userId: string, credential: any): Promise<boolean> {
    return await auth0WebAuthnService.verifyAuthentication(userId, credential)
  }

  /**
   * Get user's WebAuthn credentials
   * @param userId Auth0 user ID
   * @returns Array of registered WebAuthn credentials
   */
  async getUserWebAuthnCredentials(userId: string): Promise<WebAuthnCredential[]> {
    return await auth0WebAuthnService.getUserCredentials(userId)
  }

  /**
   * Delete a user's WebAuthn credential
   * @param userId Auth0 user ID
   * @param credentialId Credential ID to delete
   */
  async deleteWebAuthnCredential(userId: string, credentialId: string): Promise<void> {
    await auth0WebAuthnService.deleteCredential(userId, credentialId)
  }

  /**
   * Map internal role to Auth0 role name
   */
  private mapRoleToAuth0Role(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Administrator'
      case 'clinician':
        return 'Clinician'
      case 'supervisor':
        return 'Supervisor'
      case 'researcher':
        return 'Researcher'
      default:
        return 'Standard User'
    }
  }

  /**
   * Extract role from Auth0 user profile
   */
  private extractRoleFromUser(user: any): string {
    // Check custom namespace first
    const roles = user['https://pixelatedempathy.com/roles'] || 
                  user.app_metadata?.roles || 
                  user.user_metadata?.role

    if (!roles) return 'user'
    
    const roleList = Array.isArray(roles) ? roles : [roles]
    const primaryRole = roleList[0]?.toLowerCase()

    if (primaryRole === 'administrator' || primaryRole === 'admin') return 'admin'
    if (primaryRole === 'clinician') return 'clinician'
    if (primaryRole === 'supervisor') return 'supervisor'
    if (primaryRole === 'researcher') return 'researcher'
    
    return 'user'
  }
}

export const auth0UserService = new Auth0UserService()