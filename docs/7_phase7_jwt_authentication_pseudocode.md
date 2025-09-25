# Phase 7 JWT Authentication Service - Pseudocode

## 🎯 Module Overview
Implements secure JWT token generation, validation, and management with integration to existing Clerk infrastructure and Phase 6 MCP server tracking.

## 📋 Core Components

### 1. JWT Token Service
```typescript
// JWT Token Service - Core authentication logic
module JWTTokenService {
  
  // Generate access and refresh tokens for user
  function generateTokenPair(userId: string, role: UserRole, clientInfo: ClientInfo): TokenPair {
    // TEST: Generate valid token pair with correct structure
    // TEST: Include user claims and metadata
    // TEST: Set appropriate expiration times
    
    // Validate input parameters
    if (!userId || !role || !clientInfo) {
      throw new AuthenticationError('Invalid token generation parameters')
    }
    
    // Generate unique token identifiers
    const accessTokenId = generateSecureToken()
    const refreshTokenId = generateSecureToken()
    
    // Create access token payload
    const accessPayload = {
      sub: userId,
      role: role,
      type: 'access',
      jti: accessTokenId,
      iat: currentTimestamp(),
      exp: currentTimestamp() + config.accessTokenExpiry,
      aud: config.jwtAudience,
      iss: config.jwtIssuer,
      client: clientInfo
    }
    
    // Create refresh token payload
    const refreshPayload = {
      sub: userId,
      type: 'refresh',
      jti: refreshTokenId,
      iat: currentTimestamp(),
      exp: currentTimestamp() + config.refreshTokenExpiry,
      aud: config.jwtAudience,
      iss: config.jwtIssuer,
      accessTokenId: accessTokenId
    }
    
    // Sign tokens with secret key
    const accessToken = signJWT(accessPayload, config.jwtSecret)
    const refreshToken = signJWT(refreshPayload, config.jwtSecret)
    
    // Store token metadata in Redis for validation and revocation
    storeTokenMetadata(accessTokenId, {
      userId: userId,
      role: role,
      type: 'access',
      expiresAt: accessPayload.exp,
      clientInfo: clientInfo
    })
    
    storeTokenMetadata(refreshTokenId, {
      userId: userId,
      type: 'refresh',
      expiresAt: refreshPayload.exp,
      accessTokenId: accessTokenId
    })
    
    // Log authentication event for audit trail
    logSecurityEvent(SecurityEventType.TOKEN_CREATED, userId, {
      accessTokenId: accessTokenId,
      refreshTokenId: refreshTokenId,
      clientInfo: clientInfo
    })
    
    // Update Phase 6 MCP server with authentication progress
    updatePhase6AuthenticationProgress(userId, 'token_generated')
    
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenType: 'Bearer',
      expiresIn: config.accessTokenExpiry,
      user: {
        id: userId,
        role: role
      }
    }
  }
  
  // Validate and decode JWT token
  function validateToken(token: string, tokenType: TokenType): TokenValidationResult {
    // TEST: Validate valid token returns user info
    // TEST: Reject expired tokens with appropriate error
    // TEST: Reject tampered tokens with security error
    // TEST: Reject revoked tokens with authentication error
    
    try {
      // Verify token signature and decode
      const payload = verifyJWT(token, config.jwtSecret)
      
      // Validate token type matches expected
      if (payload.type !== tokenType) {
        throw new AuthenticationError(`Invalid token type: expected ${tokenType}, got ${payload.type}`)
      }
      
      // Check if token is expired
      if (payload.exp < currentTimestamp()) {
        throw new AuthenticationError('Token has expired')
      }
      
      // Check if token has been revoked
      if (isTokenRevoked(payload.jti)) {
        throw new AuthenticationError('Token has been revoked')
      }
      
      // Validate token metadata in Redis
      const tokenMetadata = getTokenMetadata(payload.jti)
      if (!tokenMetadata) {
        throw new AuthenticationError('Token metadata not found')
      }
      
      // Additional security checks
      validateTokenSecurity(payload, tokenMetadata)
      
      // Log successful validation
      logSecurityEvent(SecurityEventType.TOKEN_VALIDATED, payload.sub, {
        tokenId: payload.jti,
        tokenType: tokenType
      })
      
      return {
        valid: true,
        userId: payload.sub,
        role: payload.role,
        tokenId: payload.jti,
        expiresAt: payload.exp,
        payload: payload
      }
      
    } catch (error) {
      // Log validation failure
      logSecurityEvent(SecurityEventType.TOKEN_VALIDATION_FAILED, null, {
        error: error.message,
        tokenType: tokenType
      })
      
      throw error
    }
  }
  
  // Refresh access token using refresh token
  function refreshAccessToken(refreshToken: string, clientInfo: ClientInfo): TokenPair {
    // TEST: Valid refresh token generates new access token
    // TEST: Refresh token can only be used once
    // TEST: Old access token is revoked after refresh
    
    // Validate refresh token
    const validation = validateToken(refreshToken, 'refresh')
    
    if (!validation.valid) {
      throw new AuthenticationError('Invalid refresh token')
    }
    
    // Get refresh token metadata
    const refreshMetadata = getTokenMetadata(validation.tokenId)
    
    // Revoke the refresh token (single use)
    revokeToken(validation.tokenId, 'refresh_token_used')
    
    // Revoke associated access token
    if (refreshMetadata.accessTokenId) {
      revokeToken(refreshMetadata.accessTokenId, 'refresh_cycle')
    }
    
    // Generate new token pair
    const newTokenPair = generateTokenPair(validation.userId, validation.role, clientInfo)
    
    // Log token refresh event
    logSecurityEvent(SecurityEventType.TOKEN_REFRESHED, validation.userId, {
      oldTokenId: validation.tokenId,
      newAccessTokenId: extractTokenId(newTokenPair.accessToken),
      newRefreshTokenId: extractTokenId(newTokenPair.refreshToken)
    })
    
    // Update Phase 6 MCP server with refresh progress
    updatePhase6AuthenticationProgress(validation.userId, 'token_refreshed')
    
    return newTokenPair
  }
  
  // Revoke token and clean up
  function revokeToken(tokenId: string, reason: string): void {
    // TEST: Token revocation prevents future validation
    // TEST: Revocation reason is properly logged
    // TEST: Associated tokens are also revoked
    
    // Mark token as revoked in Redis
    markTokenRevoked(tokenId, reason)
    
    // Get token metadata for additional cleanup
    const metadata = getTokenMetadata(tokenId)
    
    if (metadata) {
      // Revoke related tokens if this is a refresh token
      if (metadata.accessTokenId) {
        markTokenRevoked(metadata.accessTokenId, 'linked_revocation')
      }
      
      // Log revocation event
      logSecurityEvent(SecurityEventType.TOKEN_REVOKED, metadata.userId, {
        tokenId: tokenId,
        reason: reason,
        tokenType: metadata.type
      })
      
      // Update Phase 6 MCP server with revocation progress
      updatePhase6AuthenticationProgress(metadata.userId, 'token_revoked')
    }
    
    // Clean up expired token metadata after revocation
    scheduleTokenCleanup(tokenId)
  }
  
  // Clean up expired and revoked tokens
  function cleanupExpiredTokens(): CleanupResult {
    // TEST: Expired tokens are removed from storage
    // TEST: Revoked tokens are cleaned up after grace period
    // TEST: Cleanup operation is logged
    
    const currentTime = currentTimestamp()
    let cleanedCount = 0
    
    // Get all token metadata keys
    const tokenKeys = getAllTokenKeys()
    
    for (const key of tokenKeys) {
      const metadata = getTokenMetadataByKey(key)
      
      if (metadata && shouldCleanupToken(metadata, currentTime)) {
        // Remove token metadata
        deleteTokenMetadata(key)
        cleanedCount++
        
        // Log cleanup event
        logSecurityEvent(SecurityEventType.TOKEN_CLEANED_UP, metadata.userId, {
          tokenId: metadata.id,
          reason: 'expired_cleanup'
        })
      }
    }
    
    return {
      cleanedTokens: cleanedCount,
      timestamp: currentTime,
      nextCleanup: calculateNextCleanupTime()
    }
  }
}
```

