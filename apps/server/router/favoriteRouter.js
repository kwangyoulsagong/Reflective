"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoriteController_1 = __importDefault(require("../controller/favoriteController"));
const jwt_1 = require("../authorization/jwt");
const router = (0, express_1.Router)();
router.get("/mypage/profile", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getMyProfileInfo);
router.get("/mypage/followers", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getMyFollowers);
router.get("/mypage/followings", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getMyFollowing);
router.get("/post/:post_id", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getPostFavorite);
router.post("/", jwt_1.verifyTokenMiddleware, favoriteController_1.default.saveFavorite);
router.delete("/:favorite_id", jwt_1.verifyTokenMiddleware, favoriteController_1.default.removeFavorite);
router.get("/", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getFavoriteStory);
exports.default = router;
