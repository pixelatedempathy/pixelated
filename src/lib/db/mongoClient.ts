// Thin MongoDB client adapter (renamed from src/lib/supabase.ts)
// Purpose: provide a consistent export for the shared MongoDB client and related auth service.

import { mongoAuthService } from '../../services/mongoAuth.service'

// Lazy-load mongodb to avoid static/dynamic import conflict
let mongodb: any = null
async function getMongoDBInstance() {
  if (!mongodb) {
    const mod = await import('../../config/mongodb.config')
    mongodb = mod.default
  }
  return mongodb
}

// MongoDB client type (re-export for convenience)
export type MongoDBClient = Awaited<ReturnType<typeof getMongoDBInstance>>

// Environment variable helpers (kept minimal and local)
interface ProcessEnv {
  NODE_ENV?: string
  MONGODB_URI?: string
  MONGODB_DB_NAME?: string
  JWT_SECRET?: string
  [key: string]: string | undefined
}

const processEnv = (
  typeof process !== 'undefined' ? process.env : {}
) as ProcessEnv

function getEnvVar(keys: string[], fallback?: string): string {
  for (const key of keys) {
    const value = processEnv[key]
    if (value) {
      return value
    }
  }
  if (fallback) {
    return fallback
  }
  throw new Error(
    `Missing required environment variable(s): ${keys.join(', ')}`,
  )
}

export function getMongoDBUri(): string {
  return getEnvVar(['MONGODB_URI'], 'mongodb://localhost:27017')
}

export function getMongoDBName(): string {
  return getEnvVar(['MONGODB_DB_NAME'], 'pixelated_empathy')
}

export function getJWTSecret(): string {
  return getEnvVar(['JWT_SECRET'], 'development-secret-change-in-production')
}

export async function initializeDatabase() {
  try {
    const mongodb = await getMongoDBInstance()
    await mongodb.connect()
    console.log('✅ MongoDB connected successfully')
    return true
  } catch (error: unknown) {
    console.error('❌ Failed to connect to MongoDB:', error)
    return false
  }
}

export async function getDatabaseHealth() {
  try {
    const mongodb = await getMongoDBInstance()
    const isHealthy = await mongodb.healthCheck()
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      type: 'mongodb',
      database: getMongoDBName(),
    }
  } catch (error: unknown) {
    return {
      status: 'unhealthy',
      type: 'mongodb',
      error: error instanceof Error ? String(error) : 'Unknown error',
    }
  }
}

export const mongoClient = getMongoDBInstance()
// Prefer adapter-based auth exports for application code
export { default as authAdapter } from '@/adapters/betterAuthMongoAdapter'
export const authService = mongoAuthService // legacy export; prefer `authAdapter`
export { getMongoDBInstance as mongodb, mongoAuthService }

console.log('📦 MongoDB library initialized (src/lib/db/mongoClient.ts)')
