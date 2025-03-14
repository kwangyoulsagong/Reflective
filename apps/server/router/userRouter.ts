import { Router } from "express";
import userController from "../controller/userController";
const router: Router = Router();
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
router.post("/register", userController.Register);

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
router.post("/login", userController.Login);
router.post("/refresh", userController.refreshToken);
export default router;
