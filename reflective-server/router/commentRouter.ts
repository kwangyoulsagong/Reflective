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

router.post("/",verifyTokenMiddleware, commentController.saveComment)


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

router.get("/:post_id",commentController.getComment)

/**
 * @swagger
 * /api/v1/comments/{comment_id}:
 *   put:
 *     summary: 게시물 댓글 수정
 *     description: 사용자가 자신의 댓글을 수정합니다.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 댓글 댓글의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveComment'
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 수정 성공
 *        
 *       401:
 *         description: 인증 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 인증 권한 없음
 *       404:
 *         description: 게시물 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 없음
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 수정 에러
 *                 error:
 *                   type: string
 */

router.put("/:comment_id",verifyTokenMiddleware,commentController.updateComment)

/**
 * @swagger
 * /api/v1/comments/{comment_id}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 사용자가 자신의 댓글을 삭제합니다.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 댓글의 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 삭제 성공
 *       401:
 *         description: 인증 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 인증 권한 없음
 *       404:
 *         description: 댓글 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 없음
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 삭제 에러
 *                 error:
 *                   type: string
 */


router.delete("/:comment_id",verifyTokenMiddleware,commentController.deleteComment)

export default router