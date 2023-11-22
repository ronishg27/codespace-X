// import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(bodyParser.json());

// extracted from chai backend
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // for url encode₫
app.use(express.static("public"));
app.use(cookieParser()); //dont know the purpose yet

// routes import
import forumPostRoutes from "./routes/forumPost.route.js";
import forumFeedRoutes from "./routes/forumFeed.route.js";
import signupRoutes from "./routes/signup.route.js";

// routes declarations
app.use("/api", forumPostRoutes);
app.use("/api", forumFeedRoutes);
app.use("/api", signupRoutes);

export default app;
