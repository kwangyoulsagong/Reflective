"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyToken = verifyToken;
exports.verifyRefreshToken = verifyRefreshToken;
// jwt 라이브러리를 불러와줍니다.
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//secretekey 불러오기
const secretKey = process.env.JWT_SECRET;
//refreshsecretkey 불러오기
const refreshSecretKey = process.env.JWT_REFRESH_SECRET;
// 토큰 생성 함수
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1800s' });
}
// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, refreshSecretKey, { expiresIn: '7d' });
}
// 토큰 검증 함수
function verifyToken(token) {
    try {
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
