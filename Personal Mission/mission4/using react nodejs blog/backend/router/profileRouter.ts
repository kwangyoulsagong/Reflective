
import profileController from "../controller/profileController";
import { verifyTokenMiddleware } from "../authorization/jwt";
import { Router } from "express";
const router:Router=Router()
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
router.get("/mine",verifyTokenMiddleware,profileController.GetProfile)


export default router