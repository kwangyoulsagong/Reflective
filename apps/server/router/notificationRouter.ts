import express from "express";
const router = express.Router();
import { verifyTokenMiddleware } from "../authorization/jwt";
import notificationController from "../controller/notificationController";

router.get(
  "/subscribe",
  verifyTokenMiddleware,
  notificationController.subscribe
);

router.get("/", verifyTokenMiddleware, notificationController.getNotifications);

router.patch(
  "/:notification_id/read",
  verifyTokenMiddleware,
  notificationController.markAsRead
);

router.patch(
  "/read-all",
  verifyTokenMiddleware,
  notificationController.markAllAsRead
);

router.delete(
  "/:notification_id",
  verifyTokenMiddleware,
  notificationController.deleteNotification
);

export default router;
