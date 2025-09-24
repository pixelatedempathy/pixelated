// import type { APIRoute } from 'astro'
import * as adapter from '@/adapters/betterAuthMongoAdapter'
import { getSessionFromRequest } from '@/utils/auth'
import { AuditEventType, createAuditLog } from '@/lib/audit'

export const POST = async ({
  request,
}: {
  request: Request
}): Promise<Response> => {
  try {
    // Try to get session (token) from request (Authorization header or cookie)
    const resolvedSession = await getSessionFromRequest(request)
    const accessToken = resolvedSession?.session?.token || request.headers.get('authorization')?.split(' ')[1]
    if (!accessToken) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No access token provided',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const {
      user,
      session,
      accessToken: newAccessToken,
    } = await adapter.refreshToken(accessToken) as unknown as { user: unknown; session: unknown; accessToken: string }

    // Log the session refresh for HIPAA compliance
    await createAuditLog(
      AuditEventType.LOGIN,
      'auth.session.refresh',
      user._id.toString(),
      'auth',
      {
        userId: user._id.toString(),
        email: user.email,
        timestamp: new Date().toISOString(),
      },
    )

    return new Response(
      JSON.stringify({
        success: true,
        user,
        session,
        accessToken: newAccessToken,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? String(error) : 'Unknown error',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
