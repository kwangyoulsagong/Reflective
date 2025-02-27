import mongoose, { Document, Schema, Types } from "mongoose";

// favorite 인터페이스 정의
export interface IFavorite extends Document {
  favorite_id: Types.ObjectId;
  user_id: Types.ObjectId;
  favorite_user_id: Types.ObjectId;
  is_favorite: boolean;
  createdAt: Date; // timestamps 필드 추가
  updatedAt: Date; // timestamps 필드 추가
}

const FavoriteSchema: Schema = new Schema(
  {
    favorite_id: { type: Schema.Types.ObjectId, required: true, auto: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    favorite_user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    is_favorite: { type: Boolean, default: false }, // 기본값을 true로 설정
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 추가
  }
);

const Favorite = mongoose.model<IFavorite>("Favorite", FavoriteSchema);
export default Favorite;
