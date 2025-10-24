/**
 * Better-Auth Integration Tests
 * Comprehensive test suite for Better-Auth authentication system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  updateUserProfile,
  changePassword,
  validateUserRole,
  AuthenticationError,
  type User,
  type UserRole,
} from '../better-auth-integration'

vi.mock('../../redis', () => ({
  redis: {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    keys: vi.fn(),
  },
  getFromCache: vi.fn(),
  setInCache: vi.fn(),
  removeFromCache: vi.fn(),
}))

vi.mock('../../security', () => ({
  logSecurityEvent: vi.fn(),
  SecurityEventType: {
    USER_REGISTERED: 'USER_REGISTERED',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_PROFILE_UPDATED: 'USER_PROFILE_UPDATED',
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    ROLE_VALIDATION_FAILED: 'ROLE_VALIDATION_FAILED',
  },
}))

vi.mock('../../mcp/phase6-integration', () => ({
  updatePhase6AuthenticationProgress: vi.fn(),
}))

// Mock bcrypt
vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
  genSalt: vi.fn(),
}))

describe('Better-Auth Integration', () => {
  const mockUserData = {
    email: 'test@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe',
    role: 'patient' as UserRole,
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
  }

  const mockClientInfo = {
    ip: '127.0.0.1',
    userAgent: 'Mozilla/5.0',
    deviceId: 'test-device-123',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Set test environment variables
    process.env.BCRYPT_ROUNDS = '10'
    process.env.JWT_SECRET = 'test-secret-key'
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should register new user with valid data', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      const result = await registerUser(mockUserData, mockClientInfo)

      expect(result).toHaveProperty('user')
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('email', mockUserData.email)
      expect(result.user).toHaveProperty('firstName', mockUserData.firstName)
      expect(result.user).toHaveProperty('lastName', mockUserData.lastName)
      expect(result.user).toHaveProperty('role', mockUserData.role)
      expect(result.user).not.toHaveProperty('password')
      expect(result).toHaveProperty('tokenPair')
      expect(result.tokenPair).toHaveProperty('accessToken')
      expect(result.tokenPair).toHaveProperty('refreshToken')
    })

    it('should hash password securely', async () => {
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      await registerUser(mockUserData, mockClientInfo)

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 'salt123')
    })

    it('should validate email format', async () => {
      const invalidEmailData = { ...mockUserData, email: 'invalid-email' }

      await expect(
        registerUser(invalidEmailData, mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should validate password complexity', async () => {
      const weakPasswordData = { ...mockUserData, password: '123' }

      await expect(
        registerUser(weakPasswordData, mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should validate required fields', async () => {
      const incompleteData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      }

      await expect(
        registerUser(incompleteData as any, mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should check for existing email', async () => {
      const { getFromCache } = await import('../../redis')

      // Mock existing user
      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key.startsWith('user:email:')) {
          return { id: 'existing-user-id', email: mockUserData.email }
        }
        return null
      })

      await expect(registerUser(mockUserData, mockClientInfo)).rejects.toThrow(
        AuthenticationError,
      )
    })

    it('should log registration event', async () => {
      const { logSecurityEvent } = await import('../../security')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      const result = await registerUser(mockUserData, mockClientInfo)

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'USER_REGISTERED',
        result.user.id,
        expect.objectContaining({
          email: mockUserData.email,
          role: mockUserData.role,
        }),
      )
    })

    it('should update Phase 6 MCP server', async () => {
      const { updatePhase6AuthenticationProgress } = await import(
        '../../mcp/phase6-integration'
      )
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      const result = await registerUser(mockUserData, mockClientInfo)

      expect(updatePhase6AuthenticationProgress).toHaveBeenCalledWith(
        result.user.id,
        'user_registered',
      )
    })

    it('should handle HIPAA compliance for sensitive data', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        if (_key.startsWith('user:')) {
          const userData = _data as any
          expect(userData.password).toBeUndefined()
          expect(userData.phone).toBeDefined()
        }
        return true
      })

      await registerUser(mockUserData, mockClientInfo)
    })
  })

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      const result = await loginUser(
        mockUserData.email,
        mockUserData.password,
        mockClientInfo,
      )

      expect(result).toHaveProperty('user')
      expect(result.user).toHaveProperty('id', mockUser.id)
      expect(result).toHaveProperty('tokenPair')
      expect(result.tokenPair).toHaveProperty('accessToken')
      expect(result.tokenPair).toHaveProperty('refreshToken')
    })

    it('should reject invalid email', async () => {
      const { getFromCache } = await import('../../redis')

      vi.mocked(getFromCache).mockResolvedValue(null)

      await expect(
        loginUser('nonexistent@example.com', 'password123', mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should reject invalid password', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(false as any)

      await expect(
        loginUser(mockUserData.email, 'wrongpassword', mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should reject inactive user', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const inactiveUser: User = {
        ...mockUser,
        isActive: false,
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return inactiveUser
        }
        if (_key === `user:${inactiveUser.id}`) {
          return { ...inactiveUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      await expect(
        loginUser(mockUserData.email, mockUserData.password, mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should update last login timestamp', async () => {
      const { getFromCache, setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      await loginUser(mockUserData.email, mockUserData.password, mockClientInfo)

      expect(setInCache).toHaveBeenCalledWith(
        `user:${mockUser.id}`,
        expect.objectContaining({
          lastLoginAt: expect.any(Number),
        }),
      )
    })

    it('should log successful login', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      await loginUser(mockUserData.email, mockUserData.password, mockClientInfo)

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'USER_LOGIN_SUCCESS',
        mockUser.id,
        expect.objectContaining({
          email: mockUserData.email,
          clientInfo: mockClientInfo,
        }),
      )
    })

    it('should log failed login attempts', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache } = await import('../../redis')

      // Mock user not found
      vi.mocked(getFromCache).mockResolvedValue(null)

      try {
        await loginUser(
          'nonexistent@example.com',
          'password123',
          mockClientInfo,
        )
      } catch (_error) {
        // Expected to throw
      }

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'USER_LOGIN_FAILED',
        null,
        expect.objectContaining({
          email: 'nonexistent@example.com',
          reason: 'user_not_found',
        }),
      )
    })
  })

  describe('logoutUser', () => {
    it('should logout user and revoke tokens', async () => {
      const { setInCache } = await import('../../redis')

      // Mock token revocation
      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        if (_key.startsWith('revoked:')) {
          return true
        }
        return true
      })

      await logoutUser('user123', 'session123', mockClientInfo)

      expect(setInCache).toHaveBeenCalledWith(
        expect.stringMatching(/^revoked:/),
        expect.objectContaining({
          reason: 'user_logout',
        }),
        expect.any(Number),
      )
    })

    it('should log logout event', async () => {
      const { logSecurityEvent } = await import('../../security')

      await logoutUser('user123', 'session123', mockClientInfo)

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'USER_LOGOUT',
        'user123',
        expect.objectContaining({
          sessionId: 'session123',
          clientInfo: mockClientInfo,
        }),
      )
    })

    it('should update Phase 6 MCP server', async () => {
      const { updatePhase6AuthenticationProgress } = await import(
        '../../mcp/phase6-integration'
      )

      await logoutUser('user123', 'session123', mockClientInfo)

      expect(updatePhase6AuthenticationProgress).toHaveBeenCalledWith(
        'user123',
        'user_logged_out',
      )
    })
  })

  describe('getUserById', () => {
    it('should retrieve user by ID', async () => {
      const { getFromCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      const result = await getUserById('user123')

      expect(result).toEqual(mockUser)
    })

    it('should return null for non-existent user', async () => {
      const { getFromCache } = await import('../../redis')

      vi.mocked(getFromCache).mockResolvedValue(null)

      const result = await getUserById('nonexistent')

      expect(result).toBeNull()
    })

    it('should not return sensitive data', async () => {
      const { getFromCache } = await import('../../redis')

      const userWithSensitiveData = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'should-not-be-returned',
        ssn: '123-45-6789', // Sensitive data
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return userWithSensitiveData
        }
        return null
      })

      const result = await getUserById('user123')

      expect(result).not.toHaveProperty('password')
      expect(result).not.toHaveProperty('ssn')
    })
  })

  describe('updateUserProfile', () => {
    it('should update user profile with valid data', async () => {
      const { getFromCache, setInCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      const updates = {
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1987654321',
      }

      const result = await updateUserProfile('user123', updates)

      expect(result).toHaveProperty('firstName', 'Jane')
      expect(result).toHaveProperty('lastName', 'Smith')
      expect(result).toHaveProperty('phone', '+1987654321')
      expect(result).toHaveProperty('updatedAt')
    })

    it('should validate update data', async () => {
      const invalidUpdates = {
        email: 'invalid-email',
        firstName: '', // Empty name
      }

      await expect(
        updateUserProfile('user123', invalidUpdates),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should not allow role updates through profile update', async () => {
      const { getFromCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: 'patient',
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      const updates = {
        role: 'admin' as UserRole, // Attempt to change role
      }

      const result = await updateUserProfile('user123', updates)

      expect(result).toHaveProperty('role', 'patient') // Role should remain unchanged
    })

    it('should log profile update event', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache, setInCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      await updateUserProfile('user123', { firstName: 'Jane' })

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'USER_PROFILE_UPDATED',
        'user123',
        expect.objectContaining({
          updatedFields: ['firstName'],
        }),
      )
    })
  })

  describe('changePassword', () => {
    it('should change password with valid current password', async () => {
      const { getFromCache, setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser = {
        id: 'user123',
        email: mockUserData.email,
        password: 'oldHashedPassword',
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValueOnce(true as any)
      vi.mocked(bcrypt.hash).mockResolvedValueOnce('newHashedPassword')

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      await changePassword(
        'user123',
        'OldPassword123!',
        'NewPassword123!',
        mockClientInfo,
      )

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'OldPassword123!',
        'oldHashedPassword',
      )
      expect(bcrypt.hash).toHaveBeenCalledWith(
        'NewPassword123!',
        expect.any(String),
      )
    })

    it('should reject invalid current password', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser = {
        id: 'user123',
        email: mockUserData.email,
        password: 'oldHashedPassword',
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValueOnce(false as any)

      await expect(
        changePassword(
          'user123',
          'WrongPassword123!',
          'NewPassword123!',
          mockClientInfo,
        ),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should validate new password complexity', async () => {
      await expect(
        changePassword('user123', 'OldPassword123!', 'weak', mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
    })

    it('should revoke all existing tokens after password change', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser = {
        id: 'user123',
        email: mockUserData.email,
        password: 'oldHashedPassword',
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValueOnce(true as any)
      vi.mocked(bcrypt.hash).mockResolvedValueOnce('newHashedPassword')
      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      await changePassword(
        'user123',
        'OldPassword123!',
        'NewPassword123!',
        mockClientInfo,
      )

      expect(setInCache).toHaveBeenCalledWith(
        expect.stringMatching(/^revoked:/),
        expect.objectContaining({
          reason: 'password_change',
        }),
        expect.any(Number),
      )
    })

    it('should log password change event', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache, setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser = {
        id: 'user123',
        email: mockUserData.email,
        password: 'oldHashedPassword',
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValueOnce(true as any)
      vi.mocked(bcrypt.hash).mockResolvedValueOnce('newHashedPassword')
      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      await changePassword(
        'user123',
        'OldPassword123!',
        'NewPassword123!',
        mockClientInfo,
      )

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'PASSWORD_CHANGED',
        'user123',
        expect.objectContaining({
          clientInfo: mockClientInfo,
        }),
      )
    })
  })

  describe('validateUserRole', () => {
    it('should validate user role successfully', async () => {
      const { getFromCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: 'admin',
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      const result = await validateUserRole('user123', ['admin', 'therapist'])

      expect(result).toBe(true)
    })

    it('should reject user with invalid role', async () => {
      const { getFromCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: 'patient',
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      const result = await validateUserRole('user123', ['admin', 'therapist'])

      expect(result).toBe(false)
    })

    it('should reject inactive user', async () => {
      const { getFromCache } = await import('../../redis')

      const inactiveUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: 'admin',
        isActive: false,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return inactiveUser
        }
        return null
      })

      const result = await validateUserRole('user123', ['admin'])

      expect(result).toBe(false)
    })

    it('should log role validation failure', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache } = await import('../../redis')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: 'patient',
        isActive: true,
        lastLoginAt: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === 'user:user123') {
          return mockUser
        }
        return null
      })

      await validateUserRole('user123', ['admin'])

      expect(logSecurityEvent).toHaveBeenCalledWith(
        'ROLE_VALIDATION_FAILED',
        'user123',
        expect.objectContaining({
          requiredRoles: ['admin'],
          userRole: 'patient',
        }),
      )
    })
  })

  describe('Performance Requirements', () => {
    it('should meet sub-100ms registration target', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')
      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        return true
      })

      const start = performance.now()

      await registerUser(mockUserData, mockClientInfo)

      const duration = performance.now() - start
      expect(duration).toBeLessThan(100)
    })

    it('should meet sub-50ms login target', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      const start = performance.now()

      await loginUser(mockUserData.email, mockUserData.password, mockClientInfo)

      const duration = performance.now() - start
      expect(duration).toBeLessThan(50)
    })
  })

  describe('Security Requirements', () => {
    it('should enforce password complexity requirements', async () => {
      const weakPasswords = [
        '123456', // Too short
        'password', // No numbers/special chars
        'PASSWORD', // No lowercase
        'Password', // No numbers/special chars
        'Pass123', // Too short
      ]

      for (const weakPassword of weakPasswords) {
        const weakData = { ...mockUserData, password: weakPassword }
        await expect(registerUser(weakData, mockClientInfo)).rejects.toThrow(
          AuthenticationError,
        )
      }
    })

    it('should prevent timing attacks on login', async () => {
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      // Mock user not found
      vi.mocked(getFromCache).mockResolvedValue(null)

      const start = performance.now()
      await expect(
        loginUser('nonexistent@example.com', 'password123', mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
      const duration1 = performance.now() - start

      // Mock user found but wrong password
      const mockUser = {
        id: 'user123',
        email: mockUserData.email,
        password: 'hashedPassword123',
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return mockUser
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(false as any)

      const start2 = performance.now()
      await expect(
        loginUser(mockUserData.email, 'wrongpassword', mockClientInfo),
      ).rejects.toThrow(AuthenticationError)
      const duration2 = performance.now() - start2

      // Both operations should take similar time to prevent timing attacks
      expect(Math.abs(duration1 - duration2)).toBeLessThan(50) // Within 50ms
    })

    it('should sanitize user input', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      const maliciousData = {
        ...mockUserData,
        firstName: '<script>alert("XSS")</script>',
        lastName: 'Doe',
      }

      vi.mocked(setInCache).mockImplementation(async (_key, _data) => {
        if (_key.startsWith('user:')) {
          const userData = _data as any
          // Verify malicious content is sanitized
          expect(userData.firstName).not.toContain('<script>')
          expect(userData.firstName).toContain('<script>')
        }
        return true
      })

      await registerUser(maliciousData, mockClientInfo)
    })
  })

  describe('HIPAA Compliance', () => {
    it('should not log sensitive user data', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      await loginUser(mockUserData.email, mockUserData.password, mockClientInfo)

      const loggedData = vi.mocked(logSecurityEvent).mock.calls[0][2]

      // Should not contain sensitive data
      expect(JSON.stringify(loggedData)).not.toContain('password')
      expect(JSON.stringify(loggedData)).not.toContain(mockUserData.phone)
    })

    it('should mask IP addresses in logs when required', async () => {
      const { logSecurityEvent } = await import('../../security')
      const { getFromCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      const mockUser: User = {
        id: 'user123',
        email: mockUserData.email,
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        role: mockUserData.role,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getFromCache).mockImplementation(async (_key) => {
        if (_key === `user:email:${mockUserData.email}`) {
          return mockUser
        }
        if (_key === `user:${mockUser.id}`) {
          return { ...mockUser, password: 'hashedPassword123' }
        }
        return null
      })

      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      await loginUser(mockUserData.email, mockUserData.password, mockClientInfo)

      const loggedData = vi.mocked(logSecurityEvent).mock.calls[0][2]

      // IP should be masked or not included in logs
      if (loggedData.clientInfo) {
        expect(loggedData.clientInfo.ip).toBeUndefined()
      }
    })

    it('should handle data retention policies', async () => {
      const { setInCache } = await import('../../redis')
      const bcrypt = await import('bcryptjs')

      vi.mocked(bcrypt.genSalt).mockResolvedValue('salt123' as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword123')

      // Mock data retention
      vi.mocked(setInCache).mockImplementation(async (_key, _data, ttl) => {
        if (_key.startsWith('user:')) {
          // Verify TTL is set for user data
          expect(ttl).toBeDefined()
          expect(ttl).toBeGreaterThan(0)
          expect(ttl).toBeLessThanOrEqual(31536000) // Max 1 year retention
        }
        return true
      })

      await registerUser(mockUserData, mockClientInfo)
    })
  })
})
