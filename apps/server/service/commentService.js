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
const commentModel_1 = __importDefault(require("../model/commentModel"));
const profileModel_1 = __importDefault(require("../model/profileModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
class CommentService {
    // 댓글 저장 서비스
    saveComment(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(user_id)) {
                console.error("유효하지 않은 user_id입니다.");
                return null;
            }
            const body = Object.assign(Object.assign({}, data), { user_id: user_id });
            try {
                const comment = new commentModel_1.default(body);
                return yield comment.save();
            }
            catch (error) {
                console.error("댓글 저장 에러:", error);
                return null;
            }
        });
    }
    // 댓글 조회 서비스
    getComment(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(post_id)) {
                console.error("유효하지 않은 post_id입니다.");
                return null;
            }
            try {
                const comments = yield commentModel_1.default.find({ post_id }).exec();
                if (!comments)
                    return null;
                const commentsUserData = yield Promise.all(comments.map((comment) => __awaiter(this, void 0, void 0, function* () {
                    // 유저 조회
                    const user = yield userModel_1.default.findOne({ user_id: comment.user_id }).exec();
                    // 유저 프로필 이미지 조회
                    const profile = yield profileModel_1.default.findOne({
                        user_id: comment.user_id,
                    }).exec();
                    if (user && profile) {
                        return Object.assign(Object.assign({}, comment.toObject()), { nickname: user.nickname, image_url: profile.image_url });
                    }
                    return comment.toObject();
                })));
                return commentsUserData;
            }
            catch (error) {
                console.error("댓글 조회 에러", error);
                return null;
            }
        });
    }
    // 댓글 수정 서비스
    updateComment(comment_id, user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(comment_id) ||
                !mongoose_1.default.Types.ObjectId.isValid(user_id)) {
                console.error("유효하지 않은 comment_id 또는 user_id입니다.");
                return null;
            }
            try {
                const updateData = Object.assign(Object.assign({}, data), { updated_date: new Date() });
                const update = yield commentModel_1.default.findOneAndUpdate({ comment_id: comment_id, user_id: user_id }, { $set: updateData }, { new: true }).exec();
                if (update) {
                    return update;
                }
                return null;
            }
            catch (error) {
                console.error("댓글 수정 에러", error);
                return null;
            }
        });
    }
    // 댓글 삭제
    deleteComment(comment_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(comment_id) ||
                !mongoose_1.default.Types.ObjectId.isValid(user_id)) {
                console.error("유효하지 않은 comment_id 또는 user_id입니다.");
                return null;
            }
            const deleteComment = yield commentModel_1.default.findOneAndDelete({
                comment_id,
                user_id,
            });
            if (deleteComment) {
                return deleteComment;
            }
            return null;
        });
    }
}
exports.default = new CommentService();
