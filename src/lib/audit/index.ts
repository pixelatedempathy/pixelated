// Export modern database-backed audit functions
export {
  getUserAuditLogs,
  logEvent,
  createAuditLog,
  createResourceAuditLog,
} from './log'

// Export types
export * from './types'
export * from './analysis'
export * from './metrics'

// Export legacy HIPAA audit functions (with database integration)
export {
  AuditEventType,
  AuditEventStatus,
  initializeAuditService,
  getAuditLogs,
  clearAuditLogs,
  exportAuditLogs,
  configureAuditService,
  createHIPAACompliantAuditLog,
  logAuditEvent, // This is the legacy 5-arg version
} from './legacy'

export type { AuditDetails } from './legacy'
