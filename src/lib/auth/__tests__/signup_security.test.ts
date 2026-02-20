/** @vitest-environment node */
import { describe, it, expect, beforeEach, vi } from 'vitest'

const { mockAuth0UserService } = vi.hoisted(() => ({
  mockAuth0UserService: {
    createUser: vi.fn(),
  }
}))

vi.mock('../../../services/auth0.service', () => ({
  auth0UserService: mockAuth0UserService,
}))

vi.mock('../../../lib/security', () => ({
  logSecurityEvent: vi.fn(),
  SecurityEventType: { USER_CREATED: 'USER_CREATED' }
}))

vi.mock('../../../lib/audit', () => ({
  createAuditLog: vi.fn(),
  AuditEventType: { REGISTER: 'REGISTER' }
}))

vi.mock('../../../lib/mcp/phase6-integration', () => ({
  updatePhase6AuthenticationProgress: vi.fn(),
}))

vi.mock('../../../lib/auth/middleware', () => ({
  rateLimitMiddleware: vi.fn().mockResolvedValue({ success: true }),
  csrfProtection: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock('../../../lib/auth/utils', () => ({
  sanitizeInput: (i: string) => i,
  isValidEmail: () => true,
  isValidPassword: () => ({ valid: true }),
}))

import { POST as registerHandler } from '../../../pages/api/auth/signup'

describe('Signup Security: Role Escalation Prevention', () => {
  it('should ignore role in request body and always use patient role', async () => {
    mockAuth0UserService.createUser.mockResolvedValue({
      id: 'user-id',
      email: 'user@example.com',
      role: 'patient',
    })

    const request = new Request('https://example.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'Password123!',
        role: 'admin', // Attacker tries to become admin
      }),
    })

    await registerHandler({
      request,
      clientAddress: '1.2.3.4',
    } as any)

    // Verify that createUser was called with 'patient' role despite 'admin' in request!
    expect(mockAuth0UserService.createUser).toHaveBeenCalledWith(
      'user@example.com',
      'Password123!',
      'patient'
    )
  })

  it('should default to patient role when no role is provided', async () => {
    mockAuth0UserService.createUser.mockResolvedValue({
      id: 'user-id',
      email: 'user@example.com',
      role: 'patient',
    })

    const request = new Request('https://example.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'Password123!',
      }),
    })

    await registerHandler({
      request,
      clientAddress: '1.2.3.4',
    } as any)

    expect(mockAuth0UserService.createUser).toHaveBeenCalledWith(
      'user@example.com',
      'Password123!',
      'patient'
    )
  })
})
