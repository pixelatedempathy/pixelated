// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

vi.mock('ws', () => {
  return {
    WebSocket: vi.fn(function () {
      return {
        on: vi.fn(),
        send: vi.fn(),
        close: vi.fn(),
        readyState: 1, // OPEN
      }
    }),
    WebSocketServer: vi.fn(function () {
      return {
        on: vi.fn(),
        close: vi.fn(),
      }
    }),
  }
})

vi.mock('../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: vi.fn(() => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })),
}))

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn(),
}))

describe('TrainingWebSocketServer - coaching notes permission', () => {
  let server: any

  beforeEach(() => {
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(8080)
  })

  it('should allow supervisor to send coaching notes', () => {
    const client = {
      id: 'client1',
      ws: { send: vi.fn(), readyState: 1 },
      sessionId: 'session1',
      role: 'supervisor',
      userId: 'user1',
      isAuthenticated: true,
    }

    // @ts-ignore - accessing private property for testing
    server.clients.set('client1', client)

    // @ts-ignore - accessing private method for testing
    const result = server.canSendCoachingNote(client)
    expect(result).toBe(true)
  })

  it('should allow observer to send coaching notes', () => {
    const client = {
      id: 'client1',
      ws: { send: vi.fn(), readyState: 1 },
      sessionId: 'session1',
      role: 'observer',
      userId: 'user1',
      isAuthenticated: true,
    }

    // @ts-ignore - accessing private property for testing
    server.clients.set('client1', client)

    // @ts-ignore - accessing private method for testing
    const result = server.canSendCoachingNote(client)
    expect(result).toBe(true)
  })

  it('should NOT allow trainee to send coaching notes', () => {
    const client = {
      id: 'client1',
      ws: { send: vi.fn(), readyState: 1 },
      sessionId: 'session1',
      role: 'trainee',
      userId: 'user1',
      isAuthenticated: true,
    }

    // @ts-ignore - accessing private property for testing
    server.clients.set('client1', client)

    // @ts-ignore - accessing private method for testing
    const result = server.canSendCoachingNote(client)
    expect(result).toBe(false)
  })

  it('should NOT allow unauthenticated client to send coaching notes', () => {
    const client = {
      id: 'client1',
      ws: { send: vi.fn(), readyState: 1 },
      sessionId: 'session1',
      role: 'supervisor',
      userId: 'user1',
      isAuthenticated: false,
    }

    // @ts-ignore - accessing private property for testing
    server.clients.set('client1', client)

    // @ts-ignore - accessing private method for testing
    const result = server.canSendCoachingNote(client)
    expect(result).toBe(false)
  })
})
