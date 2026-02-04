import { createBuildSafeLogger } from '../logging/build-safe-logger'
<<<<<<< HEAD
import { auditLogDAO } from '../../services/mongodb.dao'
=======
>>>>>>> origin/master

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

<<<<<<< HEAD
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
=======
    // TODO: Replace with actual database implementation
    // For now, return empty array to prevent build errors
    return []
>>>>>>> origin/master
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

<<<<<<< HEAD
    await auditLogDAO.createLog(
      userId,
      action,
      resourceId,
      resourceType,
      metadata,
    )
=======
    // TODO: Replace with actual database implementation
    // For now, just log to console to prevent build errors
>>>>>>> origin/master
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
