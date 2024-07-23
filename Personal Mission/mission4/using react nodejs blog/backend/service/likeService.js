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
const likeModel_1 = __importDefault(require("../model/likeModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
// 좋아요 서비스
class LikeService {
    // 좋아요 확인 여부 서비스
    IsLike(post_id, user_id, is_liked) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 기존의 좋아요 기록을 찾음
                const existingLike = yield likeModel_1.default.findOne({ post_id: post_id, user_id: user_id }).exec();
                console.log(existingLike);
                if (is_liked) {
                    if (!existingLike) {
                        // 좋아요 추가
                        const newLike = new likeModel_1.default({ post_id, user_id, is_liked: true });
                        yield newLike.save();
                        // 게시물의 좋아요 수 증가
                        yield postModel_1.default.findOneAndUpdate({ post_id: post_id }, { $inc: { like_count: 1 } }).exec();
                        return newLike;
                    }
                    else if (!existingLike.is_liked) {
                        // 이미 존재하는 좋아요를 활성화
                        existingLike.is_liked = true;
                        existingLike.updated_date = new Date();
                        yield existingLike.save();
                        // 게시물의 좋아요 수 증가
                        yield postModel_1.default.findOneAndUpdate({ post_id: post_id }, { $inc: { like_count: 1 } }).exec();
                        return existingLike;
                    }
                }
                else {
                    if (existingLike && existingLike.is_liked) {
                        // 좋아요 비활성화
                        existingLike.is_liked = false;
                        existingLike.updated_date = new Date();
                        yield existingLike.save();
                        // 게시물의 좋아요 수 감소
                        yield postModel_1.default.findOneAndUpdate({ post_id: post_id }, { $inc: { like_count: -1 } }).exec();
                        return existingLike;
                    }
                }
                return null;
            }
            catch (error) {
                console.error("좋아요 업데이트 에러", error);
                return null;
            }
        });
    }
}
exports.default = new LikeService;
