/**
 * Threat Detection Integration Module
 *
 * This module provides a unified interface for integrating threat detection
 * with various systems including rate limiting, API middleware, and external services.
 */

// Export rate limiting bridge
export { RateLimitingBridge, type RateLimitIntegrationConfig } from './rate-limiting-bridge'

// Export API middleware
export {
  ThreatDetectionMiddleware,
  createThreatDetectionMiddleware,
  type ApiMiddlewareConfig
} from './api-middleware'

// Export main threat detection service
export {
  ThreatDetectionService,
  createThreatDetectionService,
  type ThreatDetectionConfig
} from './threat-detection-service'

// Export utility functions
export * from './utils'

// Re-export types from response orchestration
export type {
  ThreatData,
  ThreatResponse,
  ResponseAction,
  RateLimitRule,
  RateLimitResult,
  ThreatAnalysis
} from '../response-orchestration'

/**
 * Create a complete threat detection integration setup
 */
export function createThreatDetectionIntegration(
  orchestrator: unknown,
  rateLimiter: unknown,
  config?: Partial<ThreatDetectionConfig>
) {
  const threatDetectionService = createThreatDetectionService(
    orchestrator,
    rateLimiter,
    config
  )

  const middleware = threatDetectionService.getMiddleware()

  return {
    service: threatDetectionService,
    middleware,
    bridge: threatDetectionService['rateLimitingBridge'],

    // Convenience methods
    analyzeThreat: (threatData: unknown) => threatDetectionService.analyzeThreat(threatData),
    checkRequest: (identifier: string, context: unknown) =>
      threatDetectionService.checkRequest(identifier, context),
    getHealthStatus: () => threatDetectionService.getHealthStatus(),
    getStatistics: () => threatDetectionService.getStatistics()
  }
}

/**
 * Default configuration for threat detection integration
 */
export const defaultThreatDetectionConfig: ThreatDetectionConfig = {
  enabled: true,
  enableResponseOrchestration: true,
  enableRateLimiting: true,
  enableBehavioralAnalysis: true,
  enablePredictiveThreats: true,
  rateLimitConfig: {
    enableAutoRateLimiting: true,
    enableThreatDetection: true,
    threatLevelRules: {
      low: {
        name: 'low_threat',
        maxRequests: 100,
        windowMs: 60000,
        enableAttackDetection: false
      },
      medium: {
        name: 'medium_threat',
        maxRequests: 50,
        windowMs: 60000,
        enableAttackDetection: true
      },
      high: {
        name: 'high_threat',
        maxRequests: 10,
        windowMs: 60000,
        enableAttackDetection: true
      },
      critical: {
        name: 'critical_threat',
        maxRequests: 1,
        windowMs: 300000,
        enableAttackDetection: true
      }
    },
    bypassRules: {
      allowedRoles: ['admin', 'system'],
      allowedIPRanges: ['127.0.0.1', '::1'],
      allowedEndpoints: ['/api/health', '/api/status']
    },
    escalationConfig: {
      autoEscalateThreshold: 5,
      escalationWindowMs: 3600000
    }
  },
  responseConfig: {
    enableAutoResponses: true,
    enableManualReview: true,
    escalationThresholds: {
      low: 3,
      medium: 5,
      high: 8,
      critical: 10
    }
  },
  behavioralConfig: {
    enableProfiling: true,
    anomalyThreshold: 0.8,
    baselineUpdateInterval: 86400000
  },
  predictiveConfig: {
    enableForecasting: true,
    forecastingWindow: 24,
    confidenceThreshold: 0.7
  }
}

/**
 * Middleware configuration for Express applications
 */
export const expressMiddlewareConfig = {
  enabled: true,
  enableLogging: true,
  skipPaths: ['/health', '/status', '/metrics', '/api/health', '/api/status'],
  getIdentifier: (req: unknown) => {
    if (req.user?.id) {
      return `user:${req.user.id}`
    }
    if (req.session?.id) {
      return `session:${req.session.id}`
    }
    if (req.ip) {
      return `ip:${req.ip}`
    }
    return 'unknown'
  },
  getContext: (req: unknown) => ({
    ip: req.ip,
    method: req.method,
    path: req.path,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    userId: req.user?.id,
    userRole: req.user?.role,
    sessionId: req.session?.id,
    headers: Object.fromEntries(
      Object.entries(req.headers)
        .filter(([key]) => !['authorization', 'cookie', 'set-cookie'].includes(key.toLowerCase()))
    )
  })
}

/**
 * Example usage patterns
 */
export const usageExamples = {
  /**
   * Basic Express middleware setup
   */
  expressSetup: `
import { createThreatDetectionIntegration } from './integrations'
import { AdvancedResponseOrchestrator } from '../response-orchestration'
import { DistributedRateLimiter } from '../../rate-limiting/rate-limiter'

const orchestrator = new AdvancedResponseOrchestrator()
const rateLimiter = new DistributedRateLimiter()

const { middleware } = createThreatDetectionIntegration(
  orchestrator,
  rateLimiter
)

// Use in Express app
app.use(middleware.middleware())
  `,

  /**
   * Manual threat analysis
   */
  manualAnalysis: `
import { createThreatDetectionIntegration } from './integrations'

const { service } = createThreatDetectionIntegration(
  orchestrator,
  rateLimiter
)

const threatData = {
  threatId: 'threat_123',
  source: 'rate_limiting',
  severity: 'medium',
  riskFactors: {
    violationCount: 15,
    timeWindow: 60000,
    endpoint: '/api/sensitive'
  }
}

const response = await service.analyzeThreat(threatData)
  `,

  /**
   * Request checking with rate limiting
   */
  requestChecking: `
import { createThreatDetectionIntegration } from './integrations'

const { checkRequest } = createThreatDetectionIntegration(
  orchestrator,
  rateLimiter
)

const result = await checkRequest('user:123', {
  userId: '123',
  ip: '192.168.1.1',
  endpoint: '/api/data',
  userAgent: 'Mozilla/5.0...'
})

if (!result.allowed) {
  // Handle blocked request
  res.status(429).json({ error: 'Too many requests' })
}
  `,

  /**
   * Custom configuration
   */
  customConfig: `
import { createThreatDetectionIntegration } from './integrations'

const customConfig = {
  enabled: true,
  enableRateLimiting: true,
  rateLimitConfig: {
    threatLevelRules: {
      high: {
        maxRequests: 5,
        windowMs: 60000,
        enableAttackDetection: true
      }
    }
  }
}

const { service } = createThreatDetectionIntegration(
  orchestrator,
  rateLimiter,
  customConfig
)
  `
}
