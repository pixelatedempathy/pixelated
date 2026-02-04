import { authenticateRequest } from './auth0-middleware'
<<<<<<< HEAD
=======
import { getRolePermissions, type UserRole } from './auth0-rbac-service'
import type { AuthUser } from './types'
>>>>>>> origin/master

/**
 * Protect API route by verifying Auth0 token
 * This is a compatibility wrapper for the legacy protectApi used in various endpoints.
 * 
 * @param request The incoming Request object
 * @returns An object containing success status and user data
 */
export async function protectApi(request: Request) {
    const result = await authenticateRequest(request)

<<<<<<< HEAD
    if (!result.success) {
        return {
            success: false,
            error: result.error
        }
    }

    return {
        success: true,
        userId: result.request?.user?.id,
        user: result.request?.user,
=======
    if (!result.success || !result.request?.user) {
        return {
            success: false,
            error: result.error || 'Authentication failed'
        }
    }

    // Enhance user object with permissions
    const userFn = result.request.user;
    const authUser: AuthUser = {
        ...userFn,
        emailVerified: userFn.emailVerified ?? false,
        permissions: getRolePermissions(userFn.role as UserRole),
        name: userFn.fullName
    };

    return {
        success: true,
        userId: authUser.id,
        user: authUser,
>>>>>>> origin/master
        tokenId: result.request?.tokenId
    }
}