### 2. Clerk Integration Service
```typescript
// Clerk Integration Service - Bridge between JWT and Clerk
module ClerkIntegrationService {
  
  // Sync user data from Clerk to local authentication system
  function syncUserFromClerk(clerkUserId: string): UserAuthentication {
    // TEST: Successfully sync valid Clerk user
    // TEST: Handle non-existent Clerk user
    // TEST: Update existing user data
    
    // Fetch user data from Clerk
    const clerkUser = fetchClerkUser(clerkUserId)
    
    if (!clerkUser) {
      throw new AuthenticationError('Clerk user not found')
    }
    
    // Check if user already exists in local system
    const existingUser = getUserAuthenticationByClerkId(clerkUserId)
    
    if (existingUser) {
      // Update existing user data
      return updateUserAuthentication(existingUser.id, {
        email: clerkUser.email,
        role: mapClerkRoleToLocalRole(clerkUser.role),
        updatedAt: currentTimestamp()
      })
    } else {
      // Create new user authentication record
      const newUserAuth = createUserAuthentication({
        clerkUserId: clerkUserId,
        email: clerkUser.email,
        role: mapClerkRoleToLocalRole(clerkUser.role),
        authenticationStatus: AuthenticationStatus.UNAUTHENTICATED,
        createdAt: currentTimestamp(),
        updatedAt: currentTimestamp()
      })
      
      // Log new user creation
      logSecurityEvent(SecurityEventType.USER_CREATED, newUserAuth.id, {
        clerkUserId: clerkUserId,
        email: clerkUser.email,
        role: newUserAuth.role
      })
      
      // Update Phase 6 MCP server with user creation
      updatePhase6AuthenticationProgress(newUserAuth.id, 'user_created')
      
      return newUserAuth
    }
  }
  
  // Validate Clerk session and create JWT tokens
  function authenticateWithClerk(clerkSessionToken: string, clientInfo: ClientInfo): AuthenticationResult {
    // TEST: Valid Clerk session creates JWT tokens
    // TEST: Invalid Clerk session returns authentication error
    // TEST: Sync user data before token generation
    
    try {
      // Validate Clerk session token
      const clerkSession = validateClerkSession(clerkSessionToken)
      
      if (!clerkSession || !clerkSession.userId) {
        throw new AuthenticationError('Invalid Clerk session')
      }
      
      // Sync user data from Clerk
      const userAuth = syncUserFromClerk(clerkSession.userId)
      
      // Update authentication status
      updateUserAuthentication(userAuth.id, {
        authenticationStatus: AuthenticationStatus.AUTHENTICATED,
        lastLoginAt: currentTimestamp(),
        loginAttempts: 0,
        accountLockedUntil: null
      })
      
      // Generate JWT tokens
      const tokenPair = JWTTokenService.generateTokenPair(
        userAuth.id,
        userAuth.role,
        clientInfo
      )
      
      // Log successful authentication
      logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, userAuth.id, {
        clerkSessionId: clerkSession.sessionId,
        clientInfo: clientInfo
      })
      
      // Update Phase 6 MCP server with authentication success
      updatePhase6AuthenticationProgress(userAuth.id, 'login_success')
      
      return {
        success: true,
        user: userAuth,
        tokens: tokenPair,
        message: 'Authentication successful'
      }
      
    } catch (error) {
      // Log authentication failure
      logSecurityEvent(SecurityEventType.LOGIN_FAILURE, null, {
        error: error.message,
        clientInfo: clientInfo
      })
      
      // Update Phase 6 MCP server with authentication failure
      updatePhase6AuthenticationProgress(null, 'login_failure')
      
      throw error
    }
  }
  
  // Handle Clerk webhook events
  function handleClerkWebhook(eventType: string, eventData: Record<string, unknown>): void {
    // TEST: Process user.created webhook
    // TEST: Process user.updated webhook
    // TEST: Process user.deleted webhook
    
    switch (eventType) {
      case 'user.created':
        handleClerkUserCreated(eventData)
        break
        
      case 'user.updated':
        handleClerkUserUpdated(eventData)
        break
        
      case 'user.deleted':
        handleClerkUserDeleted(eventData)
        break
        
      case 'session.created':
        handleClerkSessionCreated(eventData)
        break
        
      case 'session.ended':
        handleClerkSessionEnded(eventData)
        break
        
      default:
        logSecurityEvent(SecurityEventType.UNHANDLED_WEBHOOK, null, {
          eventType: eventType,
          eventData: eventData
        })
    }
  }
}
```

