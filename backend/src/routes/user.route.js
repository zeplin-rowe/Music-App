import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// todo: getMessages between 2 users

export default router;
