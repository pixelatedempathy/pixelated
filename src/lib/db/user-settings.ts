// Use server-only helper for MongoDB types
import type { ObjectId } from '@/lib/server-only/mongodb-types'
import { mongoClient } from './mongoClient'
import { createAuditLog, AuditEventType } from '../audit'

let ObjectId: unknown

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

  return settings as UserSettings | null
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const now = new Date()
  const settingsToInsert = {
    ...settings,
    createdAt: now,
    updatedAt: now,
  }

  const result = await mongoClient.db
    .collection('user_settings')
    .insertOne(settingsToInsert)

  const newUserSettings = {
    ...settingsToInsert,
    _id: result.insertedId,
  }

  // Log the event
  await createAuditLog(
    AuditEventType.CREATE,
    'create_user_settings',
    settings.user_id,
    'user_settings',
    {
      settingsId: result.insertedId.toString(),
      ipAddress: request?.headers.get('x-forwarded-for'),
      userAgent: request?.headers.get('user-agent'),
    }
  )

  return newUserSettings as UserSettings
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: UpdateUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const now = new Date()
  const result = await mongoClient.db
    .collection('user_settings')
    .findOneAndUpdate(
      { user_id: userId },
      {
        $set: {
          ...updates,
          updatedAt: now
        }
      },
      { returnDocument: 'after' }
    )

  if (!result.value) {
    throw new Error('User settings not found')
  }

  // Log the event
  await createAuditLog(
    AuditEventType.MODIFY,
    'update_user_settings',
    userId,
    'user_settings',
    {
      updates,
      ipAddress: request?.headers.get('x-forwarded-for'),
      userAgent: request?.headers.get('user-agent'),
    }
  )

  return result.value as UserSettings
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