### 3. Authentication Middleware
```typescript
// Authentication Middleware - Request authentication validation
module AuthenticationMiddleware {
  
  // Main authentication middleware function
  function authenticateRequest(request: Request, response: Response, next: NextFunction): void {
    // TEST: Valid token allows request to proceed
    // TEST: Missing token returns 401 Unauthorized
    // TEST: Invalid token returns 401 Unauthorized
    // TEST: Expired token returns 401 Unauthorized
    
    try {
      // Extract token from request
      const token = extractTokenFromRequest(request)
      
      if (!token) {
        return sendUnauthorizedResponse(response, 'No authentication token provided')
      }
      
      // Validate token
      const validation = JWTTokenService.validateToken(token, 'access')
      
      if (!validation.valid) {
        return sendUnauthorizedResponse(response, 'Invalid authentication token')
      }
      
      // Check if user account is in good standing
      const userAuth = getUserAuthentication(validation.userId)
      
      if (!userAuth || userAuth.authenticationStatus !== AuthenticationStatus.AUTHENTICATED) {
        return sendUnauthorizedResponse(response, 'User account is not authenticated')
      }
      
      // Check for account lockout or suspension
      if (userAuth.authenticationStatus === AuthenticationStatus.ACCOUNT_LOCKED) {
        return sendUnauthorizedResponse(response, 'Account is locked')
      }
      
      if (userAuth.authenticationStatus === AuthenticationStatus.SUSPENDED) {
        return sendUnauthorizedResponse(response, 'Account is suspended')
      }
      
      // Add user information to request context
      request.context.user = {
        id: validation.userId,
        role: validation.role,
        tokenId: validation.tokenId
      }
      
      // Log successful authentication
      logSecurityEvent(SecurityEventType.AUTHENTICATION_SUCCESS, validation.userId, {
        endpoint: request.path,
        method: request.method,
        ipAddress: getClientIp(request)
      })
      
      // Proceed to next middleware
      next()
      
    } catch (error) {
      // Log authentication failure
      logSecurityEvent(SecurityEventType.AUTHENTICATION_FAILURE, null, {
        error: error.message,
        endpoint: request.path,
        method: request.method,
        ipAddress: getClientIp(request)
      })
      
      return sendUnauthorizedResponse(response, 'Authentication failed')
    }
  }
  
  // Role-based authorization middleware
  function requireRole(requiredRole: UserRole) {
    return function(request: Request, response: Response, next: NextFunction): void {
      // TEST: User with required role proceeds
      // TEST: User without required role gets 403 Forbidden
      // TEST: Missing user context returns 401 Unauthorized
      
      const user = request.context.user
      
      if (!user) {
        return sendUnauthorizedResponse(response, 'User context not found')
      }
      
      // Check role hierarchy
      if (!hasRequiredRole(user.role, requiredRole)) {
        logSecurityEvent(SecurityEventType.PERMISSION_DENIED, user.id, {
          requiredRole: requiredRole,
          userRole: user.role,
          endpoint: request.path
        })
        
        return sendForbiddenResponse(response, 'Insufficient permissions')
      }
      
      next()
    }
  }
  
  // Permission-based authorization middleware
  function requirePermission(permission: Permission) {
    return function(request: Request, response: Response, next: NextFunction): void {
      // TEST: User with required permission proceeds
      // TEST: User without required permission gets 403 Forbidden
      // TEST: Check permission against user's role permissions
      
      const user = request.context.user
      
      if (!user) {
        return sendUnauthorizedResponse(response, 'User context not found')
      }
      
      // Check if user has required permission
      if (!hasPermission(user.role, permission)) {
        logSecurityEvent(SecurityEventType.PERMISSION_DENIED, user.id, {
          requiredPermission: permission,
          userRole: user.role,
          endpoint: request.path
        })
        
        return sendForbiddenResponse(response, 'Permission denied')
      }
      
      next()
    }
  }
  
  // Extract token from request headers
  function extractTokenFromRequest(request: Request): string | null {
    // TEST: Extract token from Authorization header
    // TEST: Extract token from query parameters (for WebSocket)
    // TEST: Return null if no token found
    
    // Check Authorization header first
    const authHeader = request.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7) // Remove 'Bearer ' prefix
    }
    
    // Check query parameters for WebSocket connections
    const tokenParam = request.query.token
    
    if (tokenParam && typeof tokenParam === 'string') {
      return tokenParam
    }
    
    return null
  }
}
```

