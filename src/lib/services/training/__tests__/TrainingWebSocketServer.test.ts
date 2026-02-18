import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

// Mock the dependencies
vi.mock('ws', () => {
  return {
    WebSocketServer: vi.fn().mockImplementation(function() {
      return {
        on: vi.fn(),
        close: vi.fn(),
      }
    }),
    WebSocket: {
      OPEN: 1,
      CLOSED: 3,
    }
  }
})

vi.mock('../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })
}))

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn()
}))

describe('TrainingWebSocketServer - handleCoachingNote', () => {
  let server: any
  let mockWs: any

  beforeEach(() => {
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(8084)
    mockWs = {
      send: vi.fn(),
      readyState: 1, // WebSocket.OPEN
    }
  })

  it('should allow supervisor to send coaching notes and broadcast to appropriate roles', () => {
    const sessionId = 'test-session-id'

    // Set up supervisor (sender)
    const supervisorId = 'supervisor-client-id'
    server.clients.set(supervisorId, {
      id: supervisorId,
      ws: mockWs,
      sessionId,
      role: 'supervisor',
      userId: 'user-supervisor',
      isAuthenticated: true
    })

    // Set up another supervisor (receiver)
    const otherSupervisorWs = { send: vi.fn(), readyState: 1 }
    server.clients.set('other-supervisor', {
      id: 'other-supervisor',
      ws: otherSupervisorWs,
      sessionId,
      role: 'supervisor',
      userId: 'user-other-supervisor',
      isAuthenticated: true
    })

    // Set up an observer (receiver)
    const observerWs = { send: vi.fn(), readyState: 1 }
    server.clients.set('observer-id', {
      id: 'observer-id',
      ws: observerWs,
      sessionId,
      role: 'observer',
      userId: 'user-observer',
      isAuthenticated: true
    })

    // Set up a trainee (should NOT receive)
    const traineeWs = { send: vi.fn(), readyState: 1 }
    server.clients.set('trainee-id', {
      id: 'trainee-id',
      ws: traineeWs,
      sessionId,
      role: 'trainee',
      userId: 'user-trainee',
      isAuthenticated: true
    })

    const payload = { content: 'Valid coaching note' }
    ;(server as any).handleCoachingNote(supervisorId, payload)

    // Check broadcast to supervisor
    expect(otherSupervisorWs.send).toHaveBeenCalled()
    const supervisorMsg = JSON.parse(otherSupervisorWs.send.mock.calls[0][0])
    expect(supervisorMsg.type).toBe('coaching_note')
    expect(supervisorMsg.payload.content).toBe('Valid coaching note')

    // Check broadcast to observer
    expect(observerWs.send).toHaveBeenCalled()

    // Check NO broadcast to trainee
    expect(traineeWs.send).not.toHaveBeenCalled()
  })

  it('should reject coaching notes from trainees', () => {
    const clientId = 'trainee-client-id'
    const sessionId = 'test-session-id'

    server.clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId,
      role: 'trainee',
      userId: 'user-trainee',
      isAuthenticated: true
    })

    const payload = { content: 'Illegal coaching note' }
    ;(server as any).handleCoachingNote(clientId, payload)

    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))
  })

  it('should reject empty coaching notes', () => {
    const clientId = 'supervisor-client-id'
    const sessionId = 'test-session-id'

    server.clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId,
      role: 'supervisor',
      userId: 'user-supervisor',
      isAuthenticated: true
    })

    const payload = { content: '   ' }
    ;(server as any).handleCoachingNote(clientId, payload)

    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('cannot be empty'))
  })
})
