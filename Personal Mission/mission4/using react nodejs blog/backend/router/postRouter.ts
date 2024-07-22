import { Router } from "express";
import postController from "../controller/postController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router:Router=Router()
/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: 유저 게시물 작성
 *     description: 유저 게시물 작성
 *     tags:
 *       - Auth
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
 *         description: 게시물 작성 성공 
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */

router.post("/",verifyTokenMiddleware,postController.savePost)
/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: 최근 게시물 조회
 *     description: 최근 게시물 조회
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 최근 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/RecentPost'
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */

router.get("/",postController.getRecentPost)
/**
 * @swagger
 * /api/v1/post/{post_id}:
 *   get:
 *     summary: 상세 게시물 조회
 *     description: 상세 게시물 조회
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 게시물의 ID
 *     responses:
 *       200:
 *         description: 상세 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.get("/:post_id",postController.getPostDetail)

export default router