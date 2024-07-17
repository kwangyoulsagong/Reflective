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
const { swaggerUi, specs } = require('./module/swagger.js');
const cors = require('cors');
//express 이용
const app = (0, express_1.default)();
app.use(express_1.default.json()); // JSON 바디 파서 추가
dotenv_1.default.config();
app.use(cors());
const port = process.env.PORT;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/auth', userRouter_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI);
var db = mongoose_1.default.connection;
// 4. 연결 실패
db.on('error', function () {
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function () {
    console.log('Connected!');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
