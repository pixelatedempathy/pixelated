// Use server-only helper for MongoDB types
import type { ObjectId } from '@/lib/server-only/mongodb-types'
import { mongoClient } from './mongoClient'
import { createAuditLog, AuditEventType } from '../audit'

// MongoDB-based user settings types

export interface UserSettings {
  _id?: ObjectId
  user_id: string
  theme: string
  notifications_enabled: boolean
  email_notifications: boolean
  language: string
  preferences: {
    showWelcomeScreen: boolean
    autoSave: boolean
    fontSize: string
    [key: string]: unknown
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface NewUserSettings {
  user_id: string
  theme: string
  notifications_enabled: boolean
  email_notifications: boolean
  language: string
  preferences: {
    showWelcomeScreen: boolean
    autoSave: boolean
    fontSize: string
    [key: string]: unknown
  }
}

export interface UpdateUserSettings {
  theme?: string
  notifications_enabled?: boolean
  email_notifications?: boolean
  language?: string
  preferences?: {
    showWelcomeScreen?: boolean
    autoSave?: boolean
    fontSize?: string
    [key: string]: unknown
  }
}

/**
 * Get user settings
 */
export async function getUserSettings(
  userId: string,
): Promise<UserSettings | null> {
  const settings = await mongoClient.db
    .collection('user_settings')
    .findOne({ user_id: userId })

  if (!settings) return null

  return {
    ...settings,
    _id: settings._id?.toString(),
  } as UserSettings
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const settingsWithTimestamps = {
    ...settings,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await mongoClient.db
    .collection('user_settings')
    .insertOne(settingsWithTimestamps)

  const createdSettings = {
    ...settingsWithTimestamps,
    _id: result.insertedId.toString(),
  } as UserSettings

  // Log the event for HIPAA compliance
  await createAuditLog(
    AuditEventType.CREATE,
    'user_settings_created',
    settings.user_id,
    'user_settings',
    {
      resourceId: result.insertedId.toString(),
      ipAddress: request?.headers.get('x-forwarded-for') || undefined,
      userAgent: request?.headers.get('user-agent') || undefined,
    },
  )

  return createdSettings
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: UpdateUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const result = await mongoClient.db
    .collection('user_settings')
    .findOneAndUpdate(
      { user_id: userId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after', upsert: true },
    )

  if (!result) {
    throw new Error('Failed to update user settings')
  }

  const updatedSettings = {
    ...result,
    _id: result._id?.toString(),
  } as UserSettings

  // Log the event for HIPAA compliance
  await createAuditLog(
    AuditEventType.MODIFY,
    'user_settings_updated',
    userId,
    'user_settings',
    {
      updates: updates as any,
      resourceId: updatedSettings._id,
      ipAddress: request?.headers.get('x-forwarded-for') || undefined,
      userAgent: request?.headers.get('user-agent') || undefined,
    },
  )

  return updatedSettings
}

/**
 * Get or create user settings
 */
export async function getOrCreateUserSettings(
  userId: string,
  request?: Request,
): Promise<UserSettings> {
  // Try to get existing settings
  const settings = await getUserSettings(userId)

  // If settings exist, return them
  if (settings) {
    return settings
  }

  // Otherwise, create default settings
  const defaultSettings: NewUserSettings = {
    user_id: userId,
    theme: 'system',
    notifications_enabled: true,
    email_notifications: true,
    language: 'en',
    preferences: {
      showWelcomeScreen: true,
      autoSave: true,
      fontSize: 'medium',
    },
  }

  return createUserSettings(defaultSettings, request)
}

/**
 * Update theme preference
 */
export async function updateTheme(
  userId: string,
  theme: string,
  request?: Request,
): Promise<UserSettings> {
  return updateUserSettings(userId, { theme }, request)
}

/**
 * Update language preference
 */
export async function updateLanguage(
  userId: string,
  language: string,
  request?: Request,
): Promise<UserSettings> {
  return updateUserSettings(userId, { language }, request)
}

/**
 * Toggle notification settings
 */
export async function toggleNotifications(
  userId: string,
  enabled: boolean,
  request?: Request,
): Promise<UserSettings> {
  return updateUserSettings(userId, { notifications_enabled: enabled }, request)
}

/**
 * Toggle email notification settings
 */
export async function toggleEmailNotifications(
  userId: string,
  enabled: boolean,
  request?: Request,
): Promise<UserSettings> {
  return updateUserSettings(userId, { email_notifications: enabled }, request)
}
