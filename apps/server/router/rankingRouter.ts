import { verifyTokenMiddleware } from "../authorization/jwt";
import { Router } from "express";
import rankingController from "../controller/rankingController";
const router: Router = Router();

router.get("/", verifyTokenMiddleware, rankingController.getUserRank);

export default router;
