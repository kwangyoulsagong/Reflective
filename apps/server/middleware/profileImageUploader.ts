import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import dotenv from "dotenv";

import { Types } from "mongoose";
import Profile from "../model/profileModel";

// 토큰에서 디코딩된 사용자 정보 인터페이스
interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}

// Request에 user 필드를 추가한 인터페이스
interface AuthRequest extends Request {
  user?: DecodedToken;
}

dotenv.config();

class ProfileImageService {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET || "assetkungya";
    const region = process.env.AWS_REGION || "ap-northeast-2";

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY || "",
      },
    });
  }

  // 프로필 이미지 업로드 미들웨어 생성
  createProfileImageUploadMiddleware() {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: this.bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req: Request, file: Express.Multer.File, cb) => {
          // AuthRequest로 타입 캐스팅하여 user_id 접근
          const authReq = req as AuthRequest;
          const userId = authReq.user?.user_id || "unknown";
          const timestamp = Date.now();
          const filename = `profiles/${userId}_${timestamp}.${this.getFileExtension(file.originalname)}`;
          cb(null, filename);
        },
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        cacheControl: "max-age=31536000", // 1년 캐싱 (프로필 이미지는 자주 바뀌지 않음)
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
          cb(null, true);
        } else {
          cb(new Error("이미지 파일만 업로드 가능합니다."));
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB 제한
      },
    }).single("profileImage"); // 단일 프로필 이미지 업로드
  }

  // 파일 확장자 추출
  private getFileExtension(filename: string): string {
    return filename.split(".").pop() || "png";
  }

  // 프로필 이미지 URL 업데이트
  async updateProfileImage(userId: string, imageUrl: string): Promise<void> {
    try {
      // ObjectId로 변환
      const userObjectId = new Types.ObjectId(userId);

      // 프로필 찾기
      const profile = await Profile.findOne({ user_id: userObjectId });

      if (profile) {
        // 기존 프로필이 있으면 이미지 URL 업데이트
        profile.image_url = imageUrl;
        profile.updated_date = new Date();
        await profile.save();
      } else {
        // 프로필이 없으면 새로 생성
        await Profile.create({
          user_id: userObjectId,
          image_url: imageUrl,
          updated_date: new Date(),
        });
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
      throw error;
    }
  }

  // 기존 이미지가 있다면 S3에서 삭제
  async deleteOldProfileImage(userId: string): Promise<void> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const profile = await Profile.findOne({ user_id: userObjectId });

      if (profile && profile.image_url) {
        const urlParts = profile.image_url.split("/");
        const key = urlParts.slice(3).join("/");

        if (key && key.startsWith("profiles/")) {
          await this.s3.send(
            new DeleteObjectCommand({
              Bucket: this.bucket,
              Key: key,
            })
          );
        }
      }
    } catch (error) {
      console.error("기존 프로필 이미지 삭제 중 오류 발생:", error);
      // 삭제 실패해도 계속 진행
    }
  }
}

export default ProfileImageService;
