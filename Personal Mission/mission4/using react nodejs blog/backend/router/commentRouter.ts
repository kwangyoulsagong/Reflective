import { Router } from "express";
import commentController from "../controller/commentController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router:Router=Router()


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
 *              $ref: '#/components/schemas/SavePost'
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

router.post("/",verifyTokenMiddleware, commentController.saveComment)

export default router