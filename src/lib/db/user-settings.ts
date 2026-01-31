import type {
  Collection as MongoCollection,
  ObjectId as MongoObjectId,
  Db,
} from 'mongodb'

// Use server-only helper for MongoDB types
import type { ObjectId } from '@/lib/server-only/mongodb-types'

// Runtime shape of our MongoDB wrapper (from src/config/mongodb.config.ts)
type MongoRuntime = {
  connect: () => Promise<Db>
  getDb: () => Db
  client?: unknown
}

// Use conditional imports to prevent MongoDB from being bundled on client side
let mongodb: MongoRuntime | null = null
let serverDepsPromise: Promise<void> | null = null

async function initializeDependencies() {
  if (serverDepsPromise) {
    return serverDepsPromise
  }
  if (typeof window === 'undefined') {
    serverDepsPromise = (async () => {
      try {
        // Use relative import to ensure consistent resolution and avoid alias issues in some bundlers
        const mod = await import('../../config/mongodb.config')
        mongodb = mod.default as unknown as MongoRuntime
      } catch {
        mongodb = null
      }
    })()
  } else {
    mongodb = null
    serverDepsPromise = Promise.resolve()
  }
  return serverDepsPromise
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

// Internal type for MongoDB document to handle _id type mismatch
// UserSettings defines _id as string (via ObjectId type alias), but MongoDB uses object
type UserSettingsDocument = Omit<UserSettings, '_id'> & {
  _id: MongoObjectId
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

async function getCollection(): Promise<MongoCollection<UserSettingsDocument>> {
  await initializeDependencies()
  if (!mongodb) {
    throw new Error('MongoDB client not initialized')
  }
  const db = await mongodb.connect()
  return db.collection<UserSettingsDocument>('user_settings')
}

/**
 * Get user settings
 */
export async function getUserSettings(
  userId: string,
): Promise<UserSettings | null> {
  try {
    const collection = await getCollection()
    const settings = await collection.findOne({ user_id: userId })

    if (!settings) {
      return null
    }

    return {
      ...settings,
      _id: settings._id.toString(),
    } as unknown as UserSettings
  } catch (error) {
    console.error('Error fetching user settings:', error)
    return null
  }
}

/**
 * Create user settings
 */
export async function createUserSettings(
  settings: NewUserSettings,
  _request?: Request,
): Promise<UserSettings> {
  try {
    const collection = await getCollection()
    const now = new Date()
    const newSettings: Omit<UserSettingsDocument, '_id'> = {
      ...settings,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(
      newSettings as UserSettingsDocument,
    )
    const createdSettings = await collection.findOne({
      _id: result.insertedId,
    })

    if (!createdSettings) {
      throw new Error('Failed to create user settings')
    }

    return {
      ...createdSettings,
      _id: createdSettings._id.toString(),
    } as unknown as UserSettings
  } catch (error) {
    console.error('Error creating user settings:', error)
    // Fallback for error cases - preserve original behavior of returning input
    return {
      ...settings,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as UserSettings
  }
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: UpdateUserSettings,
  _request?: Request,
): Promise<UserSettings> {
  try {
    const collection = await getCollection()

    // Flatten nested preferences updates if necessary
    const setOp: Record<string, any> = {
      updatedAt: new Date(),
    }

    if (updates.theme !== undefined) setOp.theme = updates.theme
    if (updates.notifications_enabled !== undefined)
      setOp.notifications_enabled = updates.notifications_enabled
    if (updates.email_notifications !== undefined)
      setOp.email_notifications = updates.email_notifications
    if (updates.language !== undefined) setOp.language = updates.language

    if (updates.preferences) {
      for (const [key, value] of Object.entries(updates.preferences)) {
        setOp[`preferences.${key}`] = value
      }
    }

    const result = await collection.findOneAndUpdate(
      { user_id: userId },
      { $set: setOp },
      { returnDocument: 'after' },
    )

    if (!result) {
      throw new Error('User settings not found for update')
    }

    return {
      ...result,
      _id: result._id.toString(),
    } as unknown as UserSettings
  } catch (error) {
    console.error('Error updating user settings:', error)
    // Fallback
    return {
      user_id: userId,
      ...updates,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as UserSettings
  }
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
