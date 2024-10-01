import { Router } from "express";
import favoriteController from "../controller/favoriteController";
import { verifyTokenMiddleware } from "../authorization/jwt";
const router: Router = Router();
router.post("/", verifyTokenMiddleware, favoriteController.saveFavorite); // 즐겨찾기 추가
router.delete(
  "/:favorite_id",
  verifyTokenMiddleware,
  favoriteController.removeFavorite
); // 즐겨찾기 삭제
router.get(
  "/post/:post_id",
  verifyTokenMiddleware,
  favoriteController.getPostFavorite
);
export default router;
