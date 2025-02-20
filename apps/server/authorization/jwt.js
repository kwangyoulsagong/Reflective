"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyToken = verifyToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.verifyTokenMiddleware = verifyTokenMiddleware;
exports.verifySSETokenMiddleware = verifySSETokenMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//secretekey 불러오기
const secretKey = process.env.JWT_SECRET;
//refreshsecretkey 불러오기
const refreshSecretKey = process.env.JWT_REFRESH_SECRET;
// 토큰 생성 함수
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "3d" });
}
// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, refreshSecretKey, { expiresIn: "7d" });
}
// 토큰 검증 함수
function verifyToken(token) {
    try {
        console.log(token);
        console.log(secretKey);
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
}
// 리프레쉬 토큰 검증 함수
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, refreshSecretKey);
    }
    catch (error) {
        return null;
    }
}
function verifyTokenMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]; // header에서 access token을 가져옵니다.
    if (!token) {
        res.status(403).json({ message: "토큰이 없습니다." });
        return;
    }
    const decoded = verifyToken(token);
    console.log(decoded);
    if (!decoded) {
        res.status(401).json({ message: "인증 권한이 없음" });
        return;
    }
    req.user = decoded;
    next();
}
function verifySSETokenMiddleware(req, res, next) {
    var _a;
    // SSE는 query parameter로 토큰을 받음
    const token = (_a = req.query.authorization) === null || _a === void 0 ? void 0 : _a.toString().split("Bearer ")[1];
    if (!token) {
        // SSE의 특성을 고려한 에러 응답
        res.writeHead(401, {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
        });
        res.write(`data: ${JSON.stringify({
            type: "ERROR",
            message: "토큰이 없습니다.",
        })}\n\n`);
        res.end();
        return;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        // SSE의 특성을 고려한 에러 응답
        res.writeHead(401, {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
        });
        res.write(`data: ${JSON.stringify({
            type: "ERROR",
            message: "인증 권한이 없음",
        })}\n\n`);
        res.end();
        return;
    }
    req.user = decoded;
    next();
}
