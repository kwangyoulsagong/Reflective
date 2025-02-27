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
const profileImageUploader_1 = __importDefault(require("../middleware/profileImageUploader"));
class ProfileController {
    constructor() {
        this.profileImageService = new profileImageUploader_1.default();
    }
    // 프로필 조회
    GetProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
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
                    res.status(401).json({ message: "인증 권한 없음" });
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
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    UploadProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                // multer-s3 미들웨어 생성 및 실행
                const upload = this.profileImageService.createProfileImageUploadMiddleware();
                // multer 미들웨어를 실행하여 파일 업로드 처리
                upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(400).json({ message: err.message });
                    }
                    if (!req.file) {
                        return res
                            .status(400)
                            .json({ message: "이미지 파일이 업로드되지 않았습니다." });
                    }
                    try {
                        const file = req.file;
                        // 기존 이미지가 있다면 S3에서 삭제
                        yield this.profileImageService.deleteOldProfileImage(userId);
                        // profileService를 사용하여 이미지 URL 업데이트
                        const result = yield profileService_1.default.UpdateProfileImage(userId, file.location);
                        if (result) {
                            return res.status(200).json({
                                message: "프로필 이미지가 업로드되었습니다.",
                                image_url: file.location,
                            });
                        }
                        else {
                            return res.status(401).json({ message: "인증 권한 없음" });
                        }
                    }
                    catch (error) {
                        console.error("이미지 처리 중 오류 발생:", error);
                        return res.status(500).json({ error: error.message });
                    }
                }));
            }
            catch (error) {
                console.error("프로필 이미지 업로드 중 오류 발생:", error);
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 프로필 업데이트
    UpdateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
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
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    // 상태 메시지 업데이트
    UpdateStatusMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status_message } = req.body;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield profileService_1.default.UpdateStatusMessage(userId, status_message);
                if (result) {
                    res.status(200).json({ message: "상태 메시지가 변경되었습니다." });
                }
                else {
                    res.status(401).json({ message: "인증 권한 없음" });
                }
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
}
exports.default = new ProfileController();
