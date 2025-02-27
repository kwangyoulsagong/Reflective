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
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield postService_1.default.savePost(userId, data);
                res.status(200).json({ message: "게시물 저장 성공", result });
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
    // 상세 게시물 수정
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id } = req.params;
            const data = req.body;
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const updatedPost = yield postService_1.default.updatePost(post_id, userId, data);
                if (updatedPost) {
                    res.status(200).json({ message: "게시물이 수정 되었습니다." });
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "게시물 수정 에러", error: error.message });
            }
        });
    }
    // 상세 게시물 삭제
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id } = req.params;
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const deletePost = yield postService_1.default.deletePost(post_id, userId);
                if (deletePost) {
                    res.status(200).json({ message: "게시물이 삭제 되었습니다." });
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "게시물 삭제 에러", error: error.message });
            }
        });
    }
    myPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                console.log("/ghfhjalksjlksj");
                const myPost = yield postService_1.default.myPost(userId);
                if (myPost) {
                    res.status(200).json(myPost);
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "내 게시물 조회 에러", error: error.message });
            }
        });
    }
    myFavoritePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const myPost = yield postService_1.default.getFavoritePosts(userId);
                if (myPost) {
                    res.status(200).json(myPost);
                }
                else {
                    res.status(404).json({ message: "게시물 없음" });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "내 즐겨찾기 한 게시물 조회 에러",
                    error: error.message,
                });
            }
        });
    }
}
exports.default = new PostController();
