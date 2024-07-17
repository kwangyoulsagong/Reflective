import { Router } from "express";
import userController from "../controller/userController";
const router:Router=Router()

router.post('/register', userController.Register);

export default router