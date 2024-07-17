import { Router } from "express";
import userController from "../controller/userController";
const router:Router=Router()

router.post('/register', userController.Register);
router.post('/login',userController.Login)

export default router