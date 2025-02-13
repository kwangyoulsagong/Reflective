"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
class NotificationService {
    constructor() {
        this.clients = new Map();
    }
    // 클라이언트 연결 등록
    addClient(user_id, res) {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
        });
        this.clients.set(user_id, res);
    }
    // 클라이언트 연결 해제
    removeClient(user_id) {
        this.clients.delete(user_id);
    }
    // 알림 전송 및 저장
    sendNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // DB에 알림 저장
            const notification = yield this.saveNotificationToDB(data);
            // 실시간 알림 전송
            const client = this.clients.get(data.receiver_id);
            if (client) {
                const eventData = JSON.stringify(notification);
                client.write(`data: ${eventData}\n\n`);
            }
            return notification;
        });
    }
    // DB에 알림 저장
    saveNotificationToDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = new notificationModel_1.default({
                type: data.type,
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                post_id: data.post_id,
                comment_id: data.comment_id,
                content: data.content,
                is_read: false,
                created_date: new Date(),
                updated_date: new Date(),
            });
            return yield notification.save();
        });
    }
    // 사용자의 읽지 않은 알림 개수 조회
    getUnreadCount(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationModel_1.default.countDocuments({
                receiver_id: user_id,
                is_read: false,
            });
        });
    }
    // 사용자의 알림 목록 조회
    getNotifications(user_id_1) {
        return __awaiter(this, arguments, void 0, function* (user_id, page = 1, limit = 20) {
            return yield notificationModel_1.default.find({ receiver_id: user_id })
                .sort({ created_date: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate("sender_id", "username profile_image")
                .populate("post_id", "title")
                .exec();
        });
    }
    // 알림 읽음 처리
    markAsRead(notification_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationModel_1.default.findOneAndUpdate({ _id: notification_id, receiver_id: user_id }, { is_read: true }, { new: true });
        });
    }
    // 모든 알림 읽음 처리
    markAllAsRead(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notificationModel_1.default.updateMany({ receiver_id: user_id, is_read: false }, { is_read: true });
        });
    }
    // 알림 삭제
    deleteNotification(notification_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield notificationModel_1.default.deleteOne({
                _id: notification_id,
                receiver_id: user_id,
            });
            return result.deletedCount > 0;
        });
    }
    // 오래된 알림 정리 (예: 30일 이상 된 알림)
    cleanOldNotifications() {
        return __awaiter(this, arguments, void 0, function* (days = 30) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            yield notificationModel_1.default.deleteMany({
                created_date: { $lt: cutoffDate },
            });
        });
    }
}
exports.default = new NotificationService();
