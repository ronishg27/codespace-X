import express from "express";
import connectDB from "./utils/dbconfig.js";
import bodyParser from "body-parser";
import cors from "cors";
import forumPostRoutes from "./routes/forumPost.route.js";
import forumFeedRoutes from "./routes/forumFeed.route.js";
import signupRoutes from "./routes/signup.route.js";
import app from "./app.js";

connectDB();
const PORT = 5174;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());

// just for checking process
app.get("/", (req, res) => {
  res.send("Working");
});

// app.use("/api", forumPostRoutes);
// app.use("/api", forumFeedRoutes);
// app.use("/api", signupRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
