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
const { swaggerUi, specs } = require("./module/swagger.js");
const cors = require("cors");
//express 이용
const app: Express = express();
app.use(express.json()); // JSON 바디 파서 추가
dotenv.config();
app.use(cors());
const port = process.env.PORT;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/favorite", favoriteRouter);

mongoose.connect(process.env.MONGODB_URI!);
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
