import { Router } from "express";
import favoriteController from "../controller/favoriteController";
import { verifyTokenMiddleware } from "../authorization/jwt";

const router: Router = Router();

router.get(
  "/mypage/profile",
  verifyTokenMiddleware,
  favoriteController.getMyProfileInfo
);
router.get(
  "/mypage/followers",
  verifyTokenMiddleware,
  favoriteController.getMyFollowers
);
router.get(
  "/mypage/followings",
  verifyTokenMiddleware,
  favoriteController.getMyFollowing
);

router.get(
  "/post/:post_id",
  verifyTokenMiddleware,
  favoriteController.getPostFavorite
);

router.post("/", verifyTokenMiddleware, favoriteController.saveFavorite);
router.delete(
  "/:favorite_id",
  verifyTokenMiddleware,
  favoriteController.removeFavorite
);

router.get("/", verifyTokenMiddleware, favoriteController.getFavoriteStory);

export default router;
