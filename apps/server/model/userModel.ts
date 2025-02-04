import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
// 회원 인터페이스 정의
export interface IUser extends Document {
    user_id:mongoose.Types.ObjectId;
    email: string;
    password: string;
    nickname: string;
    phone_number: string;
    created_date: Date;
    updated_date: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// 유저 스키마
const userSchema = new Schema<IUser>({
    user_id:{type: Schema.Types.ObjectId, required:true, auto: true},
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    phone_number: { type: String, required: true },
    created_date: { type: Date, required: true, default: Date.now },
    updated_date: { type: Date, required: true, default: Date.now }
});

// 비밀번호 해싱
userSchema.pre<IUser>('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

// 비밀번호 비교 메서드 추가
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as IUser;
    return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
