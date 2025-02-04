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
const profileService_1 = __importDefault(require("../service/profileService"));
class ProfileController {
    // 프로필 조회
    GetProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: '인증 권한 없음' });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield profileService_1.default.GetProfile(userId);
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(401).json({ message: "인증 권한 없음" });
                }
                ;
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    // 프로필 이미지 업데이트
    UpdateProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_url } = req.body;
                if (!req.user) {
                    res.status(401).json({ message: '인증 권한 없음' });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield profileService_1.default.UpdateProfileImage(userId, image_url);
                if (result) {
                    res.status(200).json({ message: "프로필 이미지가 변경되었습니다." });
                }
                else {
                    res.status(401).json({ message: "인증 권한 없음" });
                }
                ;
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    // 프로필 업데이트
    UpdateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!req.user) {
                    res.status(401).json({ message: '인증 권한 없음' });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield profileService_1.default.UpdateProfile(userId, data);
                if (result) {
                    res.status(200).json({ message: "프로필이 변경되었습니다." });
                }
                else {
                    res.status(401).json({ message: "인증 권한 없음" });
                }
                ;
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
}
exports.default = new ProfileController;
