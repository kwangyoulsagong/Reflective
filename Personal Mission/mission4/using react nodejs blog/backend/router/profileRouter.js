"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileController_1 = __importDefault(require("../controller/profileController"));
const jwt_1 = require("../authorization/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/profile/mine:
 *   get:
 *     summary: 프로필 조회
 *     description: 유저 프로필 조회
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 프로필 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/UserProfile'
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.get("/mine", jwt_1.verifyTokenMiddleware, profileController_1.default.GetProfile);
/**
 * @swagger
 * /api/v1/profile/image:
 *   put:
 *     summary: 프로필 이미지 업데이트
 *     description: 유저 프로필 이미지 업데이트
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileImage'
 *     responses:
 *       200:
 *         description: 유저 프로필 이미지 업데이트 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.put("/image", jwt_1.verifyTokenMiddleware, profileController_1.default.UpdateProfileImage);
/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: 프로필 업데이트
 *     description: 유저 프로필 업데이트
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: 유저 프로필 업데이트 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.put("/", jwt_1.verifyTokenMiddleware, profileController_1.default.UpdateProfile);
exports.default = router;
