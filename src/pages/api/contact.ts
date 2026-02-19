import type { APIContext } from 'astro'
import { ContactService } from '../../lib/services/contact/ContactService'
import { createBuildSafeLogger } from '../../lib/logging/build-safe-logger'
import {
  rateLimitMiddleware,
  getClientIp,
} from '../../lib/auth/middleware'

// Create a scoped logger for this endpoint
const logger = createBuildSafeLogger('api/contact')

// Initialize contact service
const contactService = new ContactService()

const ALLOWED_ORIGINS = [
  'https://pixelatedempathy.com',
  process.env.ALLOWED_ORIGIN || 'http://localhost:4321',
]

export const POST = async ({ request }: APIContext) => {
  const startTime = Date.now()

  // Set CORS headers
  const origin = request.headers.get('origin')
  const corsOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Vary': 'Origin',
  }

  // Apply rate limiting (3 attempts per hour for contact form)
  const rateLimitResult = await rateLimitMiddleware(request, 'contact', 3, 60)
  if (!rateLimitResult.success) {
    const response = rateLimitResult.response!
    // Add CORS headers to rate limit response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }

  try {
    // Parse request data
    let formData: Record<string, unknown>
    try {
      formData = await request.json()
    } catch (error: unknown) {
      logger.warn('Invalid JSON in contact form request', {
        error: error instanceof Error ? String(error) : 'Unknown error',
        userAgent: request.headers.get('user-agent'),
        ip: getClientIp(request),
      })

      return new Response(
        JSON.stringify({
          success: false,
          message:
            'Invalid request format. Please check your data and try again.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        },
      )
    }

    // Validate required fields exist
    const requiredFields = ['name', 'email', 'subject', 'message']
    for (const field of requiredFields) {
      if (
        !formData[field] ||
        typeof formData[field] !== 'string' ||
        !(formData[field] as string).trim()
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Missing or invalid field: ${field}`,
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          },
        )
      }
    }

    // Prepare contact form data
    const contactFormData = {
      name: formData['name'] as string,
      email: formData['email'] as string,
      subject: formData['subject'] as string,
      message: formData['message'] as string,
    }

    // Prepare submission context
    const submissionContext = {
      ipAddress: getClientIp(request),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      timestamp: new Date().toISOString(),
    }

    // Submit contact form through service
    const result = await contactService.submitContactForm(
      contactFormData,
      submissionContext,
    )

    // Log the submission attempt
    const duration = Date.now() - startTime
    logger.info('Contact form submission processed', {
      success: result.success,
      submissionId: result.submissionId,
      email: contactFormData.email,
      ipAddress: submissionContext.ipAddress,
      duration: `${duration}ms`,
    })

    // Return response
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (error: unknown) {
    const duration = Date.now() - startTime

    logger.error('Contact form submission failed with unexpected error', {
      error: error instanceof Error ? String(error) : 'Unknown error',
      stack: error instanceof Error ? (error as Error)?.stack : undefined,
      userAgent: request.headers.get('user-agent'),
      ip: getClientIp(request),
      duration: `${duration}ms`,
    })

    return new Response(
      JSON.stringify({
        success: false,
        message:
          'An unexpected error occurred. Please try again later or contact support if the problem persists.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    )
  }
}

// OPTIONS endpoint for CORS preflight
export const OPTIONS = async ({ request }: APIContext) => {
  const origin = request.headers.get('origin')
  const corsOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  })
}
