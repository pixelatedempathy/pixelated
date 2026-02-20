import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserSettings, createUserSettings, updateUserSettings } from '../user-settings'
import { mongoClient } from '../mongoClient'
import { createAuditLog } from '../../audit/log'

vi.mock('../mongoClient', () => ({
  mongoClient: {
    connect: vi.fn().mockResolvedValue(undefined),
    db: {
      collection: vi.fn(),
    },
  },
  default: {
    connect: vi.fn().mockResolvedValue(undefined),
    db: {
      collection: vi.fn(),
    },
  }
}))

vi.mock('../../audit/log', () => ({
  createAuditLog: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('../server-only/mongodb-types', () => ({
  getServerMongoExports: vi.fn().mockResolvedValue({
    ObjectId: class MockObjectId {
      constructor(public id: string = 'mock-id') {}
      toString() { return this.id }
    },
  }),
}))

describe('user-settings database operations', () => {
  const mockCollection = {
    findOne: vi.fn(),
    insertOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(mongoClient.db.collection as any).mockReturnValue(mockCollection)
  })

  it('should get user settings', async () => {
    const mockSettings = { user_id: 'user123', theme: 'dark' }
    mockCollection.findOne.mockResolvedValue(mockSettings)

    const result = await getUserSettings('user123')

    expect(result).toEqual(mockSettings)
    expect(mockCollection.findOne).toHaveBeenCalledWith({ user_id: 'user123' })
  })

  it('should create user settings', async () => {
    const newSettings = {
      user_id: 'user123',
      theme: 'light',
      notifications_enabled: true,
      email_notifications: true,
      language: 'en',
      preferences: {
        showWelcomeScreen: true,
        autoSave: true,
        fontSize: 'medium',
      },
    }
    mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

    const result = await createUserSettings(newSettings)

    expect(result).toMatchObject(newSettings)
    expect(result._id.toString()).toBe('new-id')
    expect(mockCollection.insertOne).toHaveBeenCalled()
    expect(createAuditLog).toHaveBeenCalledWith(
      'user123',
      'user_settings_created',
      'new-id',
      'user_settings',
      expect.any(Object)
    )
  })

  it('should update user settings with flattened preferences', async () => {
    const updates = {
      theme: 'dark',
      preferences: {
        autoSave: false,
      },
    }
    const mockUpdatedDoc = {
      _id: 'existing-id',
      user_id: 'user123',
      ...updates,
    }
    mockCollection.findOneAndUpdate.mockResolvedValue(mockUpdatedDoc)

    const result = await updateUserSettings('user123', updates)

    expect(result).toEqual(mockUpdatedDoc)
    expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
      { user_id: 'user123' },
      {
        $set: expect.objectContaining({
          theme: 'dark',
          'preferences.autoSave': false,
          updatedAt: expect.any(Date),
        }),
      },
      { returnDocument: 'after', upsert: true }
    )
    expect(createAuditLog).toHaveBeenCalledWith(
      'user123',
      'user_settings_updated',
      'existing-id',
      'user_settings',
      expect.any(Object)
    )
  })
})
