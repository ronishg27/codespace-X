import express from "express";
import { Post } from "../models/post.models.js";

const router = express.Router();

router.get("/forumFeed", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
