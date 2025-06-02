import { Router } from 'express'
import { getAllSongs, getFeaturedSongs ,getMadeForYouSongs, getTrendingSongs} from '../controllers/song.controller.js'
import { protextRoute, requireAdmin } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', protextRoute, requireAdmin, getAllSongs)
router.get('/featured', getFeaturedSongs)
router.get('/made-for-you', getMadeForYouSongs)
router.get('/trending', getTrendingSongs)

export default router