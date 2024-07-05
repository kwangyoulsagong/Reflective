//라이브러리 가져오기
const express=require("express")
const app=express()
// 컨트롤러 가져오기
const authController=require("../controller/auth")

//라우터 
const router=express.Router()

router.post("/signup",authController.register)
router.post("/login",authController.login)

module.exports=router