import express from "express";
import { User } from "../models/user.models";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkingUser = await User.findOne({ username: username });
    if (!checkingUser) {
      console.log("User not found with username " + username);
    } else {
      const passwordMatch = bcrypt.compare(password, checkingUser.password);
      if (passwordMatch) {
        console.log("Successfully logged in.");
        res.status(200).json({ message: "Login successful" });
      } else {
        console.log("Incorrect password.");
        res.status(401).json({ error: "Incorrect password" });
      }
    }
  } catch (error) {
    console.error("Error logging in: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
