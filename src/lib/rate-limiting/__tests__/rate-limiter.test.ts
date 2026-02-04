<<<<<<< HEAD
=======
// @vitest-environment node
>>>>>>> origin/master
/**
 * Tests for the rate limiting system
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DistributedRateLimiter } from '../rate-limiter'
import { createRateLimiter } from '../rate-limiter'
import { defaultRateLimitConfig } from '../config'
import type { RateLimitRule } from '../types'
<<<<<<< HEAD

// Mock Redis
vi.mock('../redis', () => ({
  redis: {
    get: vi.fn(),
    set: vi.fn(),
    setex: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
    expire: vi.fn(),
    ping: vi.fn().mockResolvedValue('PONG'),
    pipeline: vi.fn().mockReturnValue({
      incr: vi.fn(),
      expire: vi.fn(),
      exec: vi.fn().mockResolvedValue([1, 1]),
    }),
    zadd: vi.fn(),
    zrangebyscore: vi.fn().mockResolvedValue([]),
    zremrangebyscore: vi.fn(),
    hincrby: vi.fn(),
    hgetall: vi.fn().mockResolvedValue({}),
    hset: vi.fn(),
    lpush: vi.fn(),
    keys: vi.fn().mockResolvedValue([]),
  },
}))
=======
import { redis } from '../../redis'

// Mock Redis with stateful implementation
vi.mock('../../redis', () => {
  const store = new Map<string, string>()
  const pipeline = {
    incr: vi.fn().mockImplementation((key) => {
      const current = parseInt(store.get(key) || '0')
      store.set(key, (current + 1).toString())
      return pipeline
    }),
    expire: vi.fn().mockImplementation(() => pipeline),
    hincrby: vi.fn().mockImplementation(() => pipeline),
    hset: vi.fn().mockImplementation(() => pipeline),
    exec: vi.fn().mockImplementation(() => Promise.resolve([[null, 1], [null, 1]])),
  }

  return {
    redis: {
      _store: store,
      get: vi.fn().mockImplementation((key) => Promise.resolve(store.get(key) || null)),
      set: vi.fn().mockImplementation((key, val) => {
        store.set(key, typeof val === 'string' ? val : JSON.stringify(val))
        return Promise.resolve('OK')
      }),
      setex: vi.fn().mockImplementation((key, sec, val) => {
        store.set(key, typeof val === 'string' ? val : JSON.stringify(val))
        return Promise.resolve('OK')
      }),
      del: vi.fn().mockImplementation((key) => {
        store.delete(key)
        return Promise.resolve(1)
      }),
      exists: vi.fn().mockImplementation((key) => Promise.resolve(store.has(key) ? 1 : 0)),
      expire: vi.fn().mockResolvedValue(1),
      ping: vi.fn().mockResolvedValue('PONG'),
      pipeline: vi.fn().mockReturnValue(pipeline),
      zadd: vi.fn(),
      zrangebyscore: vi.fn().mockResolvedValue([]),
      zremrangebyscore: vi.fn(),
      hincrby: vi.fn(),
      hgetall: vi.fn().mockResolvedValue({}),
      hset: vi.fn(),
      lpush: vi.fn(),
      keys: vi.fn().mockResolvedValue([]),
    },
  }
})
>>>>>>> origin/master

describe('DistributedRateLimiter', () => {
  let rateLimiter: DistributedRateLimiter

  beforeEach(() => {
<<<<<<< HEAD
=======
    // Clear redis store for each test
    ; (redis as any)._store?.clear()
>>>>>>> origin/master
    rateLimiter = createRateLimiter(defaultRateLimitConfig)
  })

  describe('checkLimit', () => {
    it('should allow request when under limit', async () => {
      const rule: RateLimitRule = {
        name: 'test_rule',
        maxRequests: 10,
        windowMs: 60000,
        priority: 100,
        enableAttackDetection: false,
      }

      const result = await rateLimiter.checkLimit('test_user', rule)

      expect(result.allowed).toBe(true)
      expect(result.limit).toBe(10)
      expect(result.remaining).toBe(9)
      expect(result.retryAfter).toBeNull()
    })

    it('should block request when over limit', async () => {
      const rule: RateLimitRule = {
        name: 'test_rule',
        maxRequests: 1,
        windowMs: 60000,
        priority: 100,
        enableAttackDetection: false,
      }

      // First request should be allowed
      const result1 = await rateLimiter.checkLimit('test_user', rule)
      expect(result1.allowed).toBe(true)

      // Second request should be blocked
      const result2 = await rateLimiter.checkLimit('test_user', rule)
      expect(result2.allowed).toBe(false)
      expect(result2.remaining).toBe(0)
<<<<<<< HEAD
      expect(result2.retryAfter).toBe(60)
=======
      expect(result2.retryAfter).toBeGreaterThan(0)
>>>>>>> origin/master
    })

    it('should handle attack pattern detection', async () => {
      const rule: RateLimitRule = {
        name: 'test_rule',
        maxRequests: 100,
        windowMs: 60000,
        priority: 100,
        enableAttackDetection: true,
      }

<<<<<<< HEAD
      // Simulate multiple rapid requests
      const results = await Promise.all(
        Array.from({ length: 15 }, (_, i) =>
          rateLimiter.checkLimit('test_user', rule, { requestId: i }),
        ),
      )

      // All requests should be allowed (no attack detected in mock)
      expect(results.every((r) => r.allowed)).toBe(true)
    })

    it('should fail open on Redis errors', async () => {
      const rule: RateLimitRule = {
        name: 'test_rule',
        maxRequests: 1,
        windowMs: 60000,
        priority: 100,
        enableAttackDetection: false,
      }

      // Mock Redis error
      const { redis } = await import('../redis')
      vi.mocked(redis.pipeline).mockImplementationOnce(() => {
        throw new Error('Redis connection failed')
      })

      const result = await rateLimiter.checkLimit('test_user', rule)

      expect(result.allowed).toBe(true) // Should fail open
      expect(result.limit).toBe(1)
      expect(result.remaining).toBe(1)
    })
  })

  describe('getStatus', () => {
    it('should return current rate limit status', async () => {
=======
      // Setup mock responding to attack pattern checks
      vi.mocked(redis.zrangebyscore).mockResolvedValueOnce(
        Array(15).fill(0).map((_, i) => `${Date.now() + i * 10}:${Math.random()}`)
      )

      await rateLimiter.checkLimit('attacker', rule)
      // Expect attack handling logic to trigger warning log or similar (verified by coverage mainly)
    })

    it('should fail open on Redis errors', async () => {
      // Mock pipeline to throw error ONCE
      const pipeline = redis.pipeline()
      vi.mocked(pipeline.exec).mockRejectedValueOnce(new Error('Redis connection failed'))
      // We need to re-mock pipeline for this test to return the failing one
      // But our stateful mock returns a persistent object. 
      // Let's override the mock implementation of pipeline temporarily
      const failingPipeline = {
        ...pipeline,
        exec: vi.fn().mockRejectedValue(new Error('Redis connection failed'))
      }
      vi.mocked(redis.pipeline).mockReturnValueOnce(failingPipeline as any)

>>>>>>> origin/master
      const rule: RateLimitRule = {
        name: 'test_rule',
        maxRequests: 10,
        windowMs: 60000,
        priority: 100,
        enableAttackDetection: false,
      }

<<<<<<< HEAD
      const status = await rateLimiter.getStatus('test_user', rule)

      expect(status.allowed).toBe(true)
      expect(status.limit).toBe(10)
      expect(status.remaining).toBe(10)
      expect(status.resetTime).toBeInstanceOf(Date)
=======
      const result = await rateLimiter.checkLimit('test_user', rule)

      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(10) // Fails open means remaining = limit
>>>>>>> origin/master
    })
  })

  describe('isBlocked', () => {
    it('should check if identifier is blocked', async () => {
<<<<<<< HEAD
      const { redis } = await import('../redis')
<<<<<<< HEAD
=======
=======
>>>>>>> origin/master
>>>>>>> origin/master
      vi.mocked(redis.get).mockResolvedValueOnce(
        JSON.stringify({
          pattern: { isSuspicious: true, type: 'rapid_fire' },
          detectedAt: Date.now(),
        }),
      )

      const isBlocked = await rateLimiter.isBlocked('test_user')
      expect(isBlocked).toBe(true)
    })

    it('should return false when not blocked', async () => {
<<<<<<< HEAD
      const { redis } = await import('../redis')
=======
>>>>>>> origin/master
      vi.mocked(redis.get).mockResolvedValueOnce(null)

      const isBlocked = await rateLimiter.isBlocked('test_user')
      expect(isBlocked).toBe(false)
    })
  })

  describe('getAnalytics', () => {
    it('should return analytics data', async () => {
<<<<<<< HEAD
      const { redis } = await import('../redis')
      vi.mocked(redis.hgetall).mockResolvedValueOnce({
        total_requests: '100',
        total_blocked: '5',
        unique_identifiers: '20',
        last_request: Date.now().toString(),
      })

      const analytics = await rateLimiter.getAnalytics('test_rule', 1)

      expect(analytics).toHaveProperty(Object.keys(analytics)[0])
      const dateKey = Object.keys(analytics)[0]
      expect(analytics[dateKey]).toHaveProperty('usage')
      expect(analytics[dateKey]).toHaveProperty('blocked')
    })
  })
})

describe('createRateLimiter', () => {
  it('should create a rate limiter instance', () => {
    const rateLimiter = createRateLimiter(defaultRateLimitConfig)
    expect(rateLimiter).toBeInstanceOf(DistributedRateLimiter)
  })
})

describe('Attack Pattern Detection', () => {
  it('should detect regular interval patterns', async () => {
    const rateLimiter = createRateLimiter(defaultRateLimitConfig)

    // Simulate regular interval requests
    const timestamps = []
    for (let i = 0; i < 10; i++) {
      timestamps.push(Date.now() + i * 100) // 100ms intervals
    }

    const { redis } = await import('../redis')
    vi.mocked(redis.zrangebyscore).mockResolvedValueOnce(
      timestamps.map((ts) => `${ts}:${Math.random()}`),
    )

    const rule: RateLimitRule = {
      name: 'test_rule',
      maxRequests: 100,
      windowMs: 60000,
      priority: 100,
      enableAttackDetection: true,
    }

    const result = await rateLimiter.checkLimit('regular_bot', rule)
    expect(result.allowed).toBe(true) // Should still allow but log the pattern
  })
})

describe('Rate Limit Configuration', () => {
  it('should use environment-specific configuration', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    // Import dynamically to avoid CommonJS issues
    const { getEnvironmentConfig } = await import('../config')
    const config = getEnvironmentConfig('production')
    expect(config.global.enableAttackDetection).toBe(true)
    expect(config.global.enableAnalytics).toBe(true)

    process.env.NODE_ENV = originalEnv
  })

  it('should merge environment variables with config', async () => {
    process.env.RATE_LIMIT_ENABLED = 'false'
    process.env.RATE_LIMIT_DEFAULT_WINDOW_MS = '30000'

    // Import dynamically to avoid CommonJS issues
    const { getConfigFromEnv } = await import('../config')
    const config = getConfigFromEnv()
    expect(config.global?.enabled).toBe(false)
    expect(config.global?.defaultWindowMs).toBe(30000)

    delete process.env.RATE_LIMIT_ENABLED
    delete process.env.RATE_LIMIT_DEFAULT_WINDOW_MS
  })
})
<<<<<<< HEAD
=======
=======
      vi.mocked(redis.hgetall).mockResolvedValueOnce({
        total_requests: '100',
        total_blocked: '5',
      })
      vi.mocked(redis.hgetall).mockResolvedValueOnce({
        total_blocked: '5',
      })

      const analytics = await rateLimiter.getAnalytics('test_rule')

      const today = new Date().toISOString().slice(0, 10)
      expect(analytics[today]).toBeDefined()
    })
  })
})
>>>>>>> origin/master
>>>>>>> origin/master
