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
class UserService {
    // 회원가입 서비스
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new userModel_1.default(data);
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
            if (user.password !== password) {
                throw new Error('비밀번호 다시 입력');
            }
            return user;
        });
    }
}
exports.default = new UserService();
