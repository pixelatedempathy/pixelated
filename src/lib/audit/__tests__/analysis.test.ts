import {
  detectHighFrequency,
  detectOddHours,
  detectSensitiveAccess,
  detectUnusualPatterns,
} from '../analysis'
import type { AuditLog } from '../types'

describe('Audit Analysis', () => {
  const baseLog: Omit<AuditLog, 'timestamp' | 'userId'> = {
    id: '1',
    action: 'read' as any,
    resourceType: 'document',
    resourceId: 'doc1',
    // @ts-ignore
    status: 'success',
    metadata: {},
  }

  describe('detectHighFrequency', () => {
    it('should detect high frequency access patterns', () => {
      // Mock Date to make detection work regardless of current time
      const now = new Date()
      const logs: AuditLog[] = Array(60)
        .fill(null)
        .map((_, i) => ({
          ...baseLog,
          id: `log${i}`,
          userId: 'user1',
          timestamp: new Date(now.getTime() - i * 60000).toISOString(), // 1 minute apart
        }))

      const patterns = detectHighFrequency(logs, 60)

      expect(patterns).toHaveLength(1)
      expect(patterns[0]).toMatchObject({
        type: 'high_frequency',
        severity: 'high',
        description: expect.stringContaining('user1'),
      })
    })
  })

  describe('detectOddHours', () => {
    it('should detect access during unusual hours', () => {
      const logs: AuditLog[] = Array(4) // 4 logs should be 'low' severity (threshold for medium is 5)
        .fill(null)
        .map((_, i) => ({
          ...baseLog,
          id: `log${i}`,
          userId: 'user1',
          timestamp: new Date(2024, 0, 1, 23, 30 + i).toISOString(),
        }))

      const patterns = detectOddHours(logs as any)

      expect(patterns).toHaveLength(1)
      expect(patterns[0]).toMatchObject({
        type: 'odd_hours',
        severity: 'low',
      })
    })
  })

  describe('detectSensitiveAccess', () => {
    it('should detect frequent access to sensitive resources', () => {
      const logs: AuditLog[] = Array(15)
        .fill(null)
        .map((_, i) => ({
          ...baseLog,
          id: `log${i}`,
          userId: 'user1',
          resourceType: 'pii',
          timestamp: new Date().toISOString(),
        }))

      const patterns = detectSensitiveAccess(logs as any)

      expect(patterns).toHaveLength(1)
      expect(patterns[0]).toMatchObject({
        type: 'sensitive_access',
        severity: 'medium',
      })
    })
  })

  describe('detectUnusualPatterns', () => {
    it('should combine detection methods', () => {
      const now = new Date()
      const logs: AuditLog[] = [
        // High frequency logs
        ...Array(60)
          .fill(null)
          .map((_, i) => ({
            ...baseLog,
            id: `freq${i}`,
            userId: 'user1',
            timestamp: new Date(now.getTime() - i * 60000).toISOString(),
          })),
        // Sensitive access logs
        ...Array(15)
          .fill(null)
          .map((_, i) => ({
            ...baseLog,
            id: `sens${i}`,
            userId: 'user3',
            resourceType: 'pii',
            timestamp: new Date(now.getTime() - i * 60000).toISOString(),
          })),
      ]

      const patterns = detectUnusualPatterns(logs as any)

      expect(patterns.length).toBeGreaterThanOrEqual(2)
      expect(patterns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'high_frequency' }),
          expect.objectContaining({ type: 'sensitive_access' }),
        ]),
      )
    })
  })
})
