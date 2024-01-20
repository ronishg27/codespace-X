import { Router } from "express";

const router = Router();

import {
	getUserProfile,
	loginUser,
	logoutUser,
	refreshAccessToken,
	registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// using middleware to verify jwt and clearing the tokens while logging out
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/c/:username").get(verifyJWT, getUserProfile);

export default router;
