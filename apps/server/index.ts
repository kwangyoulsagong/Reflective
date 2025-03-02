//라이브러리 가져오기
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import profileRouter from "./router/profileRouter";
import postRouter from "./router/postRouter";
import commentRouter from "./router/commentRouter";
import likeRouter from "./router/likeRouter";
import favoriteRouter from "./router/favoriteRouter";
import notificationRouter from "./router/notificationRouter";
import rankingRouter from "./router/rankingRouter";
import path from "path"; // path 모듈 추가

// 환경 설정 파일 먼저 로드
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const cors = require("cors");
//express 이용
const app: Express = express();
app.use(express.json()); // JSON 바디 파서 추가

// dotenv.config() 제거 (위에서 이미 로드했으므로)
app.use(
  cors({
    origin:
      "http://localhost:5173, https://reflective.site, http://reflective.site", // 클라이언트 주소
    credentials: true, // credentials 허용
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // 허용할 HTTP 메서드
    allowedHeaders: ["*"], // 모든 헤더 허용
  })
);
const port = process.env.PORT;

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/favorite", favoriteRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/rank", rankingRouter);

// 프로덕션 환경에서는 정적 파일 제공 (빌드된 프론트엔드)
if (process.env.NODE_ENV === "production") {
  // 빌드된 프론트엔드 파일 제공
  app.use(express.static(path.join(__dirname, "../../web/dist")));

  // SPA 라우팅을 위한 설정
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
    }
  });
}

mongoose
  .connect(process.env.MONGODB_URI!, {
    authSource: process.env.NODE_ENV === "production" ? "admin" : undefined,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

var db = mongoose.connection;
// 4. 연결 실패
db.on("error", function () {
  console.log("Connection Failed!");
});
// 5. 연결 성공
db.once("open", function () {
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
