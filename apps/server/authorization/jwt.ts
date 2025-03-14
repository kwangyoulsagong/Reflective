// jwt 라이브러리를 불러와줍니다.
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
  user?: DecodedToken; // req.user의 타입을 DecodedToken으로 정의
}

dotenv.config();

//secretekey 불러오기
const secretKey = process.env.JWT_SECRET as string;

//refreshsecretkey 불러오기
const refreshSecretKey = process.env.JWT_REFRESH_SECRET as string;
// 토큰 생성 함수
function generateToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "30m" });
}

// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, refreshSecretKey, { expiresIn: "7d" });
}

// 토큰 검증 함수
function verifyToken(token: string): DecodedToken | null {
  try {
    console.log(token);
    console.log(secretKey);
    return jwt.verify(token, secretKey) as DecodedToken;
  } catch (error) {
    return null;
  }
}

// 리프레쉬 토큰 검증 함수
function verifyRefreshToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, refreshSecretKey) as DecodedToken;
  } catch (error) {
    return null;
  }
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

  const decoded = verifyToken(token);
  console.log(decoded);
  if (!decoded) {
    res.status(401).json({ message: "인증 권한이 없음" });
    return;
  }

  req.user = decoded;
  next();
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
        message: "토큰이 없습니다.",
      })}\n\n`
    );
    res.end();
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    // SSE의 특성을 고려한 에러 응답
    res.writeHead(401, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });
    res.write(
      `data: ${JSON.stringify({
        type: "ERROR",
        message: "인증 권한이 없음",
      })}\n\n`
    );
    res.end();
    return;
  }

  req.user = decoded;
  next();
}
export {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  verifyTokenMiddleware,
  verifySSETokenMiddleware, // SSE용 미들웨어 추가
};
