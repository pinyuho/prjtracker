import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";

import cors from "cors";
import { dbConnection } from "./mongo.js";

import Routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.set("trust proxy", 1); // 部署到有 proxy 的環境時會需要

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // 前端網址（不可用 *）
    credentials: true,                // 允許 cookie
  })
);
app.use(express.json());
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET, // 隨機長字串
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production state 時必須 true (only allows HTTPS)
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 天
    },
  })
);

Routes(app);

dbConnection.once("open", () => {
  console.log("Connected to MongoDB.");
});

app.listen(port, () => {
  console.log(`CORS server on port: ${port}`);
});
