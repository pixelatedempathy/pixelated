import { WebSocket, WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'
import { randomUUID } from 'crypto'
import { createBuildSafeLogger } from '../../logging/build-safe-logger'
import { validateToken } from '../../auth/jwt-service'
import type { UserRole } from '../../auth/roles'

const logger = createBuildSafeLogger('TrainingWebSocketServer')

/**
 * Training WebSocket Server - Real-time collaboration for clinical training sessions
 *
 * Authentication & Authorization:
 * - Production: Validates JWT access tokens using the platform's auth system
 * - Development: Bypasses authentication for local development/testing
 * - Role mapping: Maps platform UserRole (admin, therapist, etc.) to training roles
 *   - admin/therapist -> supervisor (can supervise and provide coaching notes)
 *   - researcher -> observer (can observe sessions)
 *   - patient/support/guest -> trainee (can participate in training)
 *
 * Security Features:
 * - Token validation with expiration and revocation checks
 * - Role-based access control for coaching notes (supervisor/observer only)
 * - Authentication timeout (10 seconds) to prevent unauthenticated connections
 * - Session-level message broadcasting with role filtering
 * - Session ownership tracking (trainee-led sessions)
 * - Rate limiting (30 messages per minute)
 * - User mute and ban enforcement
 *
 * Clients authenticate via:
 * - Query string: ?token=<jwt>
 * - First message: { type: 'authenticate', token: '<jwt>' }
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

export class TrainingWebSocketServer {
  private wss: WebSocketServer
  private clients: Map<string, TrainingSessionClient> = new Map()
  private readonly AUTH_TIMEOUT_MS = 10000 // 10 seconds to authenticate
  private sessionOwners: Map<string, string> = new Map()
  private mutedUsers: Map<string, Set<string>> = new Map()
  private bannedUsers: Map<string, Set<string>> = new Map()
  private messageCounts: Map<string, Map<string, { count: number, lastReset: number }>> = new Map()
  private sessionClientCounts: Map<string, number> = new Map()
  private readonly MAX_MESSAGES_PER_MINUTE = 30

  constructor(port: number) {
    this.wss = new WebSocketServer({ port })

    this.wss.on('connection', (ws, req) => {
      this.handleConnection(ws, req)
    })

    logger.info(`Training WebSocket Server started on port ${port}`)
  }

  private handleConnection(ws: WebSocket, req: IncomingMessage) {
    const id = randomUUID()

    // Extract token from query string if present
    let initialToken: string | null = null
    try {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`)
      initialToken = url.searchParams.get('token')
    } catch (err) {
      logger.warn('Failed to parse connection URL', { error: err })
    }

    // Initialize client as unauthenticated
    this.clients.set(id, {
      id,
      ws,
      role: 'trainee',
      userId: '',
      isAuthenticated: false
    })

    if (initialToken) {
      this.attemptAuthentication(id, initialToken)
    }

    const authTimeout = setTimeout(() => {
      const client = this.clients.get(id)
      if (client && !client.isAuthenticated) {
        logger.warn('Client failed to authenticate within timeout', { clientId: id })
        this.sendError(ws, 'Authentication timeout - connection closed')
        ws.close(1008, 'Authentication timeout')
        this.clients.delete(id)
      }
    }, this.AUTH_TIMEOUT_MS)

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString()) as WebSocketMessage

        if (message.type === 'authenticate') {
          clearTimeout(authTimeout)
          this.handleAuthenticateMessage(id, message.payload)
          return
        }

        const client = this.clients.get(id)
        if (!client || !client.isAuthenticated) {
          logger.warn('Unauthenticated client attempted to send message', {
            clientId: id,
            messageType: message.type
          })
          this.sendError(ws, 'Authentication required')
          return
        }

        this.handleMessage(ws, id, message)
      } catch (err) {
        logger.error('Failed to parse message', { error: err })
      }
    })

    ws.on('close', () => {
      clearTimeout(authTimeout)
      this.handleDisconnect(id)
    })
  }

  private handleAuthenticateMessage(clientId: string, payload: { token?: string }) {
    const client = this.clients.get(clientId)
    if (!client) return

    if (!payload.token) {
      logger.warn('Authentication message missing token', { clientId })
      this.sendError(client.ws, 'Authentication failed: token required')
      return
    }

    this.attemptAuthentication(clientId, payload.token)
  }

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

  private mapAuthRoleToTrainingRole(authRole?: UserRole): 'trainee' | 'observer' | 'supervisor' {
    if (authRole === 'admin' || authRole === 'therapist') {
      return 'supervisor'
    }
    if (authRole === 'researcher' || authRole === 'support') {
      return 'observer'
    }
    return 'trainee'
  }

  private isRateLimited(sessionId: string, userId: string): boolean {
    const now = Date.now()

    if (!this.messageCounts.has(sessionId)) {
      this.messageCounts.set(sessionId, new Map())
    }

    const sessionCounts = this.messageCounts.get(sessionId)!
    if (!sessionCounts.has(userId)) {
      sessionCounts.set(userId, { count: 1, lastReset: now })
      return false
    }

    const userData = sessionCounts.get(userId)!

    if (now - userData.lastReset > 60000) {
      userData.count = 1
      userData.lastReset = now
      return false
    }

    userData.count++
    return userData.count > this.MAX_MESSAGES_PER_MINUTE
  }

  private sendError(ws: WebSocket, message: string) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'error',
        payload: { message }
      }))
    }
  }

  private handleMessage(ws: WebSocket, clientId: string, message: WebSocketMessage) {
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
      default:
        logger.warn('Unknown message type', { type: message.type })
    }
  }

  private handleJoinSession(ws: WebSocket, clientId: string, payload: { sessionId: string, role: 'trainee' | 'observer' | 'supervisor', userId: string }) {
    const client = this.clients.get(clientId)

    if (!client || !client.isAuthenticated) {
      this.sendError(ws, 'Authentication required to join session')
      return
    }

    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment && payload.role) {
      client.role = payload.role
    }
    if (isDevelopment && payload.userId) {
      client.userId = payload.userId
    }

    const bannedInSession = this.bannedUsers.get(payload.sessionId)
    if (bannedInSession && bannedInSession.has(client.userId)) {
      this.sendError(ws, 'You are banned from this session')
      return
    }

    // Only trainees can become session owners
    if (!this.sessionOwners.has(payload.sessionId)) {
      if (client.role === 'trainee') {
        this.sessionOwners.set(payload.sessionId, client.userId)
        logger.info('Session owner assigned', {
          sessionId: payload.sessionId,
          userId: client.userId
        })
      }
    }

    client.sessionId = payload.sessionId
    this.sessionClientCounts.set(payload.sessionId, (this.sessionClientCounts.get(payload.sessionId) || 0) + 1)

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

  private handleSessionMessage(clientId: string, payload: { content: string, role: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) {
      return
    }

    const bannedInSession = this.bannedUsers.get(client.sessionId)
    if (bannedInSession && bannedInSession.has(client.userId)) {
      this.sendError(client.ws, 'You are banned from this session')
      return
    }

    const mutedInSession = this.mutedUsers.get(client.sessionId)
    if (mutedInSession && mutedInSession.has(client.userId)) {
      this.sendError(client.ws, 'You are muted in this session')
      return
    }

    const ownerId = this.sessionOwners.get(client.sessionId)
    const isOwner = ownerId === client.userId
    const isSupervisor = client.role === 'supervisor'

    if (!isOwner && !isSupervisor) {
      this.sendError(client.ws, 'Only the session owner or a supervisor can send messages')
      return
    }

    if (this.isRateLimited(client.sessionId, client.userId)) {
      this.sendError(client.ws, 'Rate limit exceeded. Please wait a moment.')
      return
    }

    this.broadcastToSession(client.sessionId, {
      type: 'session_message',
      payload: {
        userId: client.userId,
        role: payload.role,
        content: payload.content,
        timestamp: new Date().toISOString()
      }
    })
  }

  private handleCoachingNote(clientId: string, payload: { content: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) {
      return
    }

    const bannedInSession = this.bannedUsers.get(client.sessionId)
    if (bannedInSession && bannedInSession.has(client.userId)) {
      this.sendError(client.ws, 'You are banned from this session')
      return
    }

    if (client.role !== 'supervisor' && client.role !== 'observer') {
      return
    }

    this.broadcastToSessionRoles(
      client.sessionId,
      ['observer', 'supervisor'],
      {
        type: 'coaching_note',
        payload: {
          authorId: client.userId,
          content: payload.content,
          timestamp: new Date().toISOString()
        }
      }
    )
  }

  private handleDisconnect(clientId: string) {
    const client = this.clients.get(clientId)
    if (client && client.sessionId) {
      const sessionId = client.sessionId
      this.broadcastToSession(sessionId, {
        type: 'participant_left',
        payload: { userId: client.userId }
      })

      // If the owner is leaving, clear ownership and try to transfer to another trainee
      if (this.sessionOwners.get(sessionId) === client.userId) {
        this.sessionOwners.delete(sessionId)
        for (const c of this.clients.values()) {
          if (c.id !== clientId && c.sessionId === sessionId && c.role === 'trainee') {
            this.sessionOwners.set(sessionId, c.userId)
            break
          }
        }
      }

      this.clients.delete(clientId)

      const currentCount = this.sessionClientCounts.get(sessionId) || 0
      const newCount = Math.max(0, currentCount - 1)
      if (newCount > 0) {
        this.sessionClientCounts.set(sessionId, newCount)
      } else {
        this.sessionClientCounts.delete(sessionId)
        this.sessionOwners.delete(sessionId)
        this.mutedUsers.delete(sessionId)
        this.bannedUsers.delete(sessionId)
        this.messageCounts.delete(sessionId)
        logger.info('Cleaning up empty session', { sessionId })
      }
    } else {
      this.clients.delete(clientId)
    }
  }

  private broadcastToSession(sessionId: string, message: WebSocketMessage) {
    for (const client of this.clients.values()) {
      if (client.sessionId === sessionId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message))
      }
    }
  }

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

  public close() {
    this.wss.close()
  }
}
