import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { WebSocketService } from '../WebSocketService'

// Mock the global WebSocket
class MockWebSocket {
  onopen: () => void = () => {}
  onclose: (event: any) => void = () => {}
  onerror: (error: any) => void = () => {}
  onmessage: (event: any) => void = () => {}
  readyState: number = 0
  send: (data: string) => void = vi.fn()
  close: () => void = vi.fn()

  constructor(public url: string) {
    setTimeout(() => {
      this.readyState = 1 // OPEN
      this.onopen()
    }, 10)
  }

  static OPEN = 1
  static CONNECTING = 0
}

global.WebSocket = MockWebSocket as any

describe('WebSocketService', () => {
  let wsService: WebSocketService

  beforeEach(() => {
    // Reset instance for each test
    // We can't easily reset private static instance, so we might need to cast or just rely on state reset
    // However, since it is a singleton, state persists.
    // For testing, we might want to allow resetting or just get the instance.
    // Let's assume we can get the instance and reset its state if needed, but private props are hard to reach.
    // We'll just test the public API.
    wsService = WebSocketService.getInstance()
    // Reset handlers
    // @ts-ignore
    wsService.handlers = new Map()
    // @ts-ignore
    wsService.isConnected = false
    // @ts-ignore
    wsService.messageQueue = []
    // @ts-ignore
    wsService.url = null
    // @ts-ignore
    wsService.ws = null
  })

  it('should be a singleton', () => {
    const instance1 = WebSocketService.getInstance()
    const instance2 = WebSocketService.getInstance()
    expect(instance1).toBe(instance2)
  })

  it('should connect to a URL', async () => {
    await wsService.connect('ws://test.com')
    // @ts-ignore
    expect(wsService.url).toBe('ws://test.com')
    // @ts-ignore
    expect(wsService.isConnected).toBe(true)
  })

  it('should register and trigger handlers', async () => {
    await wsService.connect('ws://test.com')
    const handler = vi.fn()
    wsService.on('test-event', handler)

    // Simulate incoming message
    // @ts-ignore
    const ws = wsService.ws
    ws.onmessage({ data: JSON.stringify({ type: 'test-event', payload: { foo: 'bar' } }) })

    expect(handler).toHaveBeenCalledWith({ foo: 'bar' })
  })

  it('should queue messages when not connected', async () => {
    // Reset connection
    // @ts-ignore
    wsService.ws = null
    // @ts-ignore
    wsService.isConnected = false
    // @ts-ignore
    wsService.url = 'ws://test.com' // Set URL so it doesn't throw "not configured"

    // This will queue
    await wsService.send('test-event', { data: 1 })

    // @ts-ignore
    expect(wsService.messageQueue.length).toBe(1)

    // Connect now
    await wsService.connect('ws://test.com')

    // Should have flushed
    // @ts-ignore
    expect(wsService.messageQueue.length).toBe(0)

    // Check if send was called on the current WebSocket instance
    // @ts-ignore
    expect(wsService.ws.send).toHaveBeenCalled()
  })
})
