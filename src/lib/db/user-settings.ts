// Use server-only helper for MongoDB types
import type { ObjectId } from '@/lib/server-only/mongodb-types'
import { mongoClient } from './mongoClient'
import { createAuditLog, AuditEventType } from '@/lib/audit'

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
  const db = await mongoClient.connect()
  const settings = await db
    .collection<UserSettings>('user_settings')
    .findOne({ user_id: userId })

  if (!settings) return null

  // Ensure _id is a string to match the interface
  return {
    ...settings,
    _id: settings._id?.toString() as unknown as ObjectId,
  } as UserSettings
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const db = await mongoClient.connect()
  const collection = db.collection<UserSettings>('user_settings')

  const now = new Date()
  const newSettings = {
    ...settings,
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection.insertOne(newSettings as any)

  const createdSettings = {
    ...newSettings,
    _id: result.insertedId.toString() as unknown as ObjectId,
  } as UserSettings

  // Audit log for HIPAA compliance
  await createAuditLog(
    AuditEventType.CREATE,
    'user_settings_created',
    settings.user_id,
    'user_settings',
    {
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
  const db = await mongoClient.connect()
  const collection = db.collection<UserSettings>('user_settings')

  const result = await collection.findOneAndUpdate(
    { user_id: userId },
    {
      $set: {
        ...(updates as any),
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' },
  )

  // Handle both v5 (result.value) and v6+ (result is the document)
  const updatedDoc = (
    (result as any)?.value !== undefined ? (result as any).value : result
  ) as any

  if (!updatedDoc) {
    throw new Error('User settings not found')
  }

  const updatedSettings = {
    ...updatedDoc,
    _id: updatedDoc._id?.toString() as unknown as ObjectId,
  } as UserSettings

  // Audit log for HIPAA compliance
  await createAuditLog(
    AuditEventType.MODIFY,
    'user_settings_updated',
    userId,
    'user_settings',
    {
      updates: updates as any,
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
