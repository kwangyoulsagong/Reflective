import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { Types } from "mongoose";
import Post from "../model/postModel";

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

class ThumbnailImageService {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET || "assetkungya";
    const region = process.env.AWS_REGION || "ap-northeast-2";

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  // 썸네일 이미지 업로드 핸들러
  uploadThumbnail = (req: Request, res: Response) => {
    const upload = this.createThumbnailImageUploadMiddleware();

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "파일 업로드 중 오류가 발생했습니다.",
        });
      }

      if (!req.file || !("key" in req.file)) {
        return res.status(400).json({
          success: false,
          message: "파일이 업로드되지 않았습니다.",
        });
      }

      // S3에 업로드된 파일의 URL 생성
      const fileKey = (req.file as any).key;
      const fileUrl = `https://${this.bucket}.s3.amazonaws.com/${fileKey}`;

      // URL만 반환
      return res.status(200).json({
        success: true,
        message: "이미지가 성공적으로 업로드되었습니다.",
        data: {
          thumbnailUrl: fileUrl,
        },
      });
    });
  };

  // 썸네일 이미지 업로드 미들웨어 생성 (비공개 메서드로 변경)
  private createThumbnailImageUploadMiddleware() {
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
          const filename = `thumbnails/${userId}_${timestamp}.${this.getFileExtension(file.originalname)}`;
          cb(null, filename);
        },
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        cacheControl: "max-age=31536000", // 1년 캐싱
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
          cb(null, true);
        } else {
          cb(new Error("이미지 파일만 업로드 가능합니다."));
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB 제한
      },
    }).single("thumbnailImage"); // 단일 썸네일 이미지 업로드
  }

  // 파일 확장자 추출
  private getFileExtension(filename: string): string {
    return filename.split(".").pop() || "png";
  }

  // 포스트 섬네일 이미지 URL 업데이트
  async updatePostThumbnail(
    postId: string,
    thumbnailUrl: string
  ): Promise<void> {
    try {
      // ObjectId로 변환
      const postObjectId = new Types.ObjectId(postId);

      // 포스트 찾기
      const post = await Post.findById(postObjectId);

      if (post) {
        // 기존 포스트가 있으면 썸네일 URL 업데이트
        post.thumbnail = thumbnailUrl;
        post.updated_date = new Date();
        await post.save();
      } else {
        throw new Error(`포스트를 찾을 수 없습니다: ${postId}`);
      }
    } catch (error) {
      console.error("썸네일 이미지 업데이트 중 오류 발생:", error);
      throw error;
    }
  }

  // 기존 썸네일 이미지가 있다면 S3에서 삭제
  async deleteOldThumbnail(postId: string): Promise<void> {
    try {
      const postObjectId = new Types.ObjectId(postId);
      const post = await Post.findById(postObjectId);

      if (post && post.thumbnail) {
        const urlParts = post.thumbnail.split("/");
        const key = urlParts.slice(3).join("/");

        if (key && key.startsWith("thumbnails/")) {
          await this.s3.send(
            new DeleteObjectCommand({
              Bucket: this.bucket,
              Key: key,
            })
          );
        }
      }
    } catch (error) {
      console.error("기존 썸네일 이미지 삭제 중 오류 발생:", error);
      // 삭제 실패해도 계속 진행
    }
  }

  // 새 포스트 생성 시 썸네일 이미지 URL 설정
  async setPostThumbnail(postId: string, thumbnailUrl: string): Promise<void> {
    try {
      // ObjectId로 변환
      const postObjectId = new Types.ObjectId(postId);

      // 포스트 찾아서 썸네일 URL 설정
      await Post.findByIdAndUpdate(postObjectId, {
        thumbnail: thumbnailUrl,
        updated_date: new Date(),
      });
    } catch (error) {
      console.error("포스트 썸네일 설정 중 오류 발생:", error);
      throw error;
    }
  }
}

export default ThumbnailImageService;
