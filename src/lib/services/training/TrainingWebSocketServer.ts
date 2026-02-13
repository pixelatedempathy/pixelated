import { WebSocket, WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'
import { randomUUID } from 'crypto'
import { createBuildSafeLogger } from '../../logging/build-safe-logger'
import { validateToken } from '../../auth/jwt-service'
import type { UserRole } from '../../auth/roles'

const logger = createBuildSafeLogger('TrainingWebSocketServer')

/**
 * Training WebSocket Server - Real-time collaboration for clinical training sessions
 */

interface TrainingSessionClient {
  id: string
  ws: WebSocket
  sessionId?: string
  role: 'trainee' | 'observer' | 'supervisor'
  userId: string
  isAuthenticated: boolean
  authenticatedAt?: Date
}

interface ClientAuthResult {
  userId: string
  role: 'trainee' | 'observer' | 'supervisor'
}

interface WebSocketMessage {
  type: string
  payload: any
}

interface RateLimitBucket {
  tokens: number
  lastRefill: number
}

/**
 * Manages real-time training sessions with role-based permissions, moderation, and rate limiting.
 */
export class TrainingWebSocketServer {
  private wss: WebSocketServer
  private clients: Map<string, TrainingSessionClient> = new Map()
  private readonly AUTH_TIMEOUT_MS = 10000 // 10 seconds to authenticate

  // State for session management
  private sessionOwners: Map<string, string> = new Map() // sessionId -> userId
  private mutedUsers: Map<string, Set<string>> = new Map() // sessionId -> Set of userIds
  private bannedUsers: Map<string, Set<string>> = new Map() // sessionId -> Set of userIds
  private userBuckets: Map<string, RateLimitBucket> = new Map() // userId -> RateLimitBucket

  // Rate limiting configuration: 30 messages per minute
  private readonly MAX_TOKENS = 30
  private readonly REFILL_RATE_PER_MS = 30 / 60000

  constructor(port: number = 8084) {
    this.wss = new WebSocketServer({ port })

    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      this.handleConnection(ws, req)
    })

    logger.info('Training WebSocket Server started', { port })
  }

  /**
   * Initialize a new WebSocket connection and set up authentication
   */
  private handleConnection(ws: WebSocket, req: IncomingMessage) {
    const clientId = randomUUID()

    // Extract token from query string if present
    let initialToken: string | null = null
    try {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`)
      initialToken = url.searchParams.get('token')
    } catch (err) {
      logger.warn('Failed to parse connection URL', { error: err })
    }

    const client: TrainingSessionClient = {
      id: clientId,
      ws,
      userId: 'anonymous',
      role: 'trainee',
      isAuthenticated: false
    }

    this.clients.set(clientId, client)

    ws.on('message', (data: string) => {
      try {
        const message: WebSocketMessage = JSON.parse(data)
        this.handleMessage(ws, clientId, message)
      } catch (err) {
        logger.error('Failed to parse WebSocket message', { clientId, error: err })
      }
    })

    ws.on('close', () => {
      this.handleDisconnect(clientId)
    })

    // If token provided in URL, attempt immediate authentication
    if (initialToken) {
      this.attemptAuthentication(clientId, initialToken)
    }

    // Set authentication timeout
    setTimeout(() => {
      const c = this.clients.get(clientId)
      if (c && !c.isAuthenticated) {
        logger.warn('Client failed to authenticate within timeout', { clientId })
        this.sendError(ws, 'Authentication timeout')
        ws.close(1008, 'Authentication timeout')
        this.clients.delete(clientId)
      }
    }, this.AUTH_TIMEOUT_MS)
  }

  /**
   * Attempt to authenticate a client with the provided token
   */
  private async attemptAuthentication(clientId: string, token: string) {
    const client = this.clients.get(clientId)
    if (!client) return

    try {
      const authResult = await this.validateClient(token)

      if (authResult) {
        client.userId = authResult.userId
        client.role = authResult.role
        client.isAuthenticated = true
        client.authenticatedAt = new Date()

        logger.info('Client authenticated', {
          clientId,
          userId: authResult.userId,
          role: authResult.role
        })

        client.ws.send(JSON.stringify({
          type: 'authenticated',
          payload: {
            userId: authResult.userId,
            role: authResult.role
          }
        }))
      } else {
        logger.warn('Client authentication failed', { clientId })
        this.sendError(client.ws, 'Authentication failed: invalid token')
        client.ws.close(1008, 'Authentication failed')
        this.clients.delete(clientId)
      }
    } catch (err) {
      logger.error('Authentication error', { clientId, error: err })
      this.sendError(client.ws, 'Authentication error')
      client.ws.close(1008, 'Authentication error')
      this.clients.delete(clientId)
    }
  }

  /**
   * Validate client authentication token and return user info
   */
  private async validateClient(token: string): Promise<ClientAuthResult | null> {
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (isDevelopment) {
      return {
        userId: token || 'dev-user',
        role: 'trainee'
      }
    }

    try {
      const validationResult = await validateToken(token, 'access')

      if (!validationResult.valid || !validationResult.userId) {
        return null
      }

      const trainingRole = this.mapAuthRoleToTrainingRole(validationResult.role)
      return {
        userId: validationResult.userId,
        role: trainingRole
      }
    } catch (err) {
      logger.error('Token validation error', { error: err })
      return null
    }
  }

  /**
   * Map authentication UserRole to training session role
   */
  private mapAuthRoleToTrainingRole(authRole?: UserRole): 'trainee' | 'observer' | 'supervisor' {
    if (authRole === 'admin' || authRole === 'therapist') {
      return 'supervisor'
    }
    if (authRole === 'researcher' || authRole === 'support') {
      return 'observer'
    }
    return 'trainee'
  }

  /**
   * Send error message to client
   */
  private sendError(ws: WebSocket, message: string) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'error',
        payload: { message }
      }))
    }
  }

  /**
   * Main message router for incoming WebSocket messages
   */
  private handleMessage(ws: WebSocket, clientId: string, message: WebSocketMessage) {
    if (message.type === 'authenticate') {
      if (message.payload?.token) {
        this.attemptAuthentication(clientId, message.payload.token)
      }
      return
    }

    switch (message.type) {
      case 'join_session':
        this.handleJoinSession(ws, clientId, message.payload)
        break
      case 'session_message':
        this.handleSessionMessage(clientId, message.payload)
        break
      case 'coaching_note':
        this.handleCoachingNote(clientId, message.payload)
        break
      case 'mute_user':
        this.handleMuteUser(clientId, message.payload)
        break
      case 'ban_user':
        this.handleBanUser(clientId, message.payload)
        break
      default:
        logger.warn('Unknown message type', { type: message.type })
    }
  }

  /**
   * Check if a user is allowed to send a message based on rate limits
   * Uses Token Bucket algorithm for efficiency
   *
   * @param userId - User ID to check
   * @returns true if allowed, false if rate limited
   */
  private checkRateLimit(userId: string): boolean {
    const now = Date.now()
    let bucket = this.userBuckets.get(userId)

    if (!bucket) {
      bucket = { tokens: this.MAX_TOKENS, lastRefill: now }
      this.userBuckets.set(userId, bucket)
    } else {
      const delta = now - bucket.lastRefill
      const refill = delta * this.REFILL_RATE_PER_MS
      bucket.tokens = Math.min(this.MAX_TOKENS, bucket.tokens + refill)
      bucket.lastRefill = now
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1
      return true
    }

    return false
  }

  /**
   * Handle joining a training session, enforcing bans and assigning ownership
   */
  private handleJoinSession(ws: WebSocket, clientId: string, payload: { sessionId: string, role: 'trainee' | 'observer' | 'supervisor', userId: string }) {
    const client = this.clients.get(clientId)

    if (!client || !client.isAuthenticated) {
      this.sendError(ws, 'Authentication required to join session')
      return
    }

    // Check if user is banned from this session
    if (this.bannedUsers.get(payload.sessionId)?.has(client.userId)) {
      this.sendError(ws, 'You are banned from this session')
      ws.close(1008, 'Banned from session')
      return
    }

    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment && payload.role) {
      client.role = payload.role
    }
    if (isDevelopment && payload.userId) {
      client.userId = payload.userId
    }

    client.sessionId = payload.sessionId

    // Assign session owner if none exists (first trainee or supervisor to join)
    if (!this.sessionOwners.has(payload.sessionId)) {
      if (client.role === 'trainee' || client.role === 'supervisor') {
        this.sessionOwners.set(payload.sessionId, client.userId)
      }
    }

    this.broadcastToSession(payload.sessionId, {
      type: 'participant_joined',
      payload: { userId: client.userId, role: client.role }
    })

    ws.send(JSON.stringify({
      type: 'session_joined',
      payload: {
        sessionId: payload.sessionId,
        role: client.role,
        userId: client.userId
      }
    }))
  }

  /**
   * Implement checks to verify if a user is allowed to send messages in the training session.
   * - Verify user is a participant and not restricted (muted/banned)
   * - Enforce role-based permissions (Owner, Supervisor, Trainee)
   * - Rate limiting to prevent abuse
   */
  private handleSessionMessage(clientId: string, payload: { content: string, role: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) {
      return
    }

    const { sessionId, userId } = client

    // Security checks: verify user is not restricted
    if (this.bannedUsers.get(sessionId)?.has(userId)) {
      this.sendError(client.ws, 'You are banned from this session')
      return
    }

    if (this.mutedUsers.get(sessionId)?.has(userId)) {
      this.sendError(client.ws, 'You are muted in this session')
      return
    }

    // Role-based permission: Only owner, supervisors, or trainees can send regular messages
    const isOwner = this.sessionOwners.get(sessionId) === userId
    const isSupervisor = client.role === 'supervisor'
    const isTrainee = client.role === 'trainee'

    if (!isOwner && !isSupervisor && !isTrainee) {
      this.sendError(client.ws, 'Only the session owner, supervisors, or trainees can send messages')
      return
    }

    // Apply rate limiting
    if (!this.checkRateLimit(userId)) {
      this.sendError(client.ws, 'Rate limit exceeded. Please wait a moment.')
      return
    }

    // Broadcast chat message to everyone in the session
    this.broadcastToSession(sessionId, {
      type: 'session_message',
      payload: {
        userId,
        role: payload.role,
        content: payload.content,
        timestamp: new Date().toISOString()
      }
    })
  }

  /**
   * Handle coaching notes - restricted to supervisors and observers.
   * Trainees cannot receive or send coaching notes.
   */
  private handleCoachingNote(clientId: string, payload: { content: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) {
      return
    }

    const { sessionId, userId } = client

    // Security check: only supervisors and observers can send coaching notes
    if (client.role !== 'supervisor' && client.role !== 'observer') {
      logger.warn('Unauthorized coaching note attempt', { userId, role: client.role })
      return
    }

    if (this.bannedUsers.get(sessionId)?.has(userId) || this.mutedUsers.get(sessionId)?.has(userId)) {
      return
    }

    // Coaching notes are "hidden" from trainees - only observers and supervisors receive them
    this.broadcastToSessionRoles(
      sessionId,
      ['observer', 'supervisor'],
      {
        type: 'coaching_note',
        payload: {
          authorId: userId,
          content: payload.content,
          timestamp: new Date().toISOString()
        }
      }
    )
  }

  /**
   * Mute a user - restricted to supervisors or session owner
   *
   * @param clientId - ID of the client performing the action
   * @param payload - Action payload containing the target user ID
   */
  private handleMuteUser(clientId: string, payload: { targetUserId: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) return

    if (client.role !== 'supervisor' && this.sessionOwners.get(client.sessionId) !== client.userId) {
      this.sendError(client.ws, 'Only supervisors or the session owner can mute users')
      return
    }

    if (!this.mutedUsers.has(client.sessionId)) {
      this.mutedUsers.set(client.sessionId, new Set())
    }
    this.mutedUsers.get(client.sessionId)!.add(payload.targetUserId)

    this.broadcastToSession(client.sessionId, {
      type: 'user_muted',
      payload: { userId: payload.targetUserId, mutedBy: client.userId }
    })
  }

  /**
   * Ban a user - restricted to supervisors or session owner.
   * Banned users are disconnected and prevented from re-joining.
   *
   * @param clientId - ID of the client performing the action
   * @param payload - Action payload containing the target user ID
   */
  private handleBanUser(clientId: string, payload: { targetUserId: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) return

    if (client.role !== 'supervisor' && this.sessionOwners.get(client.sessionId) !== client.userId) {
      this.sendError(client.ws, 'Only supervisors or the session owner can ban users')
      return
    }

    if (!this.bannedUsers.has(client.sessionId)) {
      this.bannedUsers.set(client.sessionId, new Set())
    }
    this.bannedUsers.get(client.sessionId)!.add(payload.targetUserId)

    // Disconnect the banned user if they are currently connected to this session
    for (const c of this.clients.values()) {
      if (c.sessionId === client.sessionId && c.userId === payload.targetUserId) {
        this.sendError(c.ws, 'You have been banned from this session')
        c.ws.close(1008, 'Banned from session')
      }
    }

    this.broadcastToSession(client.sessionId, {
      type: 'user_banned',
      payload: { userId: payload.targetUserId, bannedBy: client.userId }
    })
  }

  /**
   * Handle client disconnect and clean up state.
   * If the last participant leaves, session-specific state is purged.
   */
  private handleDisconnect(clientId: string) {
    const client = this.clients.get(clientId)
    if (client) {
      const { sessionId, userId } = client

      if (sessionId) {
        this.broadcastToSession(sessionId, {
          type: 'participant_left',
          payload: { userId }
        })

        // Cleanup session state if it was the last participant
        const sessionStillActive = Array.from(this.clients.values()).some(
          c => c.id !== clientId && c.sessionId === sessionId
        )

        if (!sessionStillActive) {
          this.sessionOwners.delete(sessionId)
          this.mutedUsers.delete(sessionId)
          this.bannedUsers.delete(sessionId)
        }
      }

      // Cleanup rate limit bucket if no other connections for this user
      const otherConnectionsForUser = Array.from(this.clients.values()).some(
        c => c.id !== clientId && c.userId === userId
      )
      if (!otherConnectionsForUser) {
        this.userBuckets.delete(userId)
      }

      this.clients.delete(clientId)
    }
  }

  /**
   * Broadcast message to all clients in a session
   */
  private broadcastToSession(sessionId: string, message: WebSocketMessage) {
    for (const client of this.clients.values()) {
      if (client.sessionId === sessionId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message))
      }
    }
  }

  /**
   * Broadcast message to clients in a session, filtered by allowed roles
   */
  private broadcastToSessionRoles(
    sessionId: string,
    allowedRoles: Array<'trainee' | 'observer' | 'supervisor'>,
    message: WebSocketMessage
  ) {
    for (const client of this.clients.values()) {
      if (
        client.sessionId === sessionId &&
        client.ws.readyState === WebSocket.OPEN &&
        allowedRoles.includes(client.role)
      ) {
        client.ws.send(JSON.stringify(message))
      }
    }
  }

  /**
   * Close the WebSocket server and all connections
   */
  public close() {
    this.wss.close()
  }
}
