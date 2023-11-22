import express from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    }); 
    console.log("User saved successfully. ", savedUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: "Username or email already exists" });
    } else {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;
