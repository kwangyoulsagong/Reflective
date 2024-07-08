const { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken } = require("../Authorization/jwt")
//유저 더미 데이터
let users = [
    { id: 1, username: 'sgky0511@naver.com', password: 'hello1234', email: 'user1@example.com' },
    { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' }
];
async function register(req,res){
    res.send("나는 회원가입")
}
// 로그인 시 토큰 생성
async function login(req,res){
    const {username,password}=req.body
    const user = users.find(user => user.username === username && user.password === password);
   if(user){
    const token=generateToken({username: user.username})
    const refreshToken=generateRefreshToken({username: user.username})
    return res.json({token,refreshToken})
   }
   else{
    return res.status(401).json({message:'인증 권한 없음'})
   }

}
//검증 테스트
async function test(req,res){
    const decoded = req.decoded;
    if(decoded){
        return res.json({message:'검증된 콘테츠',decoded})
    }
    else{
        return res.json({message:'인증 권한이 없음'})
    }
}

// 인증을 통한 프로필 조회
async function profile(req, res) {
    const decoded = req.decoded;
    const user = users.find(user => user.username === decoded.username);
    if (user) {
        const userProfile = { id: user.id, username: user.username, email: user.email };
        return res.json({ profile: userProfile });
    } else {
        return res.status(404).json({ message: '유저가 없습니다.' });
    }
}

async function refresh(req,res){
    const {refreshToken}=req.body
    if(!refreshToken){
        return res.status(403).json({message:"리프레쉬 토큰이 없습니다."})
    }
    if(!refreshToken.includes(refreshToken)){
        return res.status(403).json({message:"유효하지 않은 리프레쉬 토큰 입니다."})
    }
    const decoded=verifyRefreshToken(refreshToken)
    if(decoded){
        const newToken=generateToken({username:decoded.username})
        return res.json({newToken})
    }
    else{
        return res.status(403).json("리프레쉬 토큰 검증 실패")
    }
}
module.exports={register,login, test,profile,refresh}