import mongoose, { Document, Schema, Types } from "mongoose";

// 게시물 인터페이스 정의
export interface IPost extends Document{
    post_id:mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    title: string,
    contents:any,
    like_count:Number,
    created_date:Date,
    updated_date:Date
}
// 게시물 스키마 
const postSchema:Schema<IPost>=new Schema({
    post_id:{type: Schema.Types.ObjectId, required:true, auto: true },
    user_id:{type: Schema.Types.ObjectId, required: true, ref:"User"},
    title:{type: String, required:true },
    contents:{type:Schema.Types.Mixed, required:true},
    like_count:{type:Number, default:0},
    created_date:{type: Date, required:true, default:Date.now() },
    updated_date:{type: Date, required:true, default:Date.now() }
})

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post