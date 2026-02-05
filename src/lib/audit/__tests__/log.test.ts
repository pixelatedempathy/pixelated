import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logAuditEvent, getUserAuditLogs } from '../log'
import { auditLogDAO } from '../../services/mongodb.dao'

vi.mock('../../services/mongodb.dao', () => ({
  auditLogDAO: {
    createLog: vi.fn(),
    findByUserId: vi.fn(),
  },
}))

describe('Audit Logging', () => {
  const userId = 'user123'
  const action = 'create'
  const resourceId = 'res1'
  const resourceType = 'doc'
  const metadata = { key: 'value' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call auditLogDAO.createLog when logging an event', async () => {
    await logAuditEvent(userId, action, resourceId, resourceType, metadata)

    expect(auditLogDAO.createLog).toHaveBeenCalledWith(
      userId,
      action,
      resourceId,
      resourceType,
      metadata,
    )
  })

  it('should return mapped logs from getUserAuditLogs', async () => {
    const mockDbLog = {
      id: 'log1',
      userId: { toString: () => userId },
      action,
      resourceId,
      resourceType,
      metadata,
      timestamp: new Date(),
    }
    ;(auditLogDAO.findByUserId as any).mockResolvedValue([mockDbLog])

    const logs = await getUserAuditLogs(userId)

    expect(logs).toHaveLength(1)
    expect(logs[0]).toEqual({
      id: 'log1',
      userId,
      action,
      resource: {
        id: resourceId,
        type: resourceType,
      },
      metadata,
      timestamp: mockDbLog.timestamp,
    })
  })
})
