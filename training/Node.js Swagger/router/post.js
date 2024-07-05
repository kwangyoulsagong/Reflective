//라이브러리 가져오기
const express=require("express")
const app=express()
// 컨트롤러 가져오기
const postController=require("../controller/post")

const router=express.Router()

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *   get:
 *     summary: 포스트 조회
 *     description: ID를 통하여 상세 포스트 조회.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID를 통하여 상세 포스트 조회.
 *     responses:
 *       200:
 *         description: 포스트 조회
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetail'
 *       404:
 *         description: 포스트를 찾지 못함
 */
router.get("/:postId",postController.Post)
module.exports=router