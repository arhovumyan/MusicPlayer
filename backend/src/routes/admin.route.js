import { Router } from "express";
import { createSong, deleteSong } from "../controller/admin.controller.js";
import { createAlbum, deleteAlbum, checkAdmin } from "../controller/admin.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router = Router()

//this "protectRoute,requireAdmin" is being implemented to all of them, otherwise I wouldve added it for each command after each of their route like this router.get("/check", protectRoute,requireAdmin, checkAdmin)

router.use(protectRoute,requireAdmin)

router.get("/check", checkAdmin)

router.post('/songs', createSong)
router.delete('/songs/:id', deleteSong)

router.post('/albums', createAlbum)
router.delete('/albums/:id', deleteAlbum)


export default router