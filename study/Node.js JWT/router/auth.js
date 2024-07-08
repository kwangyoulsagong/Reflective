//라이브러리 가져오기
const express=require("express")
const app=express()
const { verifyToken } = require('../Authorization/jwt');
// 컨트롤러 가져오기
const authController=require("../controller/auth")

//라우터 
const router=express.Router()

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

/**
 * @swagger
 * /api/v1/auth/protected:
 *   get:
 *     summary: 보호된 엔드포인트
 *     description: 인증된 유저만 접근 가능
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         description: 토큰이 없음
 *       401:
 *         description: 인증 실패
 */
router.get("/protected",verifyTokenMiddleware,authController.test)

/**
 * @swagger
 * /api/v1/auth/profile:
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
router.get("/profile",verifyTokenMiddleware,authController.profile)

// 토큰 검증 미들웨어
function verifyTokenMiddleware(req, res, next) {
    const token = req.headers.authorization.split('Bearer ') [1]; // header에서 access token을 가져옵니다.
    if (!token) {
        return res.status(403).json({ message: '토큰이 없습니다.' });
    }

    const decoded = verifyToken(token);
    console.log(decoded)
    if (!decoded) {
        return res.status(401).json({ message: '인증 권한이 없음' });
    }

    req.decoded = decoded;
    next();
}
router.post("/refresh",authController.refresh)

module.exports=router