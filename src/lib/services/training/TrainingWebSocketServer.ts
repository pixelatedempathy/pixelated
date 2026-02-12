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

export class TrainingWebSocketServer {
  private wss: WebSocketServer
  private clients: Map<string, TrainingSessionClient> = new Map()
  private readonly AUTH_TIMEOUT_MS = 10000 // 10 seconds to authenticate
  private sessionOwners: Map<string, string> = new Map() // sessionId -> userId
  private mutedUsers: Map<string, Set<string>> = new Map() // sessionId -> Set of userIds
  private bannedUsers: Map<string, Set<string>> = new Map() // sessionId -> Set of userIds
  private messageRateLimits: Map<string, number[]> = new Map() // userId -> timestamps
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

    // If token provided in query string, attempt immediate authentication
    if (initialToken) {
      this.attemptAuthentication(id, initialToken)
    }

    // Set up authentication timeout
    const authTimeout = setTimeout(() => {
      const client = this.clients.get(id)
      if (client && !client.isAuthenticated) {
        logger.warn('Authentication timeout', { clientId: id })
        this.sendError(ws, 'Authentication timeout')
        ws.close(1008, 'Authentication timeout')
        this.clients.delete(id)
      }
    }, this.AUTH_TIMEOUT_MS)

    ws.on('message', (data: string) => {
      try {
        const message = JSON.parse(data) as WebSocketMessage
        if (message.type === 'authenticate') {
          this.attemptAuthentication(id, message.payload.token)
        } else {
          this.handleMessage(ws, id, message)
        }
      } catch (err) {
        logger.error('Failed to parse message', { error: err })
      }
    })

    ws.on('close', () => {
      clearTimeout(authTimeout)
      this.handleDisconnect(id)
    })

    ws.on('error', (err) => {
      logger.error('WebSocket error', { clientId: id, error: err })
      this.handleDisconnect(id)
    })
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
      if (!validationResult.valid || !validationResult.userId) return null
      const trainingRole = this.mapAuthRoleToTrainingRole(validationResult.role)
      return { userId: validationResult.userId, role: trainingRole }
    } catch (err) {
      logger.error('Token validation error', { error: err })
      return null
    }
  }

  private mapAuthRoleToTrainingRole(authRole?: UserRole): 'trainee' | 'observer' | 'supervisor' {
    if (authRole === 'admin' || authRole === 'therapist') return 'supervisor'
    if (authRole === 'researcher' || authRole === 'support') return 'observer'
    return 'trainee'
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

  private checkRateLimit(userId: string): boolean {
    const now = Date.now()
    const timestamps = this.messageRateLimits.get(userId) || []
    const oneMinuteAgo = now - 60000
    const recentTimestamps = timestamps.filter(ts => ts > oneMinuteAgo)

    if (recentTimestamps.length >= this.MAX_MESSAGES_PER_MINUTE) return false

    recentTimestamps.push(now)
    this.messageRateLimits.set(userId, recentTimestamps)
    return true
  }

  private handleJoinSession(ws: WebSocket, clientId: string, payload: { sessionId: string, role: 'trainee' | 'observer' | 'supervisor', userId: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.isAuthenticated) {
      this.sendError(ws, 'Authentication required to join session')
      return
    }

    if (this.bannedUsers.get(payload.sessionId)?.has(client.userId)) {
      this.sendError(ws, 'You are banned from this session')
      ws.close(1008, 'Banned from session')
      return
    }

    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment && payload.role) client.role = payload.role
    if (isDevelopment && payload.userId) client.userId = payload.userId

    client.sessionId = payload.sessionId

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
      payload: { sessionId: payload.sessionId, role: client.role, userId: client.userId }
    }))
  }

  private handleSessionMessage(clientId: string, payload: { content: string, role: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) return

    const { sessionId, userId } = client

    if (this.bannedUsers.get(sessionId)?.has(userId)) {
      this.sendError(client.ws, 'You are banned from this session')
      return
    }

    if (this.mutedUsers.get(sessionId)?.has(userId)) {
      this.sendError(client.ws, 'You are muted in this session')
      return
    }

    const isOwner = this.sessionOwners.get(sessionId) === userId
    const isSupervisor = client.role === 'supervisor'
    const isTrainee = client.role === 'trainee'

    if (!isOwner && !isSupervisor && !isTrainee) {
      this.sendError(client.ws, 'Only the session owner, supervisors, or trainees can send messages')
      return
    }

    if (!this.checkRateLimit(userId)) {
      this.sendError(client.ws, 'Rate limit exceeded. Please wait a moment.')
      return
    }

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

  private handleCoachingNote(clientId: string, payload: { content: string }) {
    const client = this.clients.get(clientId)
    if (!client || !client.sessionId || !client.isAuthenticated) return

    const { sessionId, userId } = client
    if (this.bannedUsers.get(sessionId)?.has(userId)) return
    if (this.mutedUsers.get(sessionId)?.has(userId)) return

    if (client.role !== 'supervisor' && client.role !== 'observer') return

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

  private handleDisconnect(clientId: string) {
    const client = this.clients.get(clientId)
    if (client) {
      const { sessionId, userId } = client

      if (sessionId) {
        this.broadcastToSession(sessionId, {
          type: 'participant_left',
          payload: { userId }
        })

        const sessionStillActive = Array.from(this.clients.values()).some(
          c => c.id !== clientId && c.sessionId === sessionId
        )

        if (!sessionStillActive) {
          this.sessionOwners.delete(sessionId)
          this.mutedUsers.delete(sessionId)
          this.bannedUsers.delete(sessionId)
        }
      }

      const otherConnectionsForUser = Array.from(this.clients.values()).some(
        c => c.id !== clientId && c.userId === userId
      )
      if (!otherConnectionsForUser) {
        this.messageRateLimits.delete(userId)
      }

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
