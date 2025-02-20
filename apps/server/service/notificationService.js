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
const mongoose_1 = require("mongoose");
class NotificationService {
    constructor() {
        this.clients = new Map();
    }
    // 클라이언트 연결 등록
    addClient(user_id, res) {
        // 기존 연결 종료 로직 수정
        const existingClient = this.clients.get(user_id);
        if (existingClient && !existingClient.writableEnded) {
            try {
                existingClient.write(`data: ${JSON.stringify({ type: "DISCONNECT" })}\n\n`);
                existingClient.end();
            }
            catch (error) {
                console.error("기존 클라이언트 종료 중 에러:", error);
            }
        }
        // 클라이언트 맵에 추가
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
            if (client && !client.writableEnded) {
                try {
                    const eventData = JSON.stringify(Object.assign(Object.assign({}, notification.toObject()), { type: "NOTIFICATION" }));
                    client.write(`data: ${eventData}\n\n`);
                }
                catch (error) {
                    console.error("알림 전송 중 에러:", error);
                    this.removeClient(data.receiver_id);
                }
            }
            return notification;
        });
    }
    // DB에 알림 저장
    saveNotificationToDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("저장 전 데이터 확인:", data); // 데이터 형식 확인
            const notification = new notificationModel_1.default({
                type: data.type,
                sender_id: new mongoose_1.Types.ObjectId(data.sender_id), // ObjectId로 변환
                receiver_id: new mongoose_1.Types.ObjectId(data.receiver_id), // ObjectId로 변환
                post_id: data.post_id ? new mongoose_1.Types.ObjectId(data.post_id) : undefined,
                comment_id: data.comment_id
                    ? new mongoose_1.Types.ObjectId(data.comment_id)
                    : undefined,
                content: data.content,
                is_read: false,
                created_date: new Date(),
                updated_date: new Date(),
            });
            const savedNotification = yield notification.save();
            console.log("저장된 데이터:", savedNotification); // 저장된 결과 확인
            return savedNotification;
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
            try {
                const userObjectId = new mongoose_1.Types.ObjectId(user_id);
                return yield notificationModel_1.default.find({
                    receiver_id: userObjectId,
                })
                    .sort({ created_date: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate({
                    path: "sender_id",
                    model: "User",
                    localField: "sender_id",
                    foreignField: "user_id",
                    select: "nickname profile_image",
                })
                    .populate({
                    path: "post_id",
                    model: "Post",
                    localField: "post_id",
                    foreignField: "post_id",
                    select: "title user_id post_id _id", // post_id와 _id도 함께 선택
                    populate: [
                        {
                            path: "user_id",
                            model: "User",
                            foreignField: "user_id", // User 모델의 user_id 필드와 매칭
                            localField: "user_id", // Post 모델의 user_id 필드
                            select: "nickname",
                        },
                    ],
                })
                    .exec();
            }
            catch (error) {
                console.error("알림 조회 중 에러:", error);
                throw error;
            }
        });
    }
    // 알림 읽음 처리
    markAsRead(notification_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("읽음 처리 시도:", { notification_id, user_id });
                const notificationObjectId = new mongoose_1.Types.ObjectId(notification_id);
                const userObjectId = new mongoose_1.Types.ObjectId(user_id);
                const notification = yield notificationModel_1.default.findOneAndUpdate({
                    _id: notificationObjectId, // _id 대신 notification_id 사용
                    receiver_id: userObjectId,
                }, { is_read: true }, {
                    new: true,
                    runValidators: true,
                });
                console.log("읽음 처리 결과:", notification);
                if (!notification) {
                    throw new Error("알림을 찾을 수 없습니다.");
                }
                return notification;
            }
            catch (error) {
                console.error("알림 읽음 처리 중 에러:", error);
                throw error;
            }
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
            const notificationObjectId = new mongoose_1.Types.ObjectId(notification_id);
            const userObjectId = new mongoose_1.Types.ObjectId(user_id);
            const result = yield notificationModel_1.default.deleteOne({
                _id: notificationObjectId,
                receiver_id: userObjectId,
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
