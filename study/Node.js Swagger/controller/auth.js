async function register(req,res){
    res.send("나는 회원가입")
}

async function login(req,res){

    res.send("나는 로그인")

}
module.exports={register,login}