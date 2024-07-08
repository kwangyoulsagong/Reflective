// jwt 라이브러리를 불러와줍니다.
const jwt = require('jsonwebtoken')

//secretekey 불러오기
const secretKey= process.env.JWT_SECRET

//토큰 생성 함수
function generateToken(payload){
    return jwt.sign(payload,secretKey,{expiresIn:'1800s'})
}

//토큰 검증 함수
function verifyToken(token){
    try{
        return jwt.verify(token, secretKey)
    }
    catch(error){
        return null;
    }
}

module.exports={generateToken, verifyToken}