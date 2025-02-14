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
const notificationService_1 = __importDefault(require("../service/notificationService"));
class NotificationController {
    // SSE 연결 설정
    subscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    // SSE에서는 일반적인 JSON 응답 대신 event 형식으로 에러를 보내야 함
                    res.writeHead(200, {
                        "Content-Type": "text/event-stream",
                        Connection: "keep-alive",
                        "Cache-Control": "no-cache",
                    });
                    res.write(`data: ${JSON.stringify({ error: "인증 권한 없음" })}\n\n`);
                    res.end();
                    return;
                }
                const user_id = req.user.user_id;
                console.log("알림 유저 아이디", user_id);
                // SSE 헤더 설정
                res.writeHead(200, {
                    "Content-Type": "text/event-stream",
                    Connection: "keep-alive",
                    "Cache-Control": "no-cache",
                });
                // 클라이언트 연결 등록
                notificationService_1.default.addClient(user_id, res);
                // 연결 종료 시 클라이언트 제거
                req.on("close", () => {
                    notificationService_1.default.removeClient(user_id);
                });
            }
            catch (error) {
                // 에러도 event 형식으로 전송
                res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
                res.end();
            }
        });
    }
    // 알림 목록 조회
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const page = parseInt(req.query.page) || 1;
                const notifications = yield notificationService_1.default.getNotifications(req.user.user_id, page);
                const unreadCount = yield notificationService_1.default.getUnreadCount(req.user.user_id);
                res.status(200).json({
                    notifications,
                    unreadCount,
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 알림 읽음 처리
    markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const { notification_id } = req.params;
                const notification = yield notificationService_1.default.markAsRead(notification_id, req.user.user_id);
                if (notification) {
                    res.status(200).json(notification);
                }
                else {
                    res.status(404).json({ message: "알림을 찾을 수 없습니다." });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 모든 알림 읽음 처리
    markAllAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                yield notificationService_1.default.markAllAsRead(req.user.user_id);
                res.status(200).json({ message: "모든 알림이 읽음 처리되었습니다." });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // 알림 삭제
    deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const { notification_id } = req.params;
                const result = yield notificationService_1.default.deleteNotification(notification_id, req.user.user_id);
                if (result) {
                    res.status(200).json({ message: "알림이 삭제되었습니다." });
                }
                else {
                    res.status(404).json({ message: "알림을 찾을 수 없습니다." });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new NotificationController();
