import mongoose, { Document, Schema, Types } from "mongoose";

// 프로필 인터페이스 정의
export interface IProfile extends Document {
  profile_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  image_url: string;
  created_date: Date;
  updated_date: Date;
}

// 프로필 스키마
const profileSchema: Schema<IProfile> = new Schema({
  profile_id: { type: Schema.Types.ObjectId, required: true, auto: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  image_url: { type: String, default: null },
  created_date: { type: Date, required: true, default: Date.now },
  updated_date: { type: Date, required: true, default: Date.now },
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
