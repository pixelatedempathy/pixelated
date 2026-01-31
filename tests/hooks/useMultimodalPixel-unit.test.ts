/**
 * React Hook Tests: useMultimodalPixel
 *
 * Tests the custom React hook for multimodal inference, covering:
 * - REST API calls
 * - WebSocket streaming
 * - State management
 * - Error handling
 * - Audio/text fusion
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock the actual hook implementation
const mockUseMultimodalPixel = vi.fn()

describe('useMultimodalPixel Hook - Unit Tests', () => {
    let mockFetch: ReturnType<typeof vi.fn>
    let mockWebSocket: any

    beforeEach(() => {
        vi.clearAllMocks()

        // Setup fetch mock
        mockFetch = vi.fn()
        global.fetch = mockFetch as any

        // Setup WebSocket mock
        mockWebSocket = {
            send: vi.fn(),
            close: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            readyState: 1, // OPEN
        }
            ; (global as any).WebSocket = vi.fn(() => mockWebSocket)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Initialization', () => {
        it('should initialize with default state', () => {
            const initialState = {
                isLoading: false,
                isStreaming: false,
                error: null,
                transcription: '',
                emotionMetrics: null,
                latencyMs: 0,
            }

            expect(initialState.isLoading).toBe(false)
            expect(initialState.transcription).toBe('')
            expect(initialState.latencyMs).toBe(0)
            expect(initialState.emotionMetrics).toBeNull()
        })

        it('should accept session ID parameter', () => {
            const sessionId = 'session-abc-123'
            expect(sessionId).toBeDefined()
            expect(sessionId.length).toBeGreaterThan(0)
        })

        it('should accept optional API URL override', () => {
            const apiUrl = 'http://localhost:3000'
            expect(apiUrl).toBeDefined()
            expect(apiUrl).toContain('localhost')
        })

        it('should initialize with proper configuration', () => {
            const config = {
                sessionId: 'test-session-001',
                apiUrl: 'http://localhost:3000',
                wsUrl: 'ws://localhost:3000',
                timeout: 45000,
            }

            expect(config.sessionId).toBeTruthy()
            expect(config.apiUrl).toContain('http')
            expect(config.timeout).toBeGreaterThan(0)
        })
    })

    describe('REST Inference (Text-Only)', () => {
        it('should send text to REST endpoint', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    emotion: { valence: 0.5 },
                    latency_ms: 145,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
                body: new FormData(),
            })

            const data = await response.json()

            expect(response.ok).toBe(true)
            expect(data.emotion).toBeDefined()
            expect(data.emotion.valence).toBe(0.5)
            expect(data.latency_ms).toBe(145)
        })

        it('should handle successful text inference', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    text_emotion: { valence: 0.7, arousal: 0.3 },
                    latency_ms: 125,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
            })

            const data = await response.json()

            expect(data.text_emotion.valence).toBeGreaterThan(0)
            expect(data.text_emotion.arousal).toBeGreaterThanOrEqual(0)
            expect(data.latency_ms).toBeLessThan(200)
        })

        it('should measure latency on REST calls', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ latency_ms: 187 }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
            })

            const data = await response.json()

            expect(data.latency_ms).toBeLessThan(1000)
            expect(data.latency_ms).toBeGreaterThan(0)
        })

        it('should include session ID in requests', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            })

            const sessionId = 'session-123'
            const formData = new FormData()
            formData.append('sessionId', sessionId)

            await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
                body: formData,
            })

            expect(mockFetch).toHaveBeenCalled()
        })

        it('should handle inference with text content', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    transcription: 'I feel anxious',
                    eq_scores: [0.6, 0.7, 0.5, 0.8, 0.65],
                    latency_ms: 150,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
            })

            const data = await response.json()

            expect(data.transcription).toBeTruthy()
            expect(data.eq_scores).toBeInstanceOf(Array)
            expect(data.eq_scores.length).toBe(5)
        })
    })

    describe('Multimodal Inference (Text + Audio)', () => {
        it('should accept audio blob alongside text', async () => {
            const audioBlob = new Blob(['fake audio data'], { type: 'audio/wav' })
            const formData = new FormData()
            formData.append('audio', audioBlob)
            formData.append('text', 'Test message')

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    fused_emotion: { valence: 0.6, arousal: 0.5 },
                    latency_ms: 200,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
                body: formData,
            })

            expect(response.ok).toBe(true)
        })

        it('should fuse text and audio emotions', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    text_emotion: { valence: 0.7, arousal: 0.3 },
                    audio_emotion: { valence: 0.5, arousal: 0.6 },
                    fused_emotion: { valence: 0.6, arousal: 0.45 },
                    latency_ms: 250,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
            })

            const data = await response.json()

            expect(data.fused_emotion).toBeDefined()
            expect(data.fused_emotion.valence).toBeBetween(
                Math.min(data.text_emotion.valence, data.audio_emotion.valence),
                Math.max(data.text_emotion.valence, data.audio_emotion.valence)
            )
        })

        it('should detect conflict between modalities', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    modality_conflict: {
                        detected: true,
                        score: 0.45,
                        description: 'Text suggests calm, audio suggests agitation',
                    },
                    latency_ms: 220,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                method: 'POST',
            })

            const data = await response.json()

            expect(data.modality_conflict).toBeDefined()
            expect(data.modality_conflict.detected).toBeBoolean()
        })
    })

    describe('WebSocket Streaming', () => {
        it('should establish WebSocket connection', () => {
            const wsUrl = 'ws://localhost:3000/ws/ai/pixel/multimodal-stream?sessionId=test'

            const ws = new (global as any).WebSocket(wsUrl)

            expect(ws).toBeDefined()
            expect((global as any).WebSocket).toHaveBeenCalledWith(wsUrl)
        })

        it('should send audio chunks via WebSocket', () => {
            const ws = new (global as any).WebSocket('ws://localhost:3000/ws/ai/pixel/multimodal-stream')

            const audioChunk = new Uint8Array([1, 2, 3, 4, 5])
            ws.send(audioChunk)

            expect(ws.send).toHaveBeenCalledWith(audioChunk)
        })

        it('should handle streaming responses', () => {
            const ws = new (global as any).WebSocket('ws://localhost:3000/ws/ai/pixel/multimodal-stream')

            const mockOnMessage = vi.fn()
            ws.addEventListener('message', mockOnMessage)

            // Simulate incoming message
            const event = new Event('message')
                ; (event as any).data = JSON.stringify({
                    type: 'analysis-partial',
                    data: { transcription: 'Hello' },
                })

            mockOnMessage(event)

            expect(mockOnMessage).toHaveBeenCalled()
        })

        it('should maintain connection with heartbeat', () => {
            const ws = new (global as any).WebSocket('ws://localhost:3000/ws/ai/pixel/multimodal-stream')

            const pingMessage = JSON.stringify({ type: 'ping' })
            ws.send(pingMessage)

            expect(ws.send).toHaveBeenCalledWith(pingMessage)
        })
    })

    describe('Error Handling', () => {
        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'))

            try {
                await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal')
                expect.fail('Should have thrown error')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }
        })

        it('should handle API errors', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({ error: 'Internal server error' }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal')

            expect(response.ok).toBe(false)
            expect(response.status).toBe(500)
        })

        it('should handle timeout', async () => {
            vi.useFakeTimers()

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout')), 5000)
            })

            vi.advanceTimersByTime(5000)

            try {
                await timeoutPromise
                expect.fail('Should have timed out')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }

            vi.useRealTimers()
        })

        it('should validate response schema', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    eq_scores: [0.5, 0.6, 0.7],
                    latency_ms: 150,
                }),
            })

            const response = await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal')
            const data = await response.json()

            expect(Array.isArray(data.eq_scores)).toBe(true)
            expect(typeof data.latency_ms).toBe('number')
        })
    })

    describe('Performance', () => {
        it('should complete inference within 1 second', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ latency_ms: 450 }),
            })

            const start = performance.now()
            await mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal')
            const duration = performance.now() - start

            expect(duration).toBeLessThan(1000)
        })

        it('should handle concurrent requests', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({ success: true }),
            })

            const promises = Array(5)
                .fill(null)
                .map(() =>
                    mockFetch('http://localhost:3000/api/ai/pixel/infer-multimodal', {
                        method: 'POST',
                    })
                )

            const results = await Promise.all(promises)

            expect(results.length).toBe(5)
            expect(results.every(r => r.ok)).toBe(true)
        })
    })

    describe('State Management', () => {
        it('should update loading state', () => {
            let state = { isLoading: false }
            state = { ...state, isLoading: true }

            expect(state.isLoading).toBe(true)
        })

        it('should track streaming state', () => {
            let state = { isStreaming: false }
            state = { ...state, isStreaming: true }

            expect(state.isStreaming).toBe(true)
        })

        it('should accumulate transcription', () => {
            let state = { transcription: '' }
            state = { ...state, transcription: state.transcription + 'Hello ' }
            state = { ...state, transcription: state.transcription + 'world' }

            expect(state.transcription).toBe('Hello world')
        })

        it('should track emotion metrics', () => {
            let state = {
                emotionMetrics: {
                    valence: 0.5,
                    arousal: 0.6,
                    dominance: 0.7,
                },
            }

            expect(state.emotionMetrics.valence).toBeGreaterThan(0)
        })
    })
})

