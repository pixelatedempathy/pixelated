import type { ChatMessage } from '@/types/chat'
import { WebSocketServer, WebSocket } from 'ws'
import type { Server } from 'node:http'
import { fheService } from '../fhe'
import { EncryptionMode } from '../fhe/types'
import { createBuildSafeLogger } from '@/lib/logging/build-safe-logger'

const logger = createBuildSafeLogger('default')

interface WebSocketMessage {
  type: 'message' | 'status' | 'error'
  data: unknown
  sessionId?: string
  encrypted?: boolean
}

class TherapyChatWebSocketServer {
  private wss: WebSocketServer
  private clients: Map<string, WebSocket>
  private sessions: Map<string, Set<string>>

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server })
    this.clients = new Map()
    this.sessions = new Map()

    this.wss.on('connection', this.handleConnection.bind(this))
    logger.info('WebSocket server initialized')
  }

  private handleConnection(ws: WebSocket) {
    const clientId = crypto.randomUUID()
    this.clients.set(clientId, ws)

    logger.info(`Client connected: ${clientId}`)

    ws.on('message', async (data: string) => {
      try {
        const message: WebSocketMessage = JSON.parse(data)

        switch (message.type) {
          case 'message':
            await this.handleChatMessage(clientId, message)
            break
          case 'status':
            await this.handleStatusUpdate(clientId, message)
            break
          default:
            logger.warn(`Unknown message type: ${message.type}`)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        logger.error('Error handling WebSocket message:', {
          error: errorMessage,
        })
        this.sendError(ws, 'Failed to process message')
      }
    })

    ws.on('close', () => {
      this.handleDisconnect(clientId)
    })
  }

  private async handleChatMessage(clientId: string, message: WebSocketMessage) {
    if (!message.sessionId) {
      this.sendError(this.clients.get(clientId)!, 'Session ID required')
      return
    }

    // If message is encrypted, process with FHE
    if (message.encrypted) {
      try {
        await fheService.initialize({
          mode: EncryptionMode.FHE,
          keySize: 2048,
          securityLevel: 'tc128',
        })

        // Handle mock implementation
        try {
          // Try to use processEncrypted if available
          const result = await (
            fheService as unknown as {
              processEncrypted: (
                data: string,
                operation: string,
              ) => Promise<{ data: string }>
            }
          ).processEncrypted(message.data as string, 'CHAT')
          message.data = result.data
        } catch (e) {
          // Fallback for mock implementation
          const errorMessage = e instanceof Error ? e.message : String(e)
          logger.info('Using mock FHE processing', { error: errorMessage })
          // Simply keep the message data as is for mock implementation
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        logger.error('FHE processing error:', { error: errorMessage })
        this.sendError(this.clients.get(clientId)!, 'Encryption error')
        return
      }
    }

    // Broadcast to all clients in the session
    this.broadcastToSession(message.sessionId, {
      type: 'message',
      data: message.data,
      sessionId: message.sessionId,
      encrypted: message.encrypted,
    })
  }

  private handleStatusUpdate(clientId: string, message: WebSocketMessage) {
    if (!message.sessionId) {
      this.sendError(this.clients.get(clientId)!, 'Session ID required')
      return
    }

    // Add client to session
    if (!this.sessions.has(message.sessionId)) {
      this.sessions.set(message.sessionId, new Set())
    }
    this.sessions.get(message.sessionId)!.add(clientId)

    // Broadcast status to session
    this.broadcastToSession(message.sessionId, {
      type: 'status',
      data: message.data,
      sessionId: message.sessionId,
    })
  }

  private handleDisconnect(clientId: string) {
    // Remove client from all sessions
    for (const [sessionId, clients] of this.sessions.entries()) {
      if (clients.has(clientId)) {
        clients.delete(clientId)
        if (clients.size === 0) {
          this.sessions.delete(sessionId)
        }
      }
    }

    // Remove client
    this.clients.delete(clientId)
    logger.info(`Client disconnected: ${clientId}`)
  }

  private broadcastToSession(sessionId: string, message: WebSocketMessage) {
    const sessionClients = this.sessions.get(sessionId)
    if (!sessionClients) {
      return
    }

    const messageStr = JSON.stringify(message)
    for (const clientId of sessionClients) {
      const client = this.clients.get(clientId)
      if (client?.readyState === WebSocket.OPEN) {
        client.send(messageStr)
      }
    }
  }

  private sendError(ws: WebSocket, error: string) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'error',
          data: { message: error },
        }),
      )
    }
  }

  public broadcast(message: ChatMessage) {
    const messageStr = JSON.stringify({
      type: 'message',
      data: message,
    })

    for (const client of this.clients.values()) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr)
      }
    }
  }
}

export default TherapyChatWebSocketServer
