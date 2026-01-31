import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserAuditLogs, logAuditEvent } from '../log'
import { auditLogDAO } from '../../../services/mongodb.dao'
import { ObjectId } from 'mongodb'

// Mock dependencies
vi.mock('../../../services/mongodb.dao', () => ({
  auditLogDAO: {
    findByUserId: vi.fn(),
    createLog: vi.fn(),
  },
}))

vi.mock('../logging/build-safe-logger', () => ({
  createBuildSafeLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
}))

describe('Audit Log Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserAuditLogs', () => {
    it('should fetch audit logs for a user', async () => {
      const userId = new ObjectId().toString()
      const mockLogs = [
        {
          _id: new ObjectId(),
          userId: new ObjectId(userId),
          action: 'LOGIN',
          resourceId: 'session-123',
          resourceType: 'session',
          metadata: { ip: '127.0.0.1' },
          timestamp: new Date(),
        },
      ]

      vi.mocked(auditLogDAO.findByUserId).mockResolvedValue(mockLogs)

      const logs = await getUserAuditLogs(userId)

      expect(auditLogDAO.findByUserId).toHaveBeenCalledWith(userId, 100, 0)
      expect(logs).toHaveLength(1)
      expect(logs[0].userId).toBe(userId)
      expect(logs[0].action).toBe('LOGIN')
      expect(logs[0].resource.id).toBe('session-123')
    })

    it('should handle errors gracefully', async () => {
      vi.mocked(auditLogDAO.findByUserId).mockRejectedValue(new Error('DB Error'))

      const logs = await getUserAuditLogs('user-123')

      expect(logs).toEqual([])
    })
  })

  describe('logAuditEvent', () => {
    it('should create an audit log entry', async () => {
      const userId = new ObjectId().toString()
      const metadata = { changed: 'name' }

      await logAuditEvent(userId, 'UPDATE_PROFILE', 'profile-123', 'profile', metadata)

      expect(auditLogDAO.createLog).toHaveBeenCalledWith(
        userId,
        'UPDATE_PROFILE',
        'profile-123',
        'profile',
        metadata
      )
    })

    it('should handle DAO errors gracefully', async () => {
      vi.mocked(auditLogDAO.createLog).mockRejectedValue(new Error('DB Error'))
      const userId = new ObjectId().toString()

      // Should not throw
      await logAuditEvent(userId, 'TEST', 'res-1')

      expect(auditLogDAO.createLog).toHaveBeenCalled()
    })
  })
})
