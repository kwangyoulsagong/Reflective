"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jwt_1 = require("../authorization/jwt");
const notificationController_1 = __importDefault(require("../controller/notificationController"));
router.get("/subscribe", jwt_1.verifyTokenMiddleware, notificationController_1.default.subscribe);
router.get("/", jwt_1.verifyTokenMiddleware, notificationController_1.default.getNotifications);
router.patch("/:notification_id/read", jwt_1.verifyTokenMiddleware, notificationController_1.default.markAsRead);
router.patch("/read-all", jwt_1.verifyTokenMiddleware, notificationController_1.default.markAllAsRead);
router.delete("/:notification_id", jwt_1.verifyTokenMiddleware, notificationController_1.default.deleteNotification);
exports.default = router;