## 🧪 TDD Anchors Summary

### Core Test Scenarios
1. **Token Generation**: Valid user credentials produce valid token pair
2. **Token Validation**: Valid tokens return correct user information
3. **Token Refresh**: Refresh tokens generate new access tokens
4. **Token Revocation**: Revoked tokens are rejected during validation
5. **Expired Tokens**: Expired tokens are rejected with appropriate error
6. **Clerk Integration**: Clerk session validation creates JWT tokens
7. **Middleware Authentication**: Valid tokens allow request processing
8. **Role-Based Access**: Users with correct roles pass authorization
9. **Permission Checks**: Users with required permissions access resources
10. **Security Events**: All authentication events are properly logged

### Edge Cases
1. **Invalid Token Format**: Malformed tokens are rejected
2. **Tampered Tokens**: Tokens with invalid signatures are rejected
3. **Missing Tokens**: Requests without tokens are unauthorized
4. **Revoked Tokens**: Previously valid revoked tokens are rejected
5. **Concurrent Refreshes**: Race conditions in token refresh handled
6. **Redis Failures**: Token validation continues with fallback
7. **Clerk Service Down**: Authentication fails gracefully
8. **Rate Limiting**: Authentication endpoints respect rate limits
9. **Account Lockout**: Locked accounts cannot authenticate
10. **Session Hijacking**: Token binding prevents session theft

---

*This pseudocode provides a complete implementation blueprint for the JWT authentication service, including integration with Clerk, Phase 6 MCP server tracking, and comprehensive security measures while maintaining HIPAA compliance.*