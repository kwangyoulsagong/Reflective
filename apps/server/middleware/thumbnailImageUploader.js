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
const postModel_1 = __importDefault(require("../model/postModel"));
dotenv_1.default.config();
class ThumbnailImageService {
    constructor() {
        // 썸네일 이미지 업로드 핸들러
        this.uploadThumbnail = (req, res) => {
            const upload = this.createThumbnailImageUploadMiddleware();
            upload(req, res, (err) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: err.message || "파일 업로드 중 오류가 발생했습니다.",
                    });
                }
                if (!req.file || !("key" in req.file)) {
                    return res.status(400).json({
                        success: false,
                        message: "파일이 업로드되지 않았습니다.",
                    });
                }
                // S3에 업로드된 파일의 URL 생성
                const fileKey = req.file.key;
                const fileUrl = `https://${this.bucket}.s3.amazonaws.com/${fileKey}`;
                // URL만 반환
                return res.status(200).json({
                    success: true,
                    message: "이미지가 성공적으로 업로드되었습니다.",
                    data: {
                        thumbnailUrl: fileUrl,
                    },
                });
            });
        };
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
    // 썸네일 이미지 업로드 미들웨어 생성 (비공개 메서드로 변경)
    createThumbnailImageUploadMiddleware() {
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
                    const filename = `thumbnails/${userId}_${timestamp}.${this.getFileExtension(file.originalname)}`;
                    cb(null, filename);
                },
                metadata: (req, file, cb) => {
                    cb(null, { fieldName: file.fieldname });
                },
                cacheControl: "max-age=31536000", // 1년 캐싱
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
        }).single("thumbnailImage"); // 단일 썸네일 이미지 업로드
    }
    // 파일 확장자 추출
    getFileExtension(filename) {
        return filename.split(".").pop() || "png";
    }
    // 포스트 섬네일 이미지 URL 업데이트
    updatePostThumbnail(postId, thumbnailUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ObjectId로 변환
                const postObjectId = new mongoose_1.Types.ObjectId(postId);
                // 포스트 찾기
                const post = yield postModel_1.default.findById(postObjectId);
                if (post) {
                    // 기존 포스트가 있으면 썸네일 URL 업데이트
                    post.thumbnail = thumbnailUrl;
                    post.updated_date = new Date();
                    yield post.save();
                }
                else {
                    throw new Error(`포스트를 찾을 수 없습니다: ${postId}`);
                }
            }
            catch (error) {
                console.error("썸네일 이미지 업데이트 중 오류 발생:", error);
                throw error;
            }
        });
    }
    // 기존 썸네일 이미지가 있다면 S3에서 삭제
    deleteOldThumbnail(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postObjectId = new mongoose_1.Types.ObjectId(postId);
                const post = yield postModel_1.default.findById(postObjectId);
                if (post && post.thumbnail) {
                    const urlParts = post.thumbnail.split("/");
                    const key = urlParts.slice(3).join("/");
                    if (key && key.startsWith("thumbnails/")) {
                        yield this.s3.send(new client_s3_1.DeleteObjectCommand({
                            Bucket: this.bucket,
                            Key: key,
                        }));
                    }
                }
            }
            catch (error) {
                console.error("기존 썸네일 이미지 삭제 중 오류 발생:", error);
                // 삭제 실패해도 계속 진행
            }
        });
    }
    // 새 포스트 생성 시 썸네일 이미지 URL 설정
    setPostThumbnail(postId, thumbnailUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ObjectId로 변환
                const postObjectId = new mongoose_1.Types.ObjectId(postId);
                // 포스트 찾아서 썸네일 URL 설정
                yield postModel_1.default.findByIdAndUpdate(postObjectId, {
                    thumbnail: thumbnailUrl,
                    updated_date: new Date(),
                });
            }
            catch (error) {
                console.error("포스트 썸네일 설정 중 오류 발생:", error);
                throw error;
            }
        });
    }
}
exports.default = ThumbnailImageService;
