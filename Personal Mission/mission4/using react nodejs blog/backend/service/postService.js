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
const postModel_1 = __importDefault(require("../model/postModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
class PostService {
    // 게시물 저장
    savePost(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                user_id: user_id,
                title: data.title,
                contents: data.contents,
                like_count: data.like_count
            };
            const post = new postModel_1.default(body);
            return yield post.save();
        });
    }
    // 게시물 조회 
    getRecentPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 좋아요가 많은 순으로 정렬된 최신 게시물 3개를 먼저 가져옴
                const topPost = yield postModel_1.default.find().sort({ like_count: -1, created_date: -1 }).limit(3).exec();
                // 만약 좋아요 수가 0 개인 경우
                const tryCatchTop = topPost.some(post => post.like_count > 0);
                let recentPosts = [];
                if (tryCatchTop) {
                    //최신순으로 가져옴(top 3 제외)
                    recentPosts = (yield postModel_1.default.find({ _id: { $nin: topPost.map(post => post._id) } })
                        .sort({ created_date: -1 })
                        .exec());
                }
                // 좋아요 수가 0개인경우 최신수으로 가져옴
                else {
                    recentPosts = (yield postModel_1.default.find().sort({ created_date: -1 }).exec());
                }
                const posts = [...topPost, ...recentPosts];
                // nickname 추가
                const nicknameWithPosts = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield userModel_1.default.findOne({ user_id: post.user_id });
                    if (user) {
                        return (Object.assign(Object.assign({}, post.toObject()), { nickname: user.nickname }));
                    }
                    return post.toObject();
                })));
                return nicknameWithPosts;
            }
            catch (error) {
                console.error("게시물 조회 에러", error);
                return null;
            }
        });
    }
}
exports.default = new PostService;
