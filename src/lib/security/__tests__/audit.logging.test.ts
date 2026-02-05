import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { AuditLogConfig, AuditLogEntry } from '../audit.logging'
import { AuditLoggingService } from '../audit.logging'

const mockLogger = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

const testConfig: AuditLogConfig = {
  logLevel: 'info',
  includeTimestamp: true,
  includePII: false,
  redactFields: ['password', 'token', 'secret', 'ssn', 'dob'],
}

const getTestEntry = (): Omit<AuditLogEntry, 'timestamp'> => ({
  eventType: 'LOGIN_ATTEMPT',
  userId: 'user123',
  resourceType: 'User',
  resourceId: 'user123',
  action: 'login',
  status: 'success',
  details: { password: 'secret' },
  metadata: {
    ip: '127.0.0.1',
    userAgent: 'Mozilla/5.0',
    sessionId: 'session123',
  },
})

let auditLoggingService: AuditLoggingService

beforeEach(() => {
  auditLoggingService = new AuditLoggingService(
    testConfig,
    mockLogger as unknown as Console,
  )
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('auditLoggingService', () => {
  describe('logEvent', () => {
    it('should log an event with sanitized details', async () => {
      const entry = getTestEntry()
      await expect(
        auditLoggingService.logEvent(JSON.parse(JSON.stringify(entry))),
      ).resolves.not.toThrow()
      expect(mockLogger.info).toHaveBeenCalled()
      const loggedEntry = JSON.parse(
        mockLogger.info.mock.calls[0][0],
      ) as any
      expect(loggedEntry.details.password).toBe('[REDACTED]')
    })

    it('should handle logging errors gracefully', async () => {
      const entry = getTestEntry()
      vi.spyOn(
        auditLoggingService as any,
        'storeLogEntry',
      ).mockRejectedValue(new Error('Storage failed'))
      await expect(auditLoggingService.logEvent(JSON.parse(JSON.stringify(entry)))).rejects.toThrow(
        'Failed to log audit event',
      )
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })

  describe('sanitizeEntry', () => {
    it('should hash sensitive identifiers when PII is not included', () => {
      const entry = getTestEntry()
      const rawSessionId = entry.metadata.sessionId

      const sanitizedEntry = (auditLoggingService as any).sanitizeEntry({
        ...JSON.parse(JSON.stringify(entry)),
        timestamp: new Date().toISOString(),
      })

      expect(sanitizedEntry.userId).not.toBe(entry.userId)
      expect(sanitizedEntry.userId.length).toBe(64)
      expect(sanitizedEntry.metadata?.sessionId).not.toBe(rawSessionId)
      expect(sanitizedEntry.metadata?.sessionId?.length).toBe(64)
    })
  })

  describe('cleanup', () => {
    it('should log cleanup message', async () => {
      await auditLoggingService.cleanup()
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Audit logging service cleaned up',
      )
    })
  })
})
