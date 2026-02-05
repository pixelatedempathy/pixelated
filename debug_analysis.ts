import { detectHighFrequency, detectOddHours, detectSensitiveAccess } from './src/lib/audit/analysis'
import { vi } from 'vitest'

const baseLog = {
  action: 'view',
  resource: { id: 'doc1', type: 'document' },
  metadata: {},
}

const now = new Date(2024, 0, 1, 14, 30)

const logs = [
  ...Array.from({ length: 50 }, (_, i) => ({
    ...baseLog,
    id: `freq${i}`,
    userId: 'user1',
    timestamp: new Date(now.getTime() - i * 60000),
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ...baseLog,
    id: `odd${i}`,
    userId: 'user2',
    timestamp: new Date(2024, 0, 1, 23, 30 - i * 60000),
  })),
  ...Array.from({ length: 15 }, (_, i) => ({
    ...baseLog,
    id: `sens${i}`,
    userId: 'user3',
    resource: { id: `res${i}`, type: 'pii' },
    timestamp: new Date(now.getTime() - i * 60000),
  })),
]

// Mock Date.now to Jan 1st 2024 14:30
global.Date = class extends Date {
  constructor(date) {
    if (date) return new (Date as any)(date)
    return now
  }
} as any

console.log("High Frequency Patterns:", detectHighFrequency(logs as any).length)
console.log("Odd Hours Patterns:", detectOddHours(logs as any).length)
console.log("Sensitive Access Patterns:", detectSensitiveAccess(logs as any).length)
