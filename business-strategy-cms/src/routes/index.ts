import { Router } from 'express'
import { authRouter } from './auth'
import { userRouter } from './users'
import { onboardingRouter } from './onboarding'
import { documentRouter } from './documents'
import { marketRouter } from './market'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { strategyRouter } from './strategy'
>>>>>>> origin/master
>>>>>>> origin/master

const router = Router()

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/onboarding', onboardingRouter)
router.use('/documents', documentRouter)
router.use('/market', marketRouter)
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
router.use('/strategy', strategyRouter)
>>>>>>> origin/master
>>>>>>> origin/master
// router.use('/workflows', workflowRoutes)

export { router as apiRouter }
