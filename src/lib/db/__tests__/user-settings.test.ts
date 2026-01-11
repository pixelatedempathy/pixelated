import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createUserSettings, getUserSettings, updateUserSettings } from '../user-settings'
import { mongoClient } from '../mongoClient'
import { createAuditLog } from '../../audit'

// Mock dependencies
vi.mock('../mongoClient', () => ({
  mongoClient: {
    db: {
      collection: vi.fn(),
    },
  },
}))

vi.mock('../../audit', () => ({
  createAuditLog: vi.fn(),
  AuditEventType: {
    CREATE: 'create',
    MODIFY: 'modify',
  },
}))

describe('User Settings DB', () => {
  const mockCollection = {
    findOne: vi.fn(),
    insertOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(mongoClient.db.collection).mockReturnValue(mockCollection as any)
  })

  describe('createUserSettings', () => {
    it('should create user settings and log audit event', async () => {
      const newSettings = {
        user_id: 'user123',
        theme: 'dark',
        notifications_enabled: true,
        email_notifications: true,
        language: 'en',
        preferences: {
          showWelcomeScreen: true,
          autoSave: true,
          fontSize: 'medium',
        },
      }

      const insertedId = 'new-id'
      mockCollection.insertOne.mockResolvedValue({ insertedId })

      const result = await createUserSettings(newSettings)

      expect(mongoClient.db.collection).toHaveBeenCalledWith('user_settings')
      expect(mockCollection.insertOne).toHaveBeenCalledWith(expect.objectContaining({
        ...newSettings,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }))

      expect(createAuditLog).toHaveBeenCalledWith(
        'create',
        'create_user_settings',
        'user123',
        'user_settings',
        expect.any(Object)
      )

      expect(result).toEqual(expect.objectContaining({
        ...newSettings,
        _id: insertedId,
      }))
    })
  })

  describe('getUserSettings', () => {
    it('should return user settings if found', async () => {
      const mockSettings = { user_id: 'user123', theme: 'light' }
      mockCollection.findOne.mockResolvedValue(mockSettings)

      const result = await getUserSettings('user123')

      expect(mongoClient.db.collection).toHaveBeenCalledWith('user_settings')
      expect(mockCollection.findOne).toHaveBeenCalledWith({ user_id: 'user123' })
      expect(result).toEqual(mockSettings)
    })

    it('should return null if not found', async () => {
      mockCollection.findOne.mockResolvedValue(null)

      const result = await getUserSettings('user123')

      expect(result).toBeNull()
    })
  })

  describe('updateUserSettings', () => {
    it('should update user settings and log audit event', async () => {
      const updates = { theme: 'dark' }
      const updatedSettings = { user_id: 'user123', theme: 'dark' }

      mockCollection.findOneAndUpdate.mockResolvedValue({ value: updatedSettings })

      const result = await updateUserSettings('user123', updates)

      expect(mongoClient.db.collection).toHaveBeenCalledWith('user_settings')
      expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
        { user_id: 'user123' },
        {
          $set: expect.objectContaining({
            ...updates,
            updatedAt: expect.any(Date),
          })
        },
        { returnDocument: 'after' }
      )

      expect(createAuditLog).toHaveBeenCalledWith(
        'modify',
        'update_user_settings',
        'user123',
        'user_settings',
        expect.any(Object)
      )

      expect(result).toEqual(updatedSettings)
    })

    it('should throw error if user settings not found', async () => {
      mockCollection.findOneAndUpdate.mockResolvedValue({ value: null })

      await expect(updateUserSettings('user123', { theme: 'dark' }))
        .rejects.toThrow('User settings not found')
    })
  })
})
