"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = __importDefault(require("../controller/commentController"));
const jwt_1 = require("../authorization/jwt");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: 유저 댓글 작성
 *     description: 유저가 게시물 댓글 작성
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/SaveComment'
 *     responses:
 *       200:
 *         description: 댓글 작성 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.post("/", jwt_1.verifyTokenMiddleware, commentController_1.default.saveComment);
/**
 * @swagger
 * /api/v1/comments/{post_id}:
 *   get:
 *     summary: 게시물 댓글 조회
 *     description: 상세 게시물 댓글 조회
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 조회할 게시물의 ID
 *     responses:
 *       200:
 *         description: 상세 게시물 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Comment'
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.get("/:post_id", commentController_1.default.getComment);
exports.default = router;
