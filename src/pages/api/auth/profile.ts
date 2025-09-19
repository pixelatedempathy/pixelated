export const prerender = false
import type { APIContext } from 'astro'
import { mongoAuthService } from '@/services/mongoAuth.service'
import { verifyAuthToken } from '@/utils/auth'

/**
 * User profile endpoint
 * GET /api/auth/profile - Get current user profile
 * PUT /api/auth/profile - Update user profile
 */
export const GET = async ({ request }: APIContext) => {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

  const { userId } = await verifyAuthToken(authHeader)
    
    // If auth is disabled, return mock user data
    if (process.env.DISABLE_AUTH === 'true') {
      return new Response(
        JSON.stringify({
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'user',
            preferences: {},
            emailVerified: true,
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
    
    const user = await mongoAuthService.getUserById(userId)

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user._id?.toString(),
          email: user.email,
          role: user.role,
          preferences: user.preferences,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: unknown) {
    console.error('Get profile error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? String(error) : 'Failed to get profile',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export const PUT = async ({ request }: APIContext) => {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

  const { userId } = await verifyAuthToken(authHeader)
    const updates = await request.json()

    // If auth is disabled, return mock success response
    if (process.env.DISABLE_AUTH === 'true') {
      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'user',
            preferences: updates.preferences || {},
            emailVerified: true,
            updatedAt: new Date().toISOString(),
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Only allow updating profile fields
  const allowedFields = ['preferences']
    const safeUpdates = Object.keys(updates)
      .filter((key) => allowedFields.includes(key))
      .reduce<Record<string, unknown>>((obj, key) => {
        obj[key] = updates[key]
        return obj
      }, {})

    if (Object.keys(safeUpdates).length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid fields to update' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const updatedUser = await mongoAuthService.updateUser(userId, safeUpdates)

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: updatedUser._id?.toString(),
          email: updatedUser.email,
          role: updatedUser.role,
          preferences: updatedUser.preferences,
          emailVerified: updatedUser.emailVerified,
          updatedAt: updatedUser.updatedAt,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: unknown) {
    console.error('Update profile error:', error)
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? String(error) : 'Failed to update profile',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
