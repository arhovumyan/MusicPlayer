import { Router } from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getAllUsers } from '../controller/user.controller.js'

const router = Router()

//middleware for seeing the other users
router.get('/', protectRoute, getAllUsers)

// TODO: maybe add a messaging optoin between users in the future

export default router