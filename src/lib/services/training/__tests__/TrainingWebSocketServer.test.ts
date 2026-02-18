import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WebSocket, WebSocketServer } from 'ws'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

// Mock dependencies
vi.mock('ws', () => {
  const mockServer = {
    on: vi.fn(),
    close: vi.fn(),
    clients: new Set(),
  }

  const mockWebSocket = vi.fn().mockImplementation(function() {
    return {
      on: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1,
    }
  });
  (mockWebSocket as any).OPEN = 1;
  (mockWebSocket as any).CLOSED = 3;

  return {
    WebSocketServer: vi.fn(function() { return mockServer }),
    WebSocket: mockWebSocket,
  }
})

vi.mock('../../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  })),
}))

vi.mock('../../../auth/jwt-service', () => ({
  validateToken: vi.fn(),
}))

vi.mock('crypto', () => {
  const mockCrypto = {
    randomUUID: vi.fn(() => 'test-uuid'),
  };
  return {
    ...mockCrypto,
    default: mockCrypto
  };
})

describe('TrainingWebSocketServer - Coaching Notes Validation', () => {
  let server: TrainingWebSocketServer

  beforeEach(async () => {
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(8084)
  })

  it('should validate role permissions for coaching notes', async () => {
    const anyServer = server as any
    const clientId = 'supervisor-id'
    const mockWs: any = new WebSocket('ws://localhost')

    // Setup clients
    anyServer.clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId: 'session-1',
      role: 'supervisor',
      userId: 'user-1',
      isAuthenticated: true
    })

    const traineeWs: any = new WebSocket('ws://localhost')
    anyServer.clients.set('trainee-id', {
        id: 'trainee-id',
        ws: traineeWs,
        sessionId: 'session-1',
        role: 'trainee',
        userId: 'user-2',
        isAuthenticated: true
    })

    const observerWs: any = new WebSocket('ws://localhost')
    anyServer.clients.set('observer-id', {
        id: 'observer-id',
        ws: observerWs,
        sessionId: 'session-1',
        role: 'observer',
        userId: 'user-3',
        isAuthenticated: true
    })

    // 1. Supervisor can send notes
    anyServer.handleCoachingNote(clientId, { content: 'Supervisor note' })
    expect(observerWs.send).toHaveBeenCalledWith(expect.stringContaining('Supervisor note'))
    expect(traineeWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Supervisor note'))
    observerWs.send.mockClear()

    // 2. Observer can send notes
    anyServer.handleCoachingNote('observer-id', { content: 'Observer note' })
    expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('Observer note'))
    expect(traineeWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Observer note'))
    mockWs.send.mockClear()

    // 3. Trainee CANNOT send notes
    anyServer.handleCoachingNote('trainee-id', { content: 'Trainee attempt' })
    expect(traineeWs.send).toHaveBeenCalledWith(
      expect.stringContaining('Only supervisors and observers can send coaching notes')
    )
    expect(mockWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Trainee attempt'))
    expect(observerWs.send).not.toHaveBeenCalledWith(expect.stringContaining('Trainee attempt'))
  })

  it('should validate content for coaching notes', async () => {
    const anyServer = server as any
    const clientId = 'supervisor-id'
    const mockWs: any = new WebSocket('ws://localhost')

    anyServer.clients.set(clientId, {
      id: clientId,
      ws: mockWs,
      sessionId: 'session-1',
      role: 'supervisor',
      userId: 'user-1',
      isAuthenticated: true
    })

    // Test empty content
    anyServer.handleCoachingNote(clientId, { content: '' })
    expect(mockWs.send).toHaveBeenCalledWith(
      expect.stringContaining('Coaching note content cannot be empty')
    )
    mockWs.send.mockClear()

    // Test whitespace content
    anyServer.handleCoachingNote(clientId, { content: '   ' })
    expect(mockWs.send).toHaveBeenCalledWith(
      expect.stringContaining('Coaching note content cannot be empty')
    )
    mockWs.send.mockClear()

    // Test missing payload
    anyServer.handleCoachingNote(clientId, null)
    expect(mockWs.send).toHaveBeenCalledWith(
      expect.stringContaining('Coaching note content cannot be empty')
    )
  })
})
