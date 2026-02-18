import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserSettings, createUserSettings, updateUserSettings } from '../user-settings';
import { mongoClient } from '../mongoClient';
import { createAuditLog } from '../../audit';

vi.mock('../mongoClient', () => ({
  mongoClient: {
    connect: vi.fn().mockResolvedValue(undefined),
    db: {
      collection: vi.fn()
    }
  }
}));

vi.mock('../../audit', () => ({
  createAuditLog: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/lib/server-only/mongodb-types', () => ({
  getServerMongoExports: vi.fn().mockResolvedValue({ ObjectId: class {} })
}));

describe('user-settings', () => {
  const mockCollection = {
    findOne: vi.fn(),
    insertOne: vi.fn(),
    findOneAndUpdate: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (mongoClient.db.collection as any).mockReturnValue(mockCollection);
  });

  it('getUserSettings should query collection by user_id', async () => {
    mockCollection.findOne.mockResolvedValue({ user_id: 'user123', theme: 'dark' });
    const result = await getUserSettings('user123');
    expect(mockCollection.findOne).toHaveBeenCalledWith({ user_id: 'user123' });
    expect(result).toEqual({ user_id: 'user123', theme: 'dark' });
  });

  it('createUserSettings should insert document and log audit event', async () => {
    const settings = {
      user_id: 'user123',
      theme: 'light',
      notifications_enabled: true,
      email_notifications: true,
      language: 'en',
      preferences: {
        showWelcomeScreen: true,
        autoSave: true,
        fontSize: 'medium'
      }
    };
    mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' });

    const result = await createUserSettings(settings);

    expect(mockCollection.insertOne).toHaveBeenCalled();
    expect(createAuditLog).toHaveBeenCalledWith(
      'user123',
      'settings_created',
      'user123',
      'user_settings',
      expect.objectContaining({ theme: 'light', language: 'en' })
    );
    expect(result._id).toBe('new-id');
  });

  it('updateUserSettings should use flatten preferences and use findOneAndUpdate', async () => {
    const updates = {
      theme: 'dark',
      preferences: {
        autoSave: false
      }
    };
    mockCollection.findOneAndUpdate.mockResolvedValue({ user_id: 'user123', theme: 'dark', preferences: { autoSave: false } });

    const result = await updateUserSettings('user123', updates);

    expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
      { user_id: 'user123' },
      {
        $set: expect.objectContaining({
          theme: 'dark',
          'preferences.autoSave': false,
          updatedAt: expect.any(Date)
        })
      },
      { returnDocument: 'after', upsert: true }
    );
    expect(createAuditLog).toHaveBeenCalledWith(
      'user123',
      'settings_updated',
      'user123',
      'user_settings',
      expect.objectContaining({ updates })
    );
    expect(result.theme).toBe('dark');
  });
});
