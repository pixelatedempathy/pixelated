// import type { APIRoute } from 'astro'
import * as adapter from '@/adapters/betterAuthMongoAdapter'
import { createAuditLog, AuditEventType } from '@/lib/audit'
import { getSessionFromRequest } from '@/utils/auth'

type CookieStore = {
  get(name: string): { value: string } | undefined
  delete(name: string, options?: { path?: string }): void
}

export const POST = async ({ cookies, request }: { cookies: CookieStore; request?: Request }) => {
  try {
    const session = await getSessionFromRequest((request as unknown) as Request)
    const token = session?.session?.token || cookies.get('auth-token')?.value

    if (token) {
      // Invalidate the session
      await adapter.revokeToken(token)

      // Clear the auth cookie
      cookies.delete('auth-token', { path: '/' })
    }

    // Log the sign out for HIPAA compliance
    await createAuditLog(
      AuditEventType.LOGOUT,
      'auth.signout',
      'system',
      'auth',
      {
        timestamp: new Date().toISOString(),
      },
    )

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Logged out successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error: unknown) {
    console.error('Logout error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Logout failed',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
