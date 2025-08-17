// import type { APIRoute, APIContext } from 'astro'
import { createBuildSafeLogger } from '../../../lib/logging/build-safe-logger'
import { getCurrentUser } from '../../../lib/auth'
import { MemoryService } from '../../../lib/memory'

const logger = createBuildSafeLogger('memory-api')
const memoryService = new MemoryService()

export const GET = async ({ request, cookies }) => {
  try {
    // Authenticate request
    const user = await getCurrentUser(cookies)
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Unauthorized',
          message: 'You must be authenticated to access this endpoint',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Parse query parameters
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    let limit = parseInt(url.searchParams.get('limit') || '50', 10)
    let offset = parseInt(url.searchParams.get('offset') || '0', 10)

    if (!query) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Search query parameter (q) is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Validate limit and offset
    if (isNaN(limit) || limit < 1 || limit > 100) {
      limit = 50
    }
    if (isNaN(offset) || offset < 0) {
      offset = 0
    }

    // Search memories
    const result = await memoryService.searchMemories(user.id, query, {
      limit,
      offset,
    })

    return new Response(JSON.stringify({
      success: true,
      memories: result,
      query,
      pagination: {
        limit,
        offset,
        total: result.length
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    logger.error('Error searching memories:', error)

    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
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
