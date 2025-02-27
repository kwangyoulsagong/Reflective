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
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const profileModel_1 = __importDefault(require("../model/profileModel"));
dotenv_1.default.config();
class ProfileImageService {
    constructor() {
        this.bucket = process.env.AWS_S3_BUCKET || "assetkungya";
        const region = process.env.AWS_REGION || "ap-northeast-2";
        this.s3 = new client_s3_1.S3Client({
            region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || "",
                secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY || "",
            },
        });
    }
    // 프로필 이미지 업로드 미들웨어 생성
    createProfileImageUploadMiddleware() {
        return (0, multer_1.default)({
            storage: (0, multer_s3_1.default)({
                s3: this.s3,
                bucket: this.bucket,
                contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                key: (req, file, cb) => {
                    var _a;
                    // AuthRequest로 타입 캐스팅하여 user_id 접근
                    const authReq = req;
                    const userId = ((_a = authReq.user) === null || _a === void 0 ? void 0 : _a.user_id) || "unknown";
                    const timestamp = Date.now();
                    const filename = `profiles/${userId}_${timestamp}.${this.getFileExtension(file.originalname)}`;
                    cb(null, filename);
                },
                metadata: (req, file, cb) => {
                    cb(null, { fieldName: file.fieldname });
                },
                cacheControl: "max-age=31536000", // 1년 캐싱 (프로필 이미지는 자주 바뀌지 않음)
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith("image/")) {
                    cb(null, true);
                }
                else {
                    cb(new Error("이미지 파일만 업로드 가능합니다."));
                }
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB 제한
            },
        }).single("profileImage"); // 단일 프로필 이미지 업로드
    }
    // 파일 확장자 추출
    getFileExtension(filename) {
        return filename.split(".").pop() || "png";
    }
    // 프로필 이미지 URL 업데이트
    updateProfileImage(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ObjectId로 변환
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                // 프로필 찾기
                const profile = yield profileModel_1.default.findOne({ user_id: userObjectId });
                if (profile) {
                    // 기존 프로필이 있으면 이미지 URL 업데이트
                    profile.image_url = imageUrl;
                    profile.updated_date = new Date();
                    yield profile.save();
                }
                else {
                    // 프로필이 없으면 새로 생성
                    yield profileModel_1.default.create({
                        user_id: userObjectId,
                        image_url: imageUrl,
                        updated_date: new Date(),
                    });
                }
            }
            catch (error) {
                console.error("프로필 이미지 업데이트 중 오류 발생:", error);
                throw error;
            }
        });
    }
    // 기존 이미지가 있다면 S3에서 삭제
    deleteOldProfileImage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                const profile = yield profileModel_1.default.findOne({ user_id: userObjectId });
                if (profile && profile.image_url) {
                    const urlParts = profile.image_url.split("/");
                    const key = urlParts.slice(3).join("/");
                    if (key && key.startsWith("profiles/")) {
                        yield this.s3.send(new client_s3_1.DeleteObjectCommand({
                            Bucket: this.bucket,
                            Key: key,
                        }));
                    }
                }
            }
            catch (error) {
                console.error("기존 프로필 이미지 삭제 중 오류 발생:", error);
                // 삭제 실패해도 계속 진행
            }
        });
    }
}
exports.default = ProfileImageService;
