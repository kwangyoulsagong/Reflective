"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoriteController_1 = __importDefault(require("../controller/favoriteController"));
const jwt_1 = require("../authorization/jwt");
const router = (0, express_1.Router)();
router.post("/", jwt_1.verifyTokenMiddleware, favoriteController_1.default.saveFavorite); // 즐겨찾기 추가
router.delete("/:favorite_id", jwt_1.verifyTokenMiddleware, favoriteController_1.default.removeFavorite); // 즐겨찾기 삭제
router.get("/post/:post_id", jwt_1.verifyTokenMiddleware, favoriteController_1.default.getPostFavorite);
exports.default = router;
