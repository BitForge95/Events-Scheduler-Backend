import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { createEvent, deleteEvent, readEvent, updateEvent } from "../controllers/event.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/create").post(authMiddleware,createEvent)
router.route("/read").get(authMiddleware,readEvent)
router.route("/update/:id").put(authMiddleware,updateEvent)
router.route("/delete/:id").delete(authMiddleware,deleteEvent)

export default router