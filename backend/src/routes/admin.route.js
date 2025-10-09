import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// slightly optimized clean code
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/song", createSong);
router.delete("/song/:id", deleteSong);

router.post("/album", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;
