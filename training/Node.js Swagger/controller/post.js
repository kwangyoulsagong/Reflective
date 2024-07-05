async  function Post(req,res){
    const {postId}=req.params
    const posts=[
        {id:1,title:"이것은 Swagger 이다.",content:"스웨거는 api 문석 작성 및 테스트 용도로 자주 쓰이는 라이브러리이다",author:"사공광열"}
    ]
    const post=posts.find((p)=>p.id==postId)
    if(post){
        res.status(200).json(post);
    }else{
        res.status(404).send("포스트를 찾지 못함");
    }
}
module.exports={Post}