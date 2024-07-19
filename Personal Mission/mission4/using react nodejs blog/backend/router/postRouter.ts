import { Router } from "express";
import postController from "../controller/postController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router:Router=Router()

router.post("/",verifyTokenMiddleware,postController.savePost)

export default router