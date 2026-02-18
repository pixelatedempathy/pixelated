import { vi, describe, it, expect, beforeEach } from 'vitest'
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
      readyState: 1, // OPEN
    };
  });
  // Attach static properties
  (mockWebSocket as any).OPEN = 1;
  (mockWebSocket as any).CLOSED = 3;

  return {
    WebSocketServer: vi.fn(function() { return mockServer; }),
    WebSocket: mockWebSocket,
  }
})

vi.mock('../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  })),
}))

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn(),
}))

describe('TrainingWebSocketServer - Coaching Notes', () => {
  let server: TrainingWebSocketServer

  beforeEach(() => {
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(8080)
  })

  it('should only allow supervisors or observers to send coaching notes', async () => {
    // Access private clients map for testing
    const clients = (server as any).clients
    const clientId = 'test-client-id'
    const mockWs = new WebSocket('ws://localhost')

    clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId: 'test-session',
      role: 'trainee',
      userId: 'user-1',
      isAuthenticated: true
    })

    // 1. Attempt as trainee (should fail)
    await (server as any).handleCoachingNote(clientId, { content: 'test note' })

    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))

    // 2. Attempt as supervisor (should succeed)
    vi.clearAllMocks()
    clients.get(clientId).role = 'supervisor'
    await (server as any).handleCoachingNote(clientId, { content: 'test note' })

    expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))

    // 3. Attempt as observer (should succeed)
    vi.clearAllMocks()
    clients.get(clientId).role = 'observer'
    await (server as any).handleCoachingNote(clientId, { content: 'test note' })

    expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Unauthorized'))
  })

  it('should reject empty coaching notes', async () => {
    const clients = (server as any).clients
    const clientId = 'test-client-id'
    const mockWs = new WebSocket('ws://localhost')

    clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId: 'test-session',
      role: 'supervisor',
      userId: 'user-1',
      isAuthenticated: true
    })

    // Attempt with empty content
    await (server as any).handleCoachingNote(clientId, { content: '' })
    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('content cannot be empty'))

    // Attempt with whitespace content
    vi.clearAllMocks()
    await (server as any).handleCoachingNote(clientId, { content: '   ' })
    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('content cannot be empty'))

    // Attempt with non-string content
    vi.clearAllMocks()
    await (server as any).handleCoachingNote(clientId, { content: null as any })
    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('content cannot be empty'))
  })

  it('should broadcast valid coaching notes to authorized roles', async () => {
    const clients = (server as any).clients
    const supervisorId = 'supervisor-client'
    const observerId = 'observer-client'
    const traineeId = 'trainee-client'

    const mockWsSupervisor = new WebSocket('ws://localhost')
    const mockWsObserver = new WebSocket('ws://localhost')
    const mockWsTrainee = new WebSocket('ws://localhost')

    // Explicitly set readyState to 1 (OPEN) for mocks if not already set by constructor
    ;(mockWsSupervisor as any).readyState = 1
    ;(mockWsObserver as any).readyState = 1
    ;(mockWsTrainee as any).readyState = 1

    const sessionId = 'session-123'

    clients.set(supervisorId, {
      id: supervisorId,
      ws: mockWsSupervisor,
      sessionId,
      role: 'supervisor',
      userId: 'supervisor-1',
      isAuthenticated: true
    })

    clients.set(observerId, {
      id: observerId,
      ws: mockWsObserver,
      sessionId,
      role: 'observer',
      userId: 'observer-1',
      isAuthenticated: true
    })

    clients.set(traineeId, {
      id: traineeId,
      ws: mockWsTrainee,
      sessionId,
      role: 'trainee',
      userId: 'trainee-1',
      isAuthenticated: true
    })

    const noteContent = 'Focus on breathing'
    await (server as any).handleCoachingNote(supervisorId, { content: noteContent })

    // Supervisor should receive the note (as part of the broadcast)
    expect(mockWsSupervisor.send).toHaveBeenCalledWith(expect.stringContaining(noteContent))
    expect(mockWsSupervisor.send).toHaveBeenCalledWith(expect.stringContaining('coaching_note'))

    // Observer should receive the note
    expect(mockWsObserver.send).toHaveBeenCalledWith(expect.stringContaining(noteContent))
    expect(mockWsObserver.send).toHaveBeenCalledWith(expect.stringContaining('coaching_note'))

    // Trainee should NOT receive the note
    expect(mockWsTrainee.send).not.toHaveBeenCalledWith(expect.stringContaining(noteContent))
    expect(mockWsTrainee.send).not.toHaveBeenCalledWith(expect.stringContaining('coaching_note'))
  })
})
