import mongoose, { Document, Schema, Types } from "mongoose";

// favorite 인터페이스 정의
export interface IFavorite extends Document {
  favorite_id: mongoose.Types.ObjectId; // 즐겨찾기 고유번호
  user_id: mongoose.Types.ObjectId; // 현재 유저의 ID
  favorite_user_id: mongoose.Types.ObjectId; // 즐겨찾기한 유저의 ID
  is_favorite: boolean; // 즐겨찾기 여부
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
