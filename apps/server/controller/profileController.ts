import { Request, Response } from "express";
import profileService from "../service/profileService";
import ProfileImageService from "../middleware/profileImageUploader";
interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}
interface AuthRequest extends Request {
  user?: DecodedToken;
}
class ProfileController {
  private profileImageService: ProfileImageService;

  constructor() {
    this.profileImageService = new ProfileImageService();
  }
  // 프로필 조회
  public async GetProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await profileService.GetProfile(userId);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ message: "인증 권한 없음" });
      }
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  // 프로필 이미지 업데이트
  public async UpdateProfileImage(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const { image_url } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const result = await profileService.UpdateProfileImage(userId, image_url);
      if (result) {
        res.status(200).json({ message: "프로필 이미지가 변경되었습니다." });
      } else {
        res.status(401).json({ message: "인증 권한 없음" });
      }
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  public async UploadProfileImage(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;

      // multer-s3 미들웨어 생성 및 실행
      const upload =
        this.profileImageService.createProfileImageUploadMiddleware();

      // multer 미들웨어를 실행하여 파일 업로드 처리
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
          return res
            .status(400)
            .json({ message: "이미지 파일이 업로드되지 않았습니다." });
        }

        try {
          const file = req.file as Express.MulterS3.File;

          // 기존 이미지가 있다면 S3에서 삭제
          await this.profileImageService.deleteOldProfileImage(userId);

          // profileService를 사용하여 이미지 URL 업데이트
          const result = await profileService.UpdateProfileImage(
            userId,
            file.location
          );

          if (result) {
            return res.status(200).json({
              message: "프로필 이미지가 업로드되었습니다.",
              image_url: file.location,
            });
          } else {
            return res.status(401).json({ message: "인증 권한 없음" });
          }
        } catch (error: any) {
          console.error("이미지 처리 중 오류 발생:", error);
          return res.status(500).json({ error: error.message });
        }
      });
    } catch (error: any) {
      console.error("프로필 이미지 업로드 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  }
  // 프로필 업데이트
  public async UpdateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const result = await profileService.UpdateProfile(userId, data);
      if (result) {
        res.status(200).json({ message: "프로필이 변경되었습니다." });
      } else {
        res.status(401).json({ message: "인증 권한 없음" });
      }
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  // 상태 메시지 업데이트
  public async UpdateStatusMessage(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const { status_message } = req.body;

      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await profileService.UpdateStatusMessage(
        userId,
        status_message
      );

      if (result) {
        res.status(200).json({ message: "상태 메시지가 변경되었습니다." });
      } else {
        res.status(401).json({ message: "인증 권한 없음" });
      }
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
export default new ProfileController();
