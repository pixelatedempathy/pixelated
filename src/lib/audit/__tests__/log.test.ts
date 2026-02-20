import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logAuditEvent, getUserAuditLogs } from '../log'
import { auditLogDAO } from '../../../services/mongodb.dao'

vi.mock('../../../services/mongodb.dao', () => ({
  auditLogDAO: {
    create: vi.fn(),
    findByUserId: vi.fn(),
  },
}))

describe('Audit Logging', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('logAuditEvent', () => {
    it('should call auditLogDAO.create with correct parameters', async () => {
      const userId = 'user123'
      const action = 'test-action'
      const resourceId = 'res123'
      const resourceType = 'test-type'
      const metadata = { foo: 'bar' }

      await logAuditEvent(userId, action, resourceId, resourceType, metadata)

      expect(auditLogDAO.create).toHaveBeenCalledWith({
        userId,
        action,
        resourceId,
        resourceType,
        metadata,
      })
    })

    it('should handle missing optional parameters', async () => {
      const userId = 'user123'
      const action = 'test-action'
      const resourceId = 'res123'

      await logAuditEvent(userId, action, resourceId)

      expect(auditLogDAO.create).toHaveBeenCalledWith({
        userId,
        action,
        resourceId,
        resourceType: undefined,
        metadata: {},
      })
    })
  })

  describe('getUserAuditLogs', () => {
    it('should return mapped audit logs from DAO', async () => {
      const userId = 'user123'
      const mockLogs = [
        {
          id: 'log1',
          userId: 'user123',
          action: 'action1',
          resourceId: 'res1',
          resourceType: 'type1',
          metadata: { m: 1 },
          createdAt: new Date('2024-01-01'),
        },
      ]
      vi.mocked(auditLogDAO.findByUserId).mockResolvedValue(mockLogs as any)

      const results = await getUserAuditLogs(userId)

      expect(auditLogDAO.findByUserId).toHaveBeenCalledWith(userId, 100, 0)
      expect(results).toHaveLength(1)
      expect(results[0]).toEqual({
        id: 'log1',
        userId: 'user123',
        action: 'action1',
        resource: {
          id: 'res1',
          type: 'type1',
        },
        metadata: { m: 1 },
        timestamp: new Date('2024-01-01'),
      })
    })

    it('should pass pagination parameters to DAO', async () => {
      const userId = 'user123'
      vi.mocked(auditLogDAO.findByUserId).mockResolvedValue([])

      await getUserAuditLogs(userId, 50, 10)

      expect(auditLogDAO.findByUserId).toHaveBeenCalledWith(userId, 50, 10)
    })
  })
})
