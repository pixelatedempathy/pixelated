import { describe, it, expect, vi, beforeEach } from 'vitest'

// Hoist the mock instance creation so it's available for the mock factory
const { mockSend, mockOn, mockConnect, mockInstance, captureCallback } = vi.hoisted(() => {
  const mockSend = vi.fn().mockResolvedValue(undefined)

  // Storage for the callback
  let storedCallback: any = null

  const mockOn = vi.fn((event, cb) => {
    if (event === 'webrtc') {
        storedCallback = cb
    }
  })

  const mockConnect = vi.fn().mockResolvedValue(undefined)

  const mockInstance = {
    send: mockSend,
    on: mockOn,
    connect: mockConnect,
    // Expose a way to get the callback even if mock history is cleared
    getCallback: () => storedCallback
  }

  return {
      mockSend,
      mockOn,
      mockConnect,
      mockInstance,
      captureCallback: () => storedCallback
  }
})

vi.mock('../WebSocketService', () => {
  return {
    WebSocketService: {
      getInstance: () => mockInstance
    }
  }
})

// Import after mocking
import { signalingService, SignalingMessage } from '../WebRTCSignalingService'

describe('WebRTCSignalingService', () => {
  beforeEach(() => {
    // We clear mockSend and mockConnect to ensure clean state for each test
    mockSend.mockClear()
    mockConnect.mockClear()
    // We don't care if mockOn is cleared because we captured the callback in the closure
  })

  it('should send an offer', async () => {
    const offer: RTCSessionDescriptionInit = { type: 'offer', sdp: 'sdp-data' }
    await signalingService.sendOffer('session-1', 'user-1', offer)

    expect(mockSend).toHaveBeenCalledWith('webrtc', {
      type: 'offer',
      sessionId: 'session-1',
      userId: 'user-1',
      data: offer,
    })
  })

  it('should send an answer', async () => {
    const answer: RTCSessionDescriptionInit = { type: 'answer', sdp: 'sdp-data' }
    await signalingService.sendAnswer('session-1', 'user-1', answer)

    expect(mockSend).toHaveBeenCalledWith('webrtc', {
      type: 'answer',
      sessionId: 'session-1',
      userId: 'user-1',
      data: answer,
    })
  })

  it('should send an ICE candidate', async () => {
    const candidate: RTCIceCandidateInit = { candidate: 'candidate-data', sdpMid: '0', sdpMLineIndex: 0 }
    await signalingService.sendIceCandidate('session-1', 'user-1', candidate)

    expect(mockSend).toHaveBeenCalledWith('webrtc', {
      type: 'ice-candidate',
      sessionId: 'session-1',
      userId: 'user-1',
      data: candidate,
    })
  })

  it('should handle incoming messages', () => {
    // 1. Get the captured callback
    const callback = mockInstance.getCallback()

    // If callback is null, it means initialization failed to register it
    expect(callback).toBeDefined()
    expect(typeof callback).toBe('function')

    // 2. Register a handler on signalingService
    const sessionHandler = vi.fn()
    const sessionId = 'test-session'
    signalingService.onMessage(sessionId, sessionHandler)

    // 3. Simulate incoming message via the captured callback
    const message: SignalingMessage = {
      type: 'offer',
      sessionId: sessionId,
      userId: 'user-2',
      data: { type: 'offer', sdp: 'remote-sdp' }
    }

    if (callback) {
        callback(message)
    }

    // 4. Verify handler was called
    expect(sessionHandler).toHaveBeenCalledWith(message)
  })
})
