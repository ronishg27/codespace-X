import { Router } from "express";

const router = Router();

import { createPost, fetchPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/create-post").post(verifyJWT, createPost);
router.route("/fetch-post").get(fetchPost);
export default router;
