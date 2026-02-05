import { describe, it, expect, beforeEach, vi } from 'vitest'
import { dlpService, DLPAction, type DLPRule } from '../dlp'
import { detectAndRedactPHI } from '../phiDetection'

// Mock the phiDetection module
vi.mock('../phiDetection', () => ({
  detectAndRedactPHI: vi.fn((text) => text.replace('PHI', '[REDACTED]')),
}))

// Mock the audit module with all required members
vi.mock('../../audit', () => {
  return {
    AuditEventType: {
      DLP_ALLOWED: 'dlp_allowed',
      DLP_BLOCKED: 'dlp_blocked',
      SECURITY_ALERT: 'security_alert',
    },
    logAuditEvent: vi.fn().mockResolvedValue(undefined),
    AuditLogger: vi.fn(() => ({
      log: vi.fn(),
    })),
  }
})

describe('DLP Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Reset service by removing all rules and adding a test rule
    const rules = dlpService.getRules()
    rules.forEach(rule => dlpService.removeRule(rule.id))

    const testRule: DLPRule = {
      id: 'test-rule',
      name: 'Test Rule',
      description: 'Rule for testing',
      action: DLPAction.REDACT,
      isActive: true,
      matches: () => true,
      redact: (text) => text.replace('sensitive', '[REDACTED]'),
    }

    dlpService.addRule(testRule)
  })

  describe('Rule Management', () => {
    it('should add rules correctly', () => {
      const newRule: DLPRule = {
        id: 'new-rule',
        name: 'New Rule',
        description: 'New rule for testing',
        action: DLPAction.BLOCK,
        isActive: true,
        matches: () => false,
      }

      dlpService.addRule(newRule)
      expect(dlpService.getRules().length).toBeGreaterThan(1)
      expect(dlpService.getRules().find((r) => r.id === 'new-rule')).toBeDefined()
    })

    it('should update existing rules when adding with same ID', () => {
      const updatedRule: DLPRule = {
        id: 'test-rule',
        name: 'Updated Test Rule',
        description: 'Updated rule',
        action: DLPAction.BLOCK,
        isActive: true,
        matches: () => false,
      }

      dlpService.addRule(updatedRule)
      expect(dlpService.getRules().length).toBe(1)
      expect(dlpService.getRules()[0].name).toBe('Updated Test Rule')
      expect(dlpService.getRules()[0].action).toBe(DLPAction.BLOCK)
    })

    it('should remove rules correctly', () => {
      dlpService.removeRule('test-rule')
      expect(dlpService.getRules().length).toBe(0)
    })
  })

  describe('Content Scanning', () => {
    it('should allow content with no triggered rules', () => {
      // Clear all rules first
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))

      dlpService.addRule({
        id: 'no-match',
        name: 'Never Matches',
        description: 'Rule that never matches',
        action: DLPAction.BLOCK,
        isActive: true,
        matches: () => false,
      })

      const result = dlpService.scanContent('safe content', {
        userId: 'user123',
        action: 'export',
      })

      expect(result.allowed).toBe(true)
      expect(result.triggeredRules).toHaveLength(0)
      expect(result.redactedContent).toBeUndefined()
    })

    it('should redact content when rules with REDACT action are triggered', () => {
      const result = dlpService.scanContent('This is sensitive data', {
        userId: 'user123',
        action: 'export',
      })

      expect(result.allowed).toBe(true)
      expect(result.triggeredRules).toContain('test-rule')
      expect(result.redactedContent).toBe('This is [REDACTED] data')
    })

    it('should block content when rules with BLOCK action are triggered', () => {
      // Clear rules and add a blocking rule
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))

      dlpService.addRule({
        id: 'block-rule',
        name: 'Block Rule',
        description: 'Rule that blocks',
        action: DLPAction.BLOCK,
        isActive: true,
        matches: () => true,
      })

      const result = dlpService.scanContent('This should be blocked', {
        userId: 'user123',
        action: 'export',
      })

      expect(result.allowed).toBe(false)
      expect(result.triggeredRules).toContain('block-rule')
      expect(result.reason).toContain('Block Rule')
    })

    it('should generate alerts for BLOCK_AND_ALERT actions', () => {
      // Add a spy to check if the alert method is called
      const alertSpy = vi.spyOn(dlpService as any, 'generateSecurityAlert')

      // Clear rules and add an alerting rule
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))

      dlpService.addRule({
        id: 'alert-rule',
        name: 'Alert Rule',
        description: 'Rule that alerts',
        action: DLPAction.BLOCK_AND_ALERT,
        isActive: true,
        matches: () => true,
      })

      dlpService.scanContent('This should trigger an alert', {
        userId: 'user123',
        action: 'export',
      })

      expect(alertSpy).toHaveBeenCalled()
    })
  })

  describe('PHI Detection Integration', () => {
    it('should use PHI detection for scanning', () => {
      // Clear rules and add a rule that uses PHI detection
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))

      dlpService.addRule({
        id: 'phi-rule',
        name: 'PHI Rule',
        description: 'Detects PHI',
        action: DLPAction.REDACT,
        isActive: true,
        matches: (content) => detectAndRedactPHI(content) !== content,
        redact: (content) => detectAndRedactPHI(content),
      })

      const result = dlpService.scanContent('Contact: PHI_DATA', {
        userId: 'user123',
        action: 'export',
      })

      expect(detectAndRedactPHI).toHaveBeenCalled()
      expect(result.redactedContent).toBe('Contact: [REDACTED]_DATA')
    })
  })

  describe('Default Rules', () => {
    beforeEach(() => {
      // Reset to default rules using private method (still need as any for private)
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))
      ;(dlpService as any).addDefaultRules()
    })

    it('should have PHI detection rule by default', () => {
      const phiRule = dlpService.getRules().find((r) => r.id === 'phi-detection')
      expect(phiRule).toBeDefined()
      expect(phiRule?.action).toBe(DLPAction.REDACT)
    })

    it('should have large data volume rule by default', () => {
      const volumeRule = dlpService.getRules().find(
        (r) => r.id === 'large-data-volume',
      )
      expect(volumeRule).toBeDefined()
      expect(volumeRule?.action).toBe(DLPAction.BLOCK)
    })
  })

  describe('Audit Logging', () => {
    it('should log allowed events with DLP_ALLOWED type', () => {
      const logSpy = vi.spyOn(dlpService as any, 'logDLPEvent')

      dlpService.scanContent('Regular content', {
        userId: 'user123',
        action: 'view',
      })

      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user123',
          action: 'view',
          allowed: true,
        }),
      )
    })

    it('should log blocked events with DLP_BLOCKED type', () => {
      const logSpy = vi.spyOn(dlpService as any, 'logDLPEvent')

      // Clear rules and add a blocking rule
      dlpService.getRules().forEach(r => dlpService.removeRule(r.id))
      dlpService.addRule({
        id: 'block-rule',
        name: 'Block Rule',
        description: 'Rule that blocks',
        action: DLPAction.BLOCK,
        isActive: true,
        matches: () => true,
      })

      dlpService.scanContent('Blocked content', {
        userId: 'user123',
        action: 'export',
      })

      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user123',
          action: 'export',
          allowed: false,
        }),
      )
    })
  })
})
