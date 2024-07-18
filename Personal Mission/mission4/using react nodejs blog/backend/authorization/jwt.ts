// jwt 라이브러리를 불러와줍니다.
const jwt = require('jsonwebtoken')

// secretekey 불러오기
const secreteKey=process.env.JWT_SECRET
// refreshkey 불러오기
const refreshSecreteKey=process.env.JWT_REFRESH_SECRET

// 토큰 생성 함수
function generateToken(payload:string){
    return jwt.sign(payload,secreteKey,{expiresIn:'1800s'})
}

// 리프레쉬 토큰 생성 함수
function generateRefreshToken(payload:string){
    return jwt.sign(payload,refreshSecreteKey,{expiresIn:'7d'})
}

// 토큰 검증 함수
function verifyToken(token:string){
    try{
        return jwt.verify(token,secreteKey)
    }
    catch(error){
        return null
    }
}

// 리프레쉬 토큰 검증 함수
function verifyRefreshToken(token:string){
    try{
        return jwt.verify(token,refreshSecreteKey)
    }
    catch(error){
        return null
    }
}
module.exports={generateToken,generateRefreshToken,verifyToken,verifyRefreshToken}