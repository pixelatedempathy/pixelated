import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { TrainingWebSocketServer } from '../TrainingWebSocketServer'

const mockWSSInstance = {
  on: vi.fn(),
  close: vi.fn(),
}

vi.mock('ws', () => {
  const WebSocketServer = vi.fn().mockImplementation(function() {
    return mockWSSInstance;
  });

  const WebSocket = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    send: vi.fn(),
    close: vi.fn(),
    readyState: 1,
  }));
  (WebSocket as any).OPEN = 1;
  (WebSocket as any).CLOSED = 3;

  return {
    WebSocketServer,
    WebSocket,
  }
})

vi.mock('../../auth/jwt-service', () => ({
  validateToken: vi.fn(),
}))

describe('TrainingWebSocketServer Permissions & Cleanup', () => {
  let server: TrainingWebSocketServer
  let connectionHandler: any

  beforeEach(() => {
    process.env.NODE_ENV = 'development'
    vi.clearAllMocks()
    server = new TrainingWebSocketServer(8084)
    const call = mockWSSInstance.on.mock.calls.find((c: any) => c[0] === 'connection')
    if (call) {
      connectionHandler = call[1]
    }
  })

  afterEach(() => {
    if (server) server.close()
  })

  const createMockClient = async (userId: string = 'test-user') => {
    const ws = {
      on: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1,
    } as any
    const req = { url: '/?token=' + userId, headers: {} } as any

    if (connectionHandler) {
      connectionHandler(ws, req)
    }

    let authenticated = false;
    for (let i = 0; i < 20; i++) {
        const authCall = ws.send.mock.calls.find((c: any) => c[0].includes('"type":"authenticated"'));
        if (authCall) {
            authenticated = true;
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    if (!authenticated) {
        throw new Error('Client ' + userId + ' failed to authenticate');
    }

    const mCall = ws.on.mock.calls.find((c: any) => c[0] === 'message')
    const messageHandler = mCall ? mCall[1] : null

    const cCall = ws.on.mock.calls.find((c: any) => c[0] === 'close')
    const closeHandler = cCall ? cCall[1] : null

    return { ws, messageHandler, closeHandler }
  }

  it('should allow trainees to send messages even if a supervisor joined first', async () => {
    const { messageHandler: mh1 } = await createMockClient('supervisor-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'supervisor', userId: 'supervisor-1' }
    }))

    const { ws: ws2, messageHandler: mh2 } = await createMockClient('trainee-1')
    mh2(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'trainee', userId: 'trainee-1' }
    }))

    mh2(JSON.stringify({
      type: 'session_message',
      payload: { content: 'hello from trainee', role: 'therapist' }
    }))

    const errorCalls = ws2.send.mock.calls.filter((c: any) => c[0].includes('"type":"error"'))
    expect(errorCalls.length).toBe(0)
  })

  it('should allow supervisors to mute users', async () => {
    const { messageHandler: mh1 } = await createMockClient('supervisor-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'supervisor', userId: 'supervisor-1' }
    }))

    const { ws: ws2, messageHandler: mh2 } = await createMockClient('trainee-1')
    mh2(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'trainee', userId: 'trainee-1' }
    }))

    mh1(JSON.stringify({
      type: 'mute_user',
      payload: { targetUserId: 'trainee-1' }
    }))

    mh2(JSON.stringify({
      type: 'session_message',
      payload: { content: 'hello', role: 'therapist' }
    }))

    expect(ws2.send).toHaveBeenCalledWith(expect.stringContaining('You are muted in this session'))
  })

  it('should allow supervisors to ban users', async () => {
    const { messageHandler: mh1 } = await createMockClient('supervisor-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'supervisor', userId: 'supervisor-1' }
    }))

    const { ws: ws2, messageHandler: mh2 } = await createMockClient('trainee-1')
    mh2(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'trainee', userId: 'trainee-1' }
    }))

    mh1(JSON.stringify({
      type: 'ban_user',
      payload: { targetUserId: 'trainee-1' }
    }))

    expect(ws2.send).toHaveBeenCalledWith(expect.stringContaining('You have been banned from this session'))
    expect(ws2.close).toHaveBeenCalledWith(1008, 'Banned from session')
  })

  it('should clean up session data when the last user disconnects', async () => {
    const { messageHandler: mh1, closeHandler: ch1 } = await createMockClient('user-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-cleanup', role: 'trainee', userId: 'user-1' }
    }))

    expect((server as any).sessionOwners.has('session-cleanup')).toBe(true)

    ch1()

    expect((server as any).sessionOwners.has('session-cleanup')).toBe(false)
  })

  it('should clean up rate limit data when a user disconnects', async () => {
    const { messageHandler: mh1, closeHandler: ch1 } = await createMockClient('user-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'trainee', userId: 'user-1' }
    }))

    mh1(JSON.stringify({
      type: 'session_message',
      payload: { content: 'msg 1', role: 'therapist' }
    }))

    expect((server as any).userBuckets.has('user-1')).toBe(true)

    ch1()

    expect((server as any).userBuckets.has('user-1')).toBe(false)
  })

  it('should enforce rate limiting', async () => {
    const { ws: ws1, messageHandler: mh1 } = await createMockClient('user-1')
    mh1(JSON.stringify({
      type: 'join_session',
      payload: { sessionId: 'session-1', role: 'trainee', userId: 'user-1' }
    }))

    for (let i = 0; i < 30; i++) {
      mh1(JSON.stringify({
        type: 'session_message',
        payload: { content: 'msg ' + i, role: 'therapist' }
      }))
    }

    mh1(JSON.stringify({
      type: 'session_message',
      payload: { content: 'msg 31', role: 'therapist' }
    }))

    const errorCalls = ws1.send.mock.calls.filter((c: any) =>
      c[0].includes('Rate limit exceeded')
    )
    expect(errorCalls.length).toBeGreaterThan(0)
  })
})