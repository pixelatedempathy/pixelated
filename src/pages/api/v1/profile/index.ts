// API route implementation for user profile endpoints
import { protectRoute } from '@/lib/auth/serverAuth'
import type { AuthUser } from '@/lib/auth/types'
import * as adapter from '@/adapters/betterAuthMongoAdapter'
import { createBuildSafeLogger } from '@/lib/logging/build-safe-logger'
// Removed AuthAPIContext import - using direct type annotation instead

export const prerender = false

// Initialize services
const logger = createBuildSafeLogger('profile-api')

// GET endpoint for profile data
export const GET = protectRoute({
  validateIPMatch: true,
  validateUserAgent: true,
})(async ({
  locals,
}: {
  params: Record<string, string | undefined>
  request: Request
  locals: { user: AuthUser }
}) => {
  try {
    const { user } = locals

    // Get user profile from MongoDB
    const userProfile = (await adapter.getUserById(user.id)) as unknown as {
      _id: { toString(): string }
      fullName?: string
      avatarUrl?: string | null
      email: string
      role: string
      lastLogin?: Date
      updatedAt?: Date
      createdAt?: Date
      preferences?: unknown
    } | null

    if (!userProfile) {
      logger.error(`Profile not found for user ${user.id}`)
      return new Response(
        JSON.stringify({
          error: 'Profile not found',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Return sanitized profile data
    return new Response(
      JSON.stringify({
        profile: {
          id: userProfile._id.toString(),
          fullName: userProfile.fullName || userProfile.email.split('@')[0],
          avatarUrl: userProfile.avatarUrl || null,
          email: userProfile.email,
          role: userProfile.role,
          lastLogin: userProfile.lastLogin || userProfile.updatedAt,
          createdAt: userProfile.createdAt,
          updatedAt: userProfile.updatedAt,
          preferences: userProfile.preferences || {},
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: unknown) {
    logger.error('Unexpected error in profile API:', { error })
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
})

// PUT endpoint to update profile data
export const PUT = protectRoute({
  validateIPMatch: true,
  validateUserAgent: true,
})(async ({
  request,
  locals,
}: {
  params: Record<string, string | undefined>
  request: Request
  locals: { user: AuthUser }
}) => {
  try {
    const { user } = locals
    const data = await request.json()

    // Validate input data
    const { fullName, avatarUrl, preferences } = data
    const updates: Record<string, unknown> = {}

    // Only include fields that were provided - using bracket notation for type safety
    if (fullName !== undefined) {
      updates['fullName'] = fullName
    }
    if (avatarUrl !== undefined) {
      updates['avatarUrl'] = avatarUrl
    }
    if (preferences !== undefined) {
      updates['preferences'] = preferences
    }

    // Update profile in MongoDB
    const updatedUser = (await adapter.updateUser(
      user.id,
      updates,
    )) as unknown as {
      _id: { toString(): string }
      fullName?: string
      avatarUrl?: string | null
      email: string
      role: string
      lastLogin?: Date
      updatedAt?: Date
      createdAt?: Date
      preferences?: unknown
    } | null

    if (!updatedUser) {
      logger.error(`Error updating profile for user ${user.id}`)
      return new Response(
        JSON.stringify({
          error: 'Failed to update profile',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Return updated profile data
    return new Response(
      JSON.stringify({
        profile: {
          id: updatedUser._id.toString(),
          fullName: updatedUser.fullName || updatedUser.email.split('@')[0],
          avatarUrl: updatedUser.avatarUrl || null,
          email: updatedUser.email,
          role: updatedUser.role,
          lastLogin: updatedUser.lastLogin || updatedUser.updatedAt,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
          preferences: updatedUser.preferences || {},
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: unknown) {
    logger.error('Unexpected error updating profile:', { error })
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
})
