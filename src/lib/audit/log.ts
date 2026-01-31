import { createBuildSafeLogger } from '../logging/build-safe-logger'
import { auditLogDAO } from '../../services/mongodb.dao'

const logger = createBuildSafeLogger('audit-log')

// Define the structure for the audit log entry
export interface AuditLogEntry {
  id: string
  userId: string
  action: string
  resource: {
    id: string
    type: string | undefined
  }
  metadata: Record<string, unknown>
  timestamp: Date
}

export async function getUserAuditLogs(
  userId: string,
  limit = 100,
  offset = 0,
): Promise<AuditLogEntry[]> {
  try {
    logger.info('Getting user audit logs', { userId, limit, offset })

    const logs = await auditLogDAO.findByUserId(userId, limit, offset)

    return logs.map((log) => ({
      id: log.id || log._id?.toString() || '',
      userId: log.userId.toString(),
      action: log.action,
      resource: {
        id: log.resourceId,
        type: log.resourceType,
      },
      metadata: log.metadata || {},
      timestamp: log.timestamp,
    }))
  } catch (error: unknown) {
    logger.error('Error getting user audit logs:', error)
    return []
  }
}

export async function logAuditEvent(
  userId: string,
  action: string,
  resourceId: string,
  resourceType?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  try {
    logger.info('Logging audit event', {
      userId,
      action,
      resourceId,
      resourceType,
      metadata,
    })

    await auditLogDAO.createLog(
      userId,
      action,
      resourceId,
      resourceType,
      metadata,
    )
  } catch (error: unknown) {
    logger.error('Error logging audit event:', error)
  }
}

/**
 * Create an audit log entry (alias for logAuditEvent)
 */
export async function createAuditLog(
  userId: string,
  action: string,
  resourceId: string,
  resourceType?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  return logAuditEvent(userId, action, resourceId, resourceType, metadata)
}

/**
 * Create a resource audit log entry
 */
export async function createResourceAuditLog(
  userId: string,
  action: string,
  resourceId: string,
  resourceType: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  return logAuditEvent(userId, action, resourceId, resourceType, metadata)
}
