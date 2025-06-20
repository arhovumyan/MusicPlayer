import { Router } from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getStats } from '../controller/stats.controller.js'
import { requireAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', protectRoute, requireAdmin, getStats)

export default router