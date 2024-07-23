import mongoose, { Document, Schema, Types } from "mongoose";

// 인터페이스 정의
export interface ILike extends Document{
    like_id:mongoose.Types.ObjectId,
    post_id:mongoose.Types.ObjectId,
    user_id:mongoose.Types.ObjectId,
    is_liked:boolean,
    created_date:Date,
    updated_date:Date
}

// 좋아요 스키마 정의
const likeSchema:Schema<ILike>=new Schema({
    like_id:{type: Schema.Types.ObjectId, required: true, auto: true},
    post_id:{type: Schema.Types.ObjectId, required:true, ref:"Post" },
    user_id:{type: Schema.Types.ObjectId, required: true, ref:"User"},
    is_liked:{type: Boolean, default:false},
    created_date:{type: Date, required:true, default:Date.now() },
    updated_date:{type: Date, required:true, default:Date.now() }
})

const Like = mongoose.model<ILike>("Like", likeSchema);

export default Like