// import type { APIRoute, APIContext } from 'astro'
export const prerender = false
import { mongoAuthService } from '@/services/mongoAuth.service'

/**
 * Sign up endpoint
 * POST /api/auth/signup
 */
export const POST = async ({ request }) => {
  try {
    const { email, password, role = 'user' } = await request.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate password strength
    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          error: 'Password must be at least 8 characters long',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const user = await mongoAuthService.createUser(email, password, role)

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user._id?.toString() || user.id,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        message: 'User created successfully',
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Sign up error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Sign up failed',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
