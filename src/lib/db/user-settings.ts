// Use server-only helper for MongoDB types
import type { ObjectId } from "../server-only/mongodb-types"
import { mongoClient } from "./mongoClient"
import { createAuditLog } from "../audit/log"
import { getServerMongoExports } from "../server-only/mongodb-types"

let ObjectId: any

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
 * Helper to get the MongoDB collection
 */
async function getCollection() {
  if (!ObjectId) {
    const exports = await getServerMongoExports()
    ObjectId = exports.ObjectId
  }
  await mongoClient.connect()
  return mongoClient.db.collection<UserSettings>("user_settings")
}

/**
 * Utility to flatten nested objects for MongoDB dot-notation updates
 */
function flattenObject(obj: any, prefix = ""): Record<string, any> {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + "." : ""
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k]) &&
      !(obj[k] instanceof Date)
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k))
    } else {
      acc[pre + k] = obj[k]
    }
    return acc
  }, {})
}

/**
 * Get user settings
 */
export async function getUserSettings(
  userId: string,
): Promise<UserSettings | null> {
  const collection = await getCollection()
  return collection.findOne({ user_id: userId })
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const collection = await getCollection()
  const now = new Date()
  const fullSettings = {
    ...settings,
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection.insertOne(fullSettings as any)
  const createdSettings = {
    ...fullSettings,
    _id: result.insertedId,
  } as UserSettings

  // Log the event for HIPAA compliance
  await createAuditLog(
    settings.user_id,
    "user_settings_created",
    createdSettings._id!.toString(),
    "user_settings",
    {
      ipAddress: request?.headers.get("x-forwarded-for") || undefined,
      userAgent: request?.headers.get("user-agent") || undefined,
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
  const collection = await getCollection()

  // Flatten updates for nested preferences
  const flattenedUpdates: any = flattenObject(updates)
  flattenedUpdates.updatedAt = new Date()

  const result = await collection.findOneAndUpdate(
    { user_id: userId },
    { $set: flattenedUpdates },
    { returnDocument: "after", upsert: true },
  )

  // In MongoDB driver v7.1.0 (and generally v6+), findOneAndUpdate returns the document directly
  // However, some versions/configurations might return an object with a .value property.
  // Based on other files in this repo, it seems we might need .value.
  // But let's see what actually happens.

  const updatedDoc = (result as any).value || result

  if (!updatedDoc) {
    throw new Error("Failed to update user settings")
  }

  const updatedSettings = updatedDoc as UserSettings

  // Log the event for HIPAA compliance
  await createAuditLog(
    userId,
    "user_settings_updated",
    updatedSettings._id!.toString(),
    "user_settings",
    {
      updates,
      ipAddress: request?.headers.get("x-forwarded-for") || undefined,
      userAgent: request?.headers.get("user-agent") || undefined,
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
