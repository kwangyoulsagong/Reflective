//라이브러리 가져오기
const express=require("express")
const app=express()
const { swaggerUi, specs } = require('./module/swagger')
const authRouter=require("./router/auth")
const postRouter=require("./router/post")
// 포트번호
app.set('port', process.env.PORT || 8000);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// authRoutes
app.use("/api/v1/auth/",authRouter)
app.use("/api/v1/posts",postRouter)
// 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})