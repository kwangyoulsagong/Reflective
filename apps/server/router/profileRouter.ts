import profileController from "../controller/profileController";
import { verifyTokenMiddleware } from "../authorization/jwt";
import { Router } from "express";
const router: Router = Router();
/**
 * @swagger
 * /api/v1/profile/mine:
 *   get:
 *     summary: 프로필 조회
 *     description: 유저 프로필 조회
 *     tags:
 *       - Profile
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
router.get("/mine", verifyTokenMiddleware, profileController.GetProfile);

/**
 * @swagger
 * /api/v1/profile/image:
 *   put:
 *     summary: 프로필 이미지 업데이트
 *     description: 유저 프로필 이미지 업데이트
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileImage'
 *     responses:
 *       200:
 *         description: 유저 프로필 이미지 업데이트 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */

router.put(
  "/image",
  verifyTokenMiddleware,
  profileController.UpdateProfileImage
);

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: 프로필 업데이트
 *     description: 유저 프로필 업데이트
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: 유저 프로필 업데이트 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.put("/", verifyTokenMiddleware, profileController.UpdateProfile);

/**
 * @swagger
 * /api/v1/profile/status:
 *   put:
 *     summary: 상태 메시지 업데이트
 *     description: 유저 상태 메시지 업데이트
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_message:
 *                 type: string
 *                 description: 상태 메시지
 *             required:
 *               - status_message
 *     responses:
 *       200:
 *         description: 상태 메시지 업데이트 성공
 *       403:
 *         description: 토큰이 없음
 *       404:
 *         description: 유저가 없음
 *       401:
 *         description: 인증 권한이 없음
 */
router.put(
  "/status",
  verifyTokenMiddleware,
  profileController.UpdateStatusMessage
);

export default router;
