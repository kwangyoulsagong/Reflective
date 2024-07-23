import mongoose, { Document, Schema, Types } from "mongoose";

// 인터페이스 정의
export interface IComment extends Document{
    comment_id: mongoose.Types.ObjectId
    post_id: mongoose.Types.ObjectId
    user_id: mongoose.Types.ObjectId
    parent_comment_id: string
    content: string
    created_date: Date
    updated_date:Date
}

// 댓글 스키마
const commentSchema:Schema<IComment> =new Schema({
    comment_id:{type:Schema.Types.ObjectId, required: true, auto:true },
    post_id:{type: Schema.Types.ObjectId, required:true, ref:"Post" },
    user_id:{type: Schema.Types.ObjectId, required: true, ref:"User"},
    parent_comment_id:{type:String, default:null},
    content:{type: String, required: true},
    created_date:{type: Date, required:true, default:Date.now() },
    updated_date:{type: Date, required:true, default:Date.now() }
})
const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment
