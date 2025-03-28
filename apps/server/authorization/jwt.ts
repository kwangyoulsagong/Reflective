import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}

// 확장된 Request 인터페이스 정의
interface AuthRequest extends Request {
  user?: DecodedToken | null; // req.user의 타입을 DecodedToken | null로 정의
}

dotenv.config();

//secretekey 불러오기
const secretKey = process.env.JWT_SECRET as string;

//refreshsecretkey 불러오기
const refreshSecretKey = process.env.JWT_REFRESH_SECRET as string;

// 토큰 생성 함수
function generateToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // 실제 운영에서는 더 긴 시간으로 설정
}

// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, refreshSecretKey, { expiresIn: "7d" }); // 실제 운영에서는 더 긴 시간으로 설정
}

// 토큰 검증 함수
function verifyToken(token: string): DecodedToken {
  return jwt.verify(token, secretKey) as DecodedToken;
}

// 리프레쉬 토큰 검증 함수
function verifyRefreshToken(token: string): DecodedToken {
  return jwt.verify(token, refreshSecretKey) as DecodedToken;
}

function verifyTokenMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split("Bearer ")[1]; // header에서 access token을 가져옵니다.
  if (!token) {
    res.status(403).json({ message: "토큰이 없습니다." });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("Token verification failed:", error);

    // 토큰 만료 오류와 다른 오류 구분
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "토큰이 만료되었습니다.",
        code: "TOKEN_EXPIRED",
      });
    } else {
      res.status(401).json({
        message: "유효하지 않은 토큰입니다.",
        code: "INVALID_TOKEN",
      });
    }
  }
}

function verifySSETokenMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  // SSE는 query parameter로 토큰을 받음
  const token = req.query.authorization?.toString().split("Bearer ")[1];

  if (!token) {
    // SSE의 특성을 고려한 에러 응답
    res.writeHead(401, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });
    res.write(
      `data: ${JSON.stringify({
        type: "ERROR",
        code: "TOKEN_MISSING",
        message: "토큰이 없습니다.",
      })}\n\n`
    );
    res.end();
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("SSE token verification failed:", error);

    // SSE의 특성을 고려한 에러 응답
    res.writeHead(401, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    // 토큰 만료 오류와 다른 오류 구분
    const errorCode =
      error.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN";
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "토큰이 만료되었습니다."
        : "유효하지 않은 토큰입니다.";

    res.write(
      `data: ${JSON.stringify({
        type: "ERROR",
        code: errorCode,
        message: errorMessage,
      })}\n\n`
    );
    res.end();
  }
}

export {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  verifyTokenMiddleware,
  verifySSETokenMiddleware,
};
