module.exports={
    PostDetail:{
        type:"object",
        properties:{
            id:{
                type:"string",
                example:1
            },
            title:{
                type:"string",
                example:"이것은 Swagger 이다."
            },
            content:{
                type:"string",
                example:"스웨거는 api 문석 작성 및 테스트 용도로 자주 쓰이는 라이브러리이다."
            },
            author:{
                type:"string",
                example:"사공광열"
            }
        },
        required:["id","title","content","author"]

    }
}