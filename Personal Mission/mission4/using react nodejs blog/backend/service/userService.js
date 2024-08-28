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
const profileModel_1 = __importDefault(require("../model/profileModel"));
class UserService {
    // 회원가입 서비스
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 유저 중복 검증
            const existingUser = yield userModel_1.default.findOne({ email: data.email });
            if (existingUser) {
                throw new Error("이미 사용중인 이메일입니다.");
            }
            const user = new userModel_1.default(data);
            yield user.save();
            // 회원 가입 성고시 프로필 추가
            const profileData = {
                user_id: user.user_id,
                image_url: null,
            };
            const profile = new profileModel_1.default(profileData);
            yield profile.save();
            return user;
        });
    }
    // 로그인 서비스
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // 이메일로 사용자 검증
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error("유저 정보 없음");
            }
            // 비밀번호 검증
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw new Error("비밀번호 다시 입력");
            }
            const accessToken = (0, jwt_1.generateToken)({ user_id: user.user_id.toString() });
            const refreshToken = (0, jwt_1.generateRefreshToken)({
                user_id: user.user_id.toString(),
            });
            return {
                user_id: user.user_id.toString(),
                nickname: user.nickname,
                email: user.email,
                accessToken,
                refreshToken,
            };
        });
    }
}
exports.default = new UserService();
