import { Router } from "express";

const router = Router();

import {
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
router.route("/logout").post(refreshAccessToken);

export default router;
