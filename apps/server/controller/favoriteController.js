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
const favoriteService_1 = __importDefault(require("../service/favoriteService"));
const notificationService_1 = __importDefault(require("../service/notificationService"));
class FavoriteController {
    // 즐겨찾기 추가 메서드
    saveFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { favorite_id } = req.body;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield favoriteService_1.default.addFavorite(userId, favorite_id);
                if (result) {
                    yield notificationService_1.default.sendNotification({
                        type: "FOLLOW",
                        sender_id: userId,
                        receiver_id: favorite_id,
                    });
                    res.status(200).json({ message: "즐겨찾기 추가 성공" });
                    return;
                }
                res.status(404).json({ message: "즐겨찾기 추가 실패" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 즐겨찾기 삭제 메서드
    removeFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { favorite_id } = req.params;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield favoriteService_1.default.removeFavorite(userId, favorite_id);
                if (result) {
                    res.status(200).json({ message: "즐겨찾기 삭제 성공" });
                    return;
                }
                res.status(404).json({ message: "즐겨찾기 삭제 실패" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 포스트에 대한 즐겨찾기 여부 확인 컨트롤러
    getPostFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.params; // 요청 파라미터에서 post_id 가져오기
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id; // 현재 사용자 ID
                const favorite = yield favoriteService_1.default.getPostFavorite(userId, post_id);
                if (favorite) {
                    res.status(200).json({ is_favorite: true, favorite });
                    return;
                }
                res.status(200).json({ is_favorite: false }); // 즐겨찾기하지 않은 경우
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getFavoriteStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const posts = yield favoriteService_1.default.getFavoriteStory(userId);
                // posts가 없더라도 빈 배열 반환
                res.status(200).json(posts || []);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getMyProfileInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const profileInfo = yield favoriteService_1.default.getMyProfile(userId);
                if (!profileInfo) {
                    res.status(404).json({ message: "프로필 정보를 찾을 수 없습니다." });
                    return;
                }
                res.status(200).json(profileInfo);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getMyFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const followers = yield favoriteService_1.default.getMyFollowers(userId);
                res.status(200).json(followers || []);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getMyFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const following = yield favoriteService_1.default.getMyFollowing(userId);
                res.status(200).json(following || []);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 다른 사용자 프로필 조회 메서드
    getUserProfileInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const currentUserId = req.user.user_id;
                const profileInfo = yield favoriteService_1.default.getUserProfile(user_id, currentUserId);
                if (!profileInfo) {
                    res.status(404).json({ message: "프로필 정보를 찾을 수 없습니다." });
                    return;
                }
                res.status(200).json(profileInfo);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getUserFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const followers = yield favoriteService_1.default.getUserFollowers(user_id);
                res.status(200).json(followers || []);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getUserFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const following = yield favoriteService_1.default.getUserFollowing(user_id);
                res.status(200).json(following || []);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new FavoriteController();
