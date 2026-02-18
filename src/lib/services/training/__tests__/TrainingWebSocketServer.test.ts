import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WebSocket, WebSocketServer } from 'ws'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

// Mock ws
vi.mock('ws', () => {
  const MockWebSocket = vi.fn(function() {
    this.on = vi.fn()
    this.send = vi.fn()
    this.close = vi.fn()
    this.readyState = 1 // OPEN
  })
  // @ts-ignore
  MockWebSocket.OPEN = 1
  // @ts-ignore
  MockWebSocket.CLOSED = 3

  const MockWebSocketServer = vi.fn(function() {
    this.on = vi.fn()
    this.close = vi.fn()
  })

  return {
    WebSocket: MockWebSocket,
    WebSocketServer: MockWebSocketServer,
  }
})

// Mock other dependencies
vi.mock('../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  }),
}))

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn(),
}))

describe('TrainingWebSocketServer', () => {
  let server: any
  const port = 8084

  beforeEach(() => {
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(port)
  })

  describe('handleCoachingNote', () => {
    it('should allow supervisor to send coaching note', () => {
      const clientId = 'client-1'
      const mockWs = new WebSocket('ws://localhost')
      // @ts-ignore
      mockWs.readyState = 1 // WebSocket.OPEN

      const client = {
        id: clientId,
        ws: mockWs,
        sessionId: 'session-1',
        role: 'supervisor' as const,
        userId: 'user-1',
        isAuthenticated: true
      }

      // Inject client into private map
      ;(server as any).clients.set(clientId, client)

      // Another client to receive the note
      const observerId = 'observer-1'
      const observerWs = new WebSocket('ws://localhost')
      // @ts-ignore
      observerWs.readyState = 1 // WebSocket.OPEN
      const observer = {
        id: observerId,
        ws: observerWs,
        sessionId: 'session-1',
        role: 'observer' as const,
        userId: 'user-2',
        isAuthenticated: true
      }
      ;(server as any).clients.set(observerId, observer)

      const payload = { content: 'Good job!' }
      ;(server as any).handleCoachingNote(clientId, payload)

      // Should broadcast to observer
      expect(observerWs.send).toHaveBeenCalledWith(expect.stringContaining('coaching_note'))
      expect(observerWs.send).toHaveBeenCalledWith(expect.stringContaining('Good job!'))
    })

    it('should allow observer to send coaching note', () => {
      const clientId = 'client-1'
      const mockWs = new WebSocket('ws://localhost')
      // @ts-ignore
      mockWs.readyState = 1 // WebSocket.OPEN

      const client = {
        id: clientId,
        ws: mockWs,
        sessionId: 'session-1',
        role: 'observer' as const,
        userId: 'user-1',
        isAuthenticated: true
      }

      ;(server as any).clients.set(clientId, client)

      const payload = { content: 'Observer note' }
      ;(server as any).handleCoachingNote(clientId, payload)

      // No error should be sent to sender if they are authorized
      expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))
    })

    it('should reject trainee from sending coaching note', () => {
      const clientId = 'client-1'
      const mockWs = new WebSocket('ws://localhost')
      // @ts-ignore
      mockWs.readyState = 1 // WebSocket.OPEN

      const client = {
        id: clientId,
        ws: mockWs,
        sessionId: 'session-1',
        role: 'trainee' as const,
        userId: 'user-1',
        isAuthenticated: true
      }

      ;(server as any).clients.set(clientId, client)

      const payload = { content: 'I am a trainee' }
      ;(server as any).handleCoachingNote(clientId, payload)

      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))
      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Only supervisors and observers'))
    })

    it('should reject empty content', () => {
      const clientId = 'client-1'
      const mockWs = new WebSocket('ws://localhost')
      // @ts-ignore
      mockWs.readyState = 1 // WebSocket.OPEN

      const client = {
        id: clientId,
        ws: mockWs,
        sessionId: 'session-1',
        role: 'supervisor' as const,
        userId: 'user-1',
        isAuthenticated: true
      }

      ;(server as any).clients.set(clientId, client)

      const payload = { content: '  ' }
      ;(server as any).handleCoachingNote(clientId, payload)

      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('content cannot be empty'))
    })
  })
})
