import { AuditEventType, AuditEventStatus, AuditLogEntry, AuditDetails } from './types'
import { logEvent } from './log'

let logQueue: AuditLogEntry[] = []
const MAX_QUEUE_SIZE = 100

export interface AuditConfig {
  remoteEndpoint?: string
  localRetentionDays?: number
}

let config: AuditConfig = {}

export function configureAuditService(newConfig: AuditConfig): void {
  config = { ...config, ...newConfig }
}

export async function initializeAuditService(): Promise<void> {
  // Initialization logic for legacy audit service
}

/**
 * Legacy HIPAA compliant audit logging (5-argument signature)
 *
 * @param type - Event type
 * @param action - Action performed
 * @param userId - ID of user who performed action
 * @param resourceId - ID of resource being accessed
 * @param details - Additional details (including resourceType)
 */
export async function logAuditEvent(
  type: AuditEventType | string,
  action: string,
  userId: string,
  resourceId: string,
  details: AuditDetails,
): Promise<any> {
  // Extract resourceType from details or use a default
  const resourceType = (details.resourceType as string) || 'legacy'

  // 1. Log to database using the new system
  await logEvent(
    userId,
    action,
    resourceId,
    resourceType,
    {
      type,
      ...details
    }
  )

  // 2. Legacy HIPAA compliant logging logic (Queue/Local Storage)
  const logEntry = await createHIPAACompliantAuditLog({
    type,
    action,
    userId,
    resourceId,
    resourceType,
    ...details
  })

  return logEntry
}

export async function createHIPAACompliantAuditLog(params: any): Promise<any> {
  const logEntry = {
    ...params,
    id: Math.random().toString(36).substring(2),
    timestamp: new Date(),
  }

  storeLocalAuditLog(logEntry)

  if (logQueue.length >= MAX_QUEUE_SIZE) {
    await flushLogQueue()
  }

  return logEntry
}

function storeLocalAuditLog(entry: any): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const existingLogsJson = localStorage.getItem('audit_logs')
    const existingLogs = existingLogsJson ? JSON.parse(existingLogsJson) : []
    existingLogs.push(entry)
    localStorage.setItem('audit_logs', JSON.stringify(existingLogs.slice(-1000)))
  }
}

async function flushLogQueue(): Promise<void> {
  if (logQueue.length === 0) return
  const logsToSend = [...logQueue]
  logQueue = []

  if (config.remoteEndpoint) {
    try {
      await fetch(config.remoteEndpoint, {
        method: 'POST',
        body: JSON.stringify(logsToSend)
      })
    } catch (e) {
      logQueue = [...logsToSend, ...logQueue].slice(0, MAX_QUEUE_SIZE)
    }
  }
}

export function getAuditLogs(): any[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    const logsJson = localStorage.getItem('audit_logs')
    return logsJson ? JSON.parse(logsJson) : []
  }
  return []
}

export function clearAuditLogs(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('audit_logs')
  }
}

export function exportAuditLogs(): string {
  return JSON.stringify(getAuditLogs())
}

/**
 * Legacy helper for resource audit logging
 */
export async function createResourceAuditLog(
  userId: string,
  action: string,
  resourceId: string,
  resourceType: string,
  metadata?: any
): Promise<any> {
  return logAuditEvent(
    AuditEventType.DATA_ACCESS,
    action,
    userId,
    resourceId,
    { resourceType, ...metadata }
  )
}
