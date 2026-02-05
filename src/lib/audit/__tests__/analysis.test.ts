import { describe, it, expect, vi } from 'vitest'
import {
  detectHighFrequency,
  detectOddHours,
  detectSensitiveAccess,
  detectUnusualPatterns,
} from '../analysis'
import type { AuditLog } from '../types'

describe('Audit Analysis', () => {
  const baseLog: Omit<AuditLog, 'timestamp' | 'userId' | 'id'> = {
    action: 'view',
    resource: {
      id: 'doc1',
      type: 'document'
    },
    metadata: {},
  }

  describe('detectHighFrequency', () => {
    it('should detect high frequency access patterns', () => {
      vi.useFakeTimers()
      const now = new Date(2024, 0, 1, 12, 0)
      vi.setSystemTime(now)

      const logs: AuditLog[] = Array.from({ length: 60 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        timestamp: new Date(now.getTime() - i * 60000),
      }))

      const patterns = detectHighFrequency(logs, 60)

      expect(patterns).toHaveLength(1)
      expect(patterns[0].type).toBe('high_frequency')
      expect(patterns[0].severity).toBe('high')
      vi.useRealTimers()
    })

    it('should not detect patterns below threshold', () => {
      vi.useFakeTimers()
      const now = new Date(2024, 0, 1, 12, 0)
      vi.setSystemTime(now)

      const logs: AuditLog[] = Array.from({ length: 10 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        timestamp: new Date(now.getTime() - i * 60000),
      }))

      const patterns = detectHighFrequency(logs, 60)
      expect(patterns).toHaveLength(0)
      vi.useRealTimers()
    })
  })

  describe('detectOddHours', () => {
    it('should detect access during unusual hours', () => {
      const logs: AuditLog[] = Array.from({ length: 4 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        timestamp: new Date(2024, 0, 1, 23, 30 + i), // 11:30 PM
      }))

      const patterns = detectOddHours(logs)

      expect(patterns).toHaveLength(1)
      expect(patterns[0].type).toBe('odd_hours')
      expect(patterns[0].severity).toBe('low')
    })

    it('should not detect patterns during normal hours', () => {
      const logs: AuditLog[] = Array.from({ length: 5 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        timestamp: new Date(2024, 0, 1, 14, 30),
      }))

      const patterns = detectOddHours(logs)
      expect(patterns).toHaveLength(0)
    })
  })

  describe('detectSensitiveAccess', () => {
    it('should detect frequent access to sensitive resources', () => {
      const logs: AuditLog[] = Array.from({ length: 15 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        resource: {
          id: `res${i}`,
          type: 'pii'
        },
        timestamp: new Date(),
      }))

      const patterns = detectSensitiveAccess(logs)

      expect(patterns).toHaveLength(1)
      expect(patterns[0].type).toBe('sensitive_access')
      expect(patterns[0].severity).toBe('medium')
    })

    it('should not detect patterns for non-sensitive resources', () => {
      const logs: AuditLog[] = Array.from({ length: 15 }, (_, i) => ({
        ...baseLog,
        id: `log${i}`,
        userId: 'user1',
        resource: {
          id: `res${i}`,
          type: 'public_doc'
        },
        timestamp: new Date(),
      }))

      const patterns = detectSensitiveAccess(logs)
      expect(patterns).toHaveLength(0)
    })
  })

  describe('detectUnusualPatterns', () => {
    it('should combine all detection methods', () => {
      vi.useFakeTimers()
      const now = new Date(2024, 0, 1, 14, 0)
      vi.setSystemTime(now)

      const logs: AuditLog[] = [
        // user1: 55 logs at 2 PM -> high frequency
        ...Array.from({ length: 55 }, (_, i) => ({
          id: `freq${i}`,
          userId: 'user1',
          action: 'view',
          resource: { id: 'doc1', type: 'document' },
          timestamp: new Date(now.getTime() - i * 60000),
        })),
        // user2: 6 logs at 12:30 AM -> odd hours
        ...Array.from({ length: 6 }, (_, i) => ({
          id: `odd${i}`,
          userId: 'user2',
          action: 'view',
          resource: { id: 'doc2', type: 'document' },
          timestamp: new Date(2024, 0, 1, 0, 30 + i),
        })),
        // user3: 25 logs of 'pii' at 2 PM -> sensitive access
        ...Array.from({ length: 25 }, (_, i) => ({
          id: `sens${i}`,
          userId: 'user3',
          action: 'view',
          resource: { id: `res${i}`, type: 'pii' },
          timestamp: new Date(now.getTime() - i * 60000),
        })),
      ]

      const patterns = detectUnusualPatterns(logs)

      // We expect at least one of each type
      const types = patterns.map(p => p.type)
      expect(types).toContain('high_frequency')
      expect(types).toContain('odd_hours')
      expect(types).toContain('sensitive_access')

      vi.useRealTimers()
    })
  })
})
