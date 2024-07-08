const { generateToken, verifyToken } = require("../Authorization/jwt")
//유저 더미 데이터
let users = [
    { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
    { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' }
];
async function register(req,res){
    res.send("나는 회원가입")
}
// 로그인 시 토큰 생성
async function login(req,res){

   const username="test"
   const password="1234"
   if(username=="test" && password=="1234"){
    const token=generateToken({username})
    return res.json({token})
   }
   else{
    return res.status(401).json({message:'인증 권한 없음'})
   }

}
//검증 테스트
async function test(req,res){
    const token=hello
    if(!token){
        return res.status(403).json({message: '토큰이 없습니다.'})
    }
    const decoded =verifyToken(token)
    if(decoded){
        return res.json({message:'검증된 콘테츠',decoded})
    }
    else{
        return res.json({message:'인증 권한이 없음'})
    }
}

// 인증을 통한 프로필 조회
async function profile(req,res){
    const token=req.headers['authorization']

    if(!token){
        return res.status(403).json({message: '토큰이 없습니다.'})
    }
    const decoded =verifyToken(token)
    
    if(decoded){
        const user=users.find(user=>user.username==decoded.player)
        if(user){
            const userProfile={
                id: user.id,
                username:user.username,
                email:user.email
            }
            return res.json({profile:userProfile})
        }
        else{
            return res.status(404).json({message:"유저가 없습니다."})
        }
        
    }
    else{
        return res.json({message:'인증 권한이 없음'})
    }
}
module.exports={register,login, test,profile}