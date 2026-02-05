export {
  type AuditLogEntry,
  getUserAuditLogs,
  logAuditEvent,
  createAuditLog,
  createResourceAuditLog,
} from './log'

export * from './analysis'
export * from './metrics'
export * from './types'

// Re-export from legacy HIPAA audit module
export {
  AuditEventType,
  AuditEventStatus,
  initializeAuditService,
  getAuditLogs,
  clearAuditLogs,
  exportAuditLogs,
  configureAuditService,
  createHIPAACompliantAuditLog,
} from './legacy'

export type { AuditDetails } from './legacy'
