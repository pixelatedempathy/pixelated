import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { WebSocket, WebSocketServer } from 'ws'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

// Mock dependencies
vi.mock('ws', () => {
  const mockServer = {
    on: vi.fn(),
    close: vi.fn(),
    clients: new Set(),
  }

  const mockWebSocket = vi.fn(function() {
    return {
      on: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1,
    }
  })

  // @ts-ignore
  mockWebSocket.OPEN = 1
  // @ts-ignore
  mockWebSocket.CLOSED = 3

  return {
    WebSocketServer: vi.fn(function() { return mockServer }),
    WebSocket: mockWebSocket,
  }
})

vi.mock('../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
}))

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn().mockResolvedValue({ valid: true, userId: 'test-user', role: 'therapist' }),
}))

vi.mock('crypto', async (importOriginal) => {
  const actual = await importOriginal() as any
  return {
    ...actual,
    default: actual,
    randomUUID: vi.fn().mockReturnValue('test-client-id'),
  }
})

describe('TrainingWebSocketServer', () => {
  let server: TrainingWebSocketServer

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NODE_ENV = 'production'
    server = new TrainingWebSocketServer(8084)
  })

  afterEach(() => {
    server.close()
  })

  describe('Session Ownership & Joining', () => {
    it('should assign session owner to the first trainee', async () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'

      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: 'trainee-1',
        role: 'trainee',
        isAuthenticated: true,
      })

      ;(server as any).handleJoinSession(mockWs, clientId, {
        sessionId: 'session-1',
        role: 'trainee',
        userId: 'trainee-1'
      })

      const sessionOwners = (server as any).sessionOwners
      expect(sessionOwners.get('session-1')).toBe('trainee-1')
    })

    it('should NOT assign session owner to a supervisor', async () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'

      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: 'supervisor-1',
        role: 'supervisor',
        isAuthenticated: true,
      })

      ;(server as any).handleJoinSession(mockWs, clientId, {
        sessionId: 'session-1',
        role: 'supervisor',
        userId: 'supervisor-1'
      })

      const sessionOwners = (server as any).sessionOwners
      expect(sessionOwners.has('session-1')).toBe(false)
    })

    it('should allow a trainee to take ownership if a supervisor joined first', async () => {
      const mockWs1 = new WebSocket('ws://localhost') as any
      const mockWs2 = new WebSocket('ws://localhost') as any
      const clients = (server as any).clients

      // Supervisor joins first
      clients.set('c1', { id: 'c1', ws: mockWs1, userId: 's1', role: 'supervisor', isAuthenticated: true })
      ;(server as any).handleJoinSession(mockWs1, 'c1', { sessionId: 'session-1', role: 'supervisor', userId: 's1' })
      expect((server as any).sessionOwners.has('session-1')).toBe(false)

      // Trainee joins second
      clients.set('c2', { id: 'c2', ws: mockWs2, userId: 't1', role: 'trainee', isAuthenticated: true })
      ;(server as any).handleJoinSession(mockWs2, 'c2', { sessionId: 'session-1', role: 'trainee', userId: 't1' })
      expect((server as any).sessionOwners.get('session-1')).toBe('t1')
    })

    it('should not allow banned users to join', async () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'banned-user'

      ;(server as any).bannedUsers.set(sessionId, new Set([userId]))

      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'trainee',
        isAuthenticated: true,
      })

      ;(server as any).handleJoinSession(mockWs, clientId, {
        sessionId,
        role: 'trainee',
        userId
      })

      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('banned'))
      const client = clients.get(clientId)
      expect(client.sessionId).toBeUndefined()
    })
  })

  describe('Message Permissions', () => {
    it('should allow session owner to send messages', () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'owner-user'

      ;(server as any).sessionOwners.set(sessionId, userId)
      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'trainee',
        sessionId: sessionId,
        isAuthenticated: true,
      })

      ;(server as any).handleSessionMessage(clientId, {
        content: 'hello',
        role: 'therapist'
      })

      expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('error'))
    })

    it('should allow supervisors to send messages even if not owner', () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'supervisor-user'

      ;(server as any).sessionOwners.set(sessionId, 'other-user')
      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'supervisor',
        sessionId: sessionId,
        isAuthenticated: true,
      })

      ;(server as any).handleSessionMessage(clientId, {
        content: 'hello',
        role: 'therapist'
      })

      expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('error'))
    })

    it('should reject messages from non-owner trainees', () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'other-trainee'

      ;(server as any).sessionOwners.set(sessionId, 'owner-user')
      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'trainee',
        sessionId: sessionId,
        isAuthenticated: true,
      })

      ;(server as any).handleSessionMessage(clientId, {
        content: 'hello',
        role: 'therapist'
      })

      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Only the session owner or a supervisor'))
    })
  })

  describe('Rate Limiting', () => {
    it('should rate limit messages', () => {
      const mockWs = new WebSocket('ws://localhost') as any
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'owner-user'

      ;(server as any).sessionOwners.set(sessionId, userId)
      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'trainee',
        sessionId: sessionId,
        isAuthenticated: true,
      })

      for (let i = 0; i < 30; i++) {
        (server as any).handleSessionMessage(clientId, { content: 'msg', role: 'therapist' })
      }
      expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Rate limit exceeded'))

      ;(server as any).handleSessionMessage(clientId, { content: 'msg 31', role: 'therapist' })
      expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Rate limit exceeded'))
    })
  })

  describe('Cleanup & Transfer', () => {
    it('should transfer ownership to another trainee if owner leaves', () => {
      const clients = (server as any).clients
      const sessionId = 'session-1'

      // Set up 2 trainees using handleJoinSession to ensure counters are correct
      const mockWs1 = { send: vi.fn(), readyState: 1 } as any
      const mockWs2 = { send: vi.fn(), readyState: 1 } as any

      clients.set('c1', { id: 'c1', ws: mockWs1, userId: 't1', role: 'trainee', isAuthenticated: true })
      clients.set('c2', { id: 'c2', ws: mockWs2, userId: 't2', role: 'trainee', isAuthenticated: true })

      ;(server as any).handleJoinSession(mockWs1, 'c1', { sessionId, role: 'trainee', userId: 't1' })
      ;(server as any).handleJoinSession(mockWs2, 'c2', { sessionId, role: 'trainee', userId: 't2' })

      expect((server as any).sessionOwners.get(sessionId)).toBe('t1')
      expect((server as any).sessionClientCounts.get(sessionId)).toBe(2)

      // t1 leaves
      ;(server as any).handleDisconnect('c1')

      // t2 should now be owner
      expect((server as any).sessionOwners.get(sessionId)).toBe('t2')
      expect((server as any).sessionClientCounts.get(sessionId)).toBe(1)
    })

    it('should clean up session state when last participant leaves', () => {
      const clientId = 'test-client-id'
      const sessionId = 'session-1'
      const userId = 'user-1'
      const mockWs = new WebSocket('ws://localhost') as any

      const clients = (server as any).clients
      clients.set(clientId, {
        id: clientId,
        ws: mockWs,
        userId: userId,
        role: 'trainee',
        isAuthenticated: true,
      })

      ;(server as any).handleJoinSession(mockWs, clientId, { sessionId, role: 'trainee', userId })
      expect((server as any).sessionOwners.has(sessionId)).toBe(true)

      ;(server as any).handleDisconnect(clientId)

      expect((server as any).sessionOwners.has(sessionId)).toBe(false)
      expect((server as any).sessionClientCounts.has(sessionId)).toBe(false)
    })
  })
})
