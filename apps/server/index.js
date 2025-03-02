"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//라이브러리 가져오기
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const profileRouter_1 = __importDefault(require("./router/profileRouter"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
const likeRouter_1 = __importDefault(require("./router/likeRouter"));
const favoriteRouter_1 = __importDefault(require("./router/favoriteRouter"));
const notificationRouter_1 = __importDefault(require("./router/notificationRouter"));
const rankingRouter_1 = __importDefault(require("./router/rankingRouter"));
const path_1 = __importDefault(require("path")); // path 모듈 추가
const { swaggerUi, specs } = require("./module/swagger.js");
const cors = require("cors");
//express 이용
const app = (0, express_1.default)();
app.use(express_1.default.json()); // JSON 바디 파서 추가
dotenv_1.default.config();
app.use(cors({
    origin: "http://localhost:5173", // 클라이언트 주소
    credentials: true, // credentials 허용
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // 허용할 HTTP 메서드
    allowedHeaders: ["*"], // 모든 헤더 허용
}));
const port = process.env.PORT;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/auth", userRouter_1.default);
app.use("/api/v1/profile", profileRouter_1.default);
app.use("/api/v1/post", postRouter_1.default);
app.use("/api/v1/comments", commentRouter_1.default);
app.use("/api/v1/like", likeRouter_1.default);
app.use("/api/v1/favorite", favoriteRouter_1.default);
app.use("/api/v1/notifications", notificationRouter_1.default);
app.use("/api/v1/rank", rankingRouter_1.default);
// 프로덕션 환경에서는 정적 파일 제공 (빌드된 프론트엔드)
if (process.env.NODE_ENV === "production") {
    // 빌드된 프론트엔드 파일 제공
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../web/dist")));
    // SPA 라우팅을 위한 설정
    app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile(path_1.default.join(__dirname, "../../web/dist/index.html"));
        }
    });
}
mongoose_1.default.connect(process.env.MONGODB_URI);
var db = mongoose_1.default.connection;
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
