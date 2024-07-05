//라이브러리 가져오기
const express=require("express")
const app=express()
// 컨트롤러 가져오기
const authController=require("../controller/auth")
const postController=require

//라우터 
const router=express.Router()

/**
 * @swagger
 * /api/v1/auth/signup:
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

router.post("/signup",authController.register)



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
router.post("/login",authController.login)



module.exports=router