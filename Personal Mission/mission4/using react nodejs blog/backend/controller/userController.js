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
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    // 회원가입 컨틀롤러
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.default.Register(req.body);
                console.log(user);
                res.status(201).json(user);
            }
            catch (error) {
                console.error(error);
                // 에러 메시지에 따라 상태 코드 설정
                if (error.message === "모든 필드를 입력해야 합니다.") {
                    res.status(400).json({ error: error.message });
                }
                else if (error.message === "이미 등록된 이메일입니다.") {
                    res.status(409).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: "회원가입에 실패 하였습니다." });
                }
            }
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield userService_1.default.Login(email, password);
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(401).json({ message: "인증 권한 없음" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(401).json({ error: error.message });
            }
        });
    }
}
exports.default = new UserController();
