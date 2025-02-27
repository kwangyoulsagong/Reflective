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
const mongoose_1 = require("mongoose");
const postModel_1 = __importDefault(require("../model/postModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const favoriteModel_1 = __importDefault(require("../model/favoriteModel"));
class PostService {
    // 게시물 저장
    savePost(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                user_id: user_id,
                title: data.title,
                contents: data.contents,
                category: data.category,
                thumbnail: data.thumbnail,
                like_count: data.like_count,
            };
            const post = new postModel_1.default(body);
            if (post) {
                const savedPost = yield post.save();
                return {
                    post_id: savedPost.post_id,
                    title: savedPost.title,
                };
            }
            return null;
        });
    }
    // 게시물 조회
    getRecentPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 좋아요가 많은 순으로 정렬된 최신 게시물 4개를 먼저 가져옴
                const topPost = yield postModel_1.default.find()
                    .sort({ like_count: -1, created_date: -1 })
                    .limit(3)
                    .exec();
                // 만약 좋아요 수가 0 개인 경우
                const tryCatchTop = topPost.some((post) => post.like_count > 0);
                let recentPosts = [];
                if (tryCatchTop) {
                    //최신순으로 가져옴(top 4 제외)
                    recentPosts = (yield postModel_1.default.find({
                        _id: { $nin: topPost.map((post) => post._id) },
                    })
                        .sort({ created_date: -1 })
                        .exec());
                }
                // 좋아요 수가 0개인경우 최신수으로 가져옴
                else {
                    recentPosts = (yield postModel_1.default.find()
                        .sort({ created_date: -1 })
                        .exec());
                }
                const posts = [...topPost, ...recentPosts];
                // nickname 추가
                const nicknameWithPosts = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield userModel_1.default.findOne({ user_id: post.user_id });
                    if (user) {
                        return Object.assign(Object.assign({}, post.toObject()), { nickname: user.nickname });
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
    // 상세 게시물 조회
    getPostDetail(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findOne({ post_id }).exec();
                if (post) {
                    const user = yield userModel_1.default.findOne({ user_id: post.user_id }).exec();
                    if (user) {
                        return Object.assign(Object.assign({}, post.toObject()), { nickname: user.nickname });
                    }
                    return post.toObject();
                }
                return null;
            }
            catch (error) {
                console.error("게시물 조회 에러", error);
                return null;
            }
        });
    }
    // 상세 게시물 수정
    updatePost(post_id, user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = Object.assign(Object.assign({}, data), { updated_date: new Date() });
            const update = yield postModel_1.default.findOneAndUpdate({ post_id, user_id }, { $set: updateData }, { new: true }).exec();
            if (update) {
                return update;
            }
            return null;
        });
    }
    // 상세 게시물 삭제
    deletePost(post_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePost = yield postModel_1.default.findOneAndDelete({ post_id, user_id });
            if (deletePost) {
                return deletePost;
            }
            return null;
        });
    }
    // 내포스트 조회
    myPost(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPosts = (yield postModel_1.default.find({ user_id: user_id })
                    .sort({ created_date: -1 })
                    .exec());
                if (myPosts.length === 0) {
                    return [];
                }
                const user = yield userModel_1.default.findOne({ user_id });
                const nickname = user ? user.nickname : null;
                const postsWithNickname = myPosts.map((post) => {
                    return Object.assign(Object.assign({}, post.toObject()), { nickname: nickname });
                });
                return postsWithNickname;
            }
            catch (error) {
                console.error("내 게시물 조회 에러", error);
                return null;
            }
        });
    }
    // 즐겨찾기한 포스트 조회
    getFavoritePosts(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Favorite 모델 동적 임포트
                const userObjectId = new mongoose_1.Types.ObjectId(user_id);
                // 즐겨찾기한 유저 목록 가져오기
                const favoriteUsers = yield favoriteModel_1.default.find({
                    user_id: userObjectId,
                    is_favorite: true,
                }).select("favorite_user_id");
                if (!favoriteUsers || favoriteUsers.length === 0) {
                    return [];
                }
                const favoriteUserIds = favoriteUsers.map((fav) => fav.favorite_user_id);
                // 즐겨찾기한 유저들의 포스트 조회
                const favoritePosts = (yield postModel_1.default.find({
                    user_id: { $in: favoriteUserIds },
                })
                    .sort({ created_date: -1 })
                    .exec());
                // 닉네임 추가
                const postsWithDetails = yield Promise.all(favoritePosts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    const postUser = yield userModel_1.default.findOne({ user_id: post.user_id });
                    return Object.assign(Object.assign({}, post.toObject()), { nickname: postUser ? postUser.nickname : null, is_favorite: true });
                })));
                return postsWithDetails;
            }
            catch (error) {
                console.error("즐겨찾기 포스트 조회 에러", error);
                return null;
            }
        });
    }
    searchPostsComprehensive(searchTerm_1) {
        return __awaiter(this, arguments, void 0, function* (searchTerm, page = 1, limit = 5) {
            try {
                if (!searchTerm || searchTerm.trim() === "") {
                    return {
                        posts: [],
                        total: 0,
                        totalPages: 0,
                    };
                }
                const skip = (page - 1) * limit;
                // 닉네임으로 사용자 ID 찾기
                const users = yield userModel_1.default.find({
                    nickname: { $regex: searchTerm, $options: "i" },
                });
                const userIds = users.map((user) => user.user_id);
                // 검색 쿼리 구성 (제목, 내용, 작성자 닉네임)
                const searchQuery = {
                    $or: [
                        { title: { $regex: searchTerm, $options: "i" } },
                        { contents: { $regex: searchTerm, $options: "i" } },
                        { user_id: { $in: userIds } },
                    ],
                };
                // 검색 조건에 맞는 전체 게시물 수 계산
                const total = yield postModel_1.default.countDocuments(searchQuery);
                const totalPages = Math.ceil(total / limit);
                // 검색 조건에 맞는 게시물 가져오기 (페이지네이션 적용)
                const posts = yield postModel_1.default.find(searchQuery)
                    .sort({ created_date: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                if (!posts || posts.length === 0) {
                    return {
                        posts: [],
                        total: 0,
                        totalPages: 0,
                    };
                }
                // 각 게시물에 닉네임 추가
                const postsWithNickname = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield userModel_1.default.findOne({ user_id: post.user_id });
                    return Object.assign(Object.assign({}, post.toObject()), { nickname: user ? user.nickname : null });
                })));
                return {
                    posts: postsWithNickname,
                    total,
                    totalPages,
                };
            }
            catch (error) {
                console.error("통합 검색 에러", error);
                return null;
            }
        });
    }
}
exports.default = new PostService();
