import mongoose, { Document, Schema, Types } from "mongoose";

// 인터페이스 정의
export interface INotification extends Document {
  notification_id: Types.ObjectId;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  sender_id: Types.ObjectId;
  receiver_id: Types.ObjectId;
  post_id?: Types.ObjectId;
  comment_id?: Types.ObjectId;
  content?: string;
  is_read: boolean;
  created_date: Date;
  updated_date: Date;
}

// 알림 스키마 정의
const notificationSchema: Schema<INotification> = new Schema({
  notification_id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["LIKE", "COMMENT", "FOLLOW"],
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment_id: {
    type: Schema.Types.ObjectId,
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

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
