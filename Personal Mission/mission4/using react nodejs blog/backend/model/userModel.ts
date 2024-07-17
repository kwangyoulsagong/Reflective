import mongoose, { Document, Schema } from "mongoose";

// 인터페이스 정의
export interface IUser extends Document {
    email: string;
    password: string;
    nickname: string;
    phone_number: string;
    created_date: Date;
    updated_date: Date;
}

// 유저 스키마
const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    phone_number: { type: String, required: true },
    created_date: { type: Date, required: true, default: Date.now },
    updated_date: { type: Date, required: true, default: Date.now }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
