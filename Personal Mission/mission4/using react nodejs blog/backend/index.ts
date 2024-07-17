//라이브러리 가져오기
import express,{ Express,Request,Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./router/userRouter"
const { swaggerUi, specs } = require('./module/swagger.js');
const cors = require('cors');
//express 이용
const app:Express=express();
app.use(express.json()); // JSON 바디 파서 추가
dotenv.config();
app.use(cors());
const port = process.env.PORT;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/v1/auth',userRouter)

mongoose.connect(process.env.MONGODB_URI!);
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
  });
