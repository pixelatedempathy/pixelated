// Use server-only helper for MongoDB types
import { getServerMongoExports } from "@/lib/server-only/mongodb-types"
import { mongoClient } from "./mongoClient"
import { createAuditLog } from "../audit"
import type { ObjectId } from '@/lib/server-only/mongodb-types'

let ObjectIdClass: any

async function initMongo() {
  if (!ObjectIdClass) {
    const exports = await getServerMongoExports();
    ObjectIdClass = exports.ObjectId;
  }
}

async function getCollection() {
  await initMongo();
  await mongoClient.connect();
  return mongoClient.db.collection<UserSettings>("user_settings");
}


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
  const collection = await getCollection();
  return await collection.findOne({ user_id: userId });
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const collection = await getCollection();

  const newSettings: UserSettings = {
    ...settings,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await collection.insertOne(newSettings as any);

  const createdSettings = {
    ...newSettings,
    _id: result.insertedId,
  };

  await createAuditLog(
    settings.user_id,
    "settings_created",
    settings.user_id,
    "user_settings",
    {
      theme: settings.theme,
      language: settings.language,
      ipAddress: request?.headers.get("x-forwarded-for") || undefined,
      userAgent: request?.headers.get("user-agent") || undefined
    }
  );

  return createdSettings as UserSettings;
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: UpdateUserSettings,
  request?: Request,
): Promise<UserSettings> {
  const collection = await getCollection();

  const flattenedUpdates: Record<string, any> = {
    ...updates,
    updatedAt: new Date()
  };

  if (updates.preferences) {
    delete flattenedUpdates.preferences;
    Object.keys(updates.preferences).forEach(key => {
      flattenedUpdates[`preferences.${key}`] = (updates.preferences as any)[key];
    });
  }

  const result = await collection.findOneAndUpdate(
    { user_id: userId },
    { $set: flattenedUpdates },
    { returnDocument: "after", upsert: true }
  );

  if (!result) {
    throw new Error("Failed to update user settings");
  }

  await createAuditLog(
    userId,
    "settings_updated",
    userId,
    "user_settings",
    {
      updates,
      userAgent: request?.headers.get("user-agent") || undefined
    }
  );

  return result as UserSettings;
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
