import { Router } from "express";
import likeController from "../controller/likeController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router: Router = Router();
/**
 * @swagger
 * /api/v1/like/{post_id}:
 *   patch:
 *     summary: 좋아요 업데이트
 *     description: 게시물에 좋아요를 추가하거나 제거
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시물 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_liked:
 *                 type: boolean
 *                 description: 좋아요 상태 (true 또는 false)
 *             required:
 *               - is_liked
 *     responses:
 *       200:
 *         description: 좋아요 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: 잘못된 요청 데이터
 *       401:
 *         description: 인증 권한 없음
 *       404:
 *         description: 좋아요 업데이트 실패
 *       500:
 *         description: 서버 에러
 */

router.patch("/:post_id", verifyTokenMiddleware, likeController.toggleLike);
/**
 * @swagger
 * /api/v1/like/{post_id}:
 *   get:
 *     summary: 좋아요 확인 여부 조회
 *     description: 게시물에 사용자가 좋아요 확인 여부
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시물 ID
 *     responses:
 *       200:
 *         description: 좋아요 확인 여부 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: 잘못된 요청 데이터
 *       401:
 *         description: 인증 권한 없음
 *       404:
 *         description: 좋아요 확인 여부 실패
 *       500:
 *         description: 서버 에러
 */
router.get("/:post_id", verifyTokenMiddleware, likeController.getLike);
export default router;
