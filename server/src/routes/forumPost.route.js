import express from "express";
import { Post } from "../models/post.models.js";

const router = express.Router();

router.post("/uploadFormData", async (req, res) => {
  try {
    const { author, title, content, date } = req.body;
    const savedPost = await Post.create({ author, title, content, date });
    console.log(savedPost);
    res.json({ message: "Post saved successfully", savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
