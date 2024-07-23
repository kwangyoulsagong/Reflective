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
const likeService_1 = __importDefault(require("../service/likeService"));
// 좋아요 컨트롤러
class LikeController {
    toggleLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.params;
                const { is_liked } = req.body;
                if (!req.user) {
                    res.status(401).json({ message: '인증 권한 없음' });
                    return;
                }
                const userId = req.user.user_id;
                const result = yield likeService_1.default.IsLike(post_id, userId, is_liked);
                console.log(result);
                if (result) {
                    res.status(200).json({ message: is_liked ? '좋아요 추가 성공' : '좋아요 제거 성공' });
                }
                else {
                    res.status(400).json({ message: '좋아요 업데이트 실패' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new LikeController;
