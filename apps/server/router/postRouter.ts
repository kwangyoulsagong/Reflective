import { Router } from "express";
import postController from "../controller/postController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router: Router = Router();
/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: 유저 게시물 작성
 *     description: 유저 게시물 작성
 *     tags:
 *       - Post
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

router.post("/", verifyTokenMiddleware, postController.savePost);
/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: 최근 게시물 조회
 *     description: 최근 게시물 조회
 *     tags:
 *       - Post
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

router.get("/", postController.getRecentPost);
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
router.get("/:post_id", postController.getPostDetail);

/**
 * @swagger
 * /api/v1/post/{post_id}:
 *   put:
 *     summary: 게시물 수정
 *     description: 사용자가 자신의 게시물을 수정합니다.
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 게시물의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: 게시물 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 수정 성공
 *                 post:
 *                   $ref: '#/components/schemas/Post'
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
 *                   example: 게시물 없음
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 수정 에러
 *                 error:
 *                   type: string
 */

router.put("/:post_id", verifyTokenMiddleware, postController.updatePost);

/**
 * @swagger
 * /api/v1/post/{post_id}:
 *   delete:
 *     summary: 게시물 삭제
 *     description: 사용자가 자신의 게시물을 삭제합니다.
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 게시물의 ID
 *     responses:
 *       200:
 *         description: 게시물 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 삭제 성공
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
 *                   example: 게시물 없음
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 삭제 에러
 *                 error:
 *                   type: string
 */

router.delete("/:post_id", verifyTokenMiddleware, postController.deletePost);

router.get("/mypost", verifyTokenMiddleware, postController.myPost);
router.get("/favorite", verifyTokenMiddleware, postController.myFavoritePost);

export default router;
