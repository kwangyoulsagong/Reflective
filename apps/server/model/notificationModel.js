"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// 알림 스키마 정의
const notificationSchema = new mongoose_1.Schema({
    notification_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["LIKE", "COMMENT", "FOLLOW"],
    },
    sender_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
    },
    comment_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    content: {
        type: String,
    },
    is_read: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updated_date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});
// 인덱스 설정
notificationSchema.index({ receiver_id: 1, created_date: -1 });
notificationSchema.index({ is_read: 1 });
const Notification = mongoose_1.default.model("Notification", notificationSchema);
exports.default = Notification;
