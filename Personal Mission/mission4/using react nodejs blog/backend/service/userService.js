"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const jwt_1 = require("../authorization/jwt");
class UserService {
    // 회원가입 서비스
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new userModel_1.default(data);
            //유저 저장
            return yield user.save();
        });
    }
    // 로그인 서비스
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // 이메일로 사용자를 찾습니다.
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error('유저 정보 없음');
            }
            // 비밀번호 검증
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw new Error('비밀번호 다시 입력');
            }
            const accessToken = (0, jwt_1.generateToken)({ user_id: user.user_id.toString() });
            const refreshToken = (0, jwt_1.generateRefreshToken)({ user_id: user.user_id.toString() });
            return { nickname: user.nickname, accessToken, refreshToken };
        });
    }
}
exports.default = new UserService();
