// jwt 라이브러리를 불러와줍니다.
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//secretekey 불러오기
const secretKey =process.env.JWT_SECRET as string

//refreshsecretkey 불러오기
const refreshSecretKey = process.env.JWT_REFRESH_SECRET as string;
// 토큰 생성 함수
function generateToken(payload:object):string{
    return jwt.sign(payload,secretKey,{expiresIn:'1800s'})
}

// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload:object):string{
    return jwt.sign(payload,refreshSecretKey,{expiresIn:'7d'})
}

// 토큰 검증 함수
function verifyToken(token:string){
    try{
        return jwt.verify(token,secretKey)
    }
    catch(error){
        return null
    }
}

// 리프레쉬 토큰 검증 함수
function verifyRefreshToken(token:string){
    try{
        return jwt.verify(token,refreshSecretKey)
    }
    catch(error){
        return null
    }
}
export {generateToken,generateRefreshToken,verifyToken,verifyRefreshToken}