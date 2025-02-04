"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: 회원가입
 *     description: 유저 생성 회원가입
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/register', userController_1.default.Register);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: 로그인
 *     description: 유저 로그인
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: 회원 로그인 성공
 *       401:
 *         description: 인증 권한 없음
 */
router.post('/login', userController_1.default.Login);
exports.default = router;
