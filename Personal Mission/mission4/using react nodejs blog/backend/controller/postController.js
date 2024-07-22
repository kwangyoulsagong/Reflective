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
const postService_1 = __importDefault(require("../service/postService"));
class PostController {
    // 게시물 저장
    savePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!req.user) {
                    res.status(401).json({ message: '인증 권한 없음' });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield postService_1.default.savePost(userId, data);
                console.log(result);
                res.status(200).json({ message: "게시물 저장 성공" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 최근 게시물 조회
    getRecentPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService_1.default.getRecentPost();
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "게시물 조회 에러", error });
            }
        });
    }
    // 상세 게시물 조회
    getPostDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id } = req.params;
            console.log(post_id);
            try {
                const posts = yield postService_1.default.getPostDetail(post_id);
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "게시물 조회 에러", error });
            }
        });
    }
}
exports.default = new PostController;
