import Comment, { IComment } from "../model/commentModel";
import Post from "../model/postModel";
import Profile from "../model/profileModel";
import User from "../model/userModel";
import mongoose from "mongoose";
interface CommentResponse {
  post_id: string | undefined;
  author_id: string | undefined;
}
class CommentService {
  // 댓글 저장 서비스
  public async saveComment(
    user_id: string,
    data: IComment
  ): Promise<CommentResponse | null> {
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      console.error("유효하지 않은 user_id입니다.");
      return null;
    }

    const body = {
      ...data,
      user_id: user_id,
    };
    try {
      const comment = new Comment(body);
      const response = await comment.save();
      const postUser = await Post.findOne({ post_id: response.post_id }).exec();

      return {
        post_id: response.post_id.toString(),
        author_id: postUser?.user_id.toString(),
      };
    } catch (error) {
      console.error("댓글 저장 에러:", error);
      return null;
    }
  }

  // 댓글 조회 서비스
  public async getComment(post_id: string): Promise<object[] | null> {
    if (!mongoose.Types.ObjectId.isValid(post_id)) {
      console.error("유효하지 않은 post_id입니다.");
      return null;
    }
    try {
      const comments = await Comment.find({ post_id }).exec();
      if (!comments) return null;

      const commentsUserData = await Promise.all(
        comments.map(async (comment) => {
          // 유저 조회
          const user = await User.findOne({ user_id: comment.user_id }).exec();
          // 유저 프로필 이미지 조회
          const profile = await Profile.findOne({
            user_id: comment.user_id,
          }).exec();

          if (user && profile) {
            return {
              ...comment.toObject(),
              nickname: user.nickname,
              image_url: profile.image_url,
            };
          }
          return comment.toObject();
        })
      );
      return commentsUserData;
    } catch (error) {
      console.error("댓글 조회 에러", error);
      return null;
    }
  }

  // 댓글 수정 서비스
  public async updateComment(
    comment_id: string,
    user_id: string,
    data: IComment
  ): Promise<IComment | null> {
    if (
      !mongoose.Types.ObjectId.isValid(comment_id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      console.error("유효하지 않은 comment_id 또는 user_id입니다.");
      return null;
    }
    try {
      const updateData = {
        ...data,
        updated_date: new Date(),
      };
      const update = await Comment.findOneAndUpdate(
        { comment_id: comment_id, user_id: user_id },
        { $set: updateData },
        { new: true }
      ).exec();
      if (update) {
        return update;
      }
      return null;
    } catch (error) {
      console.error("댓글 수정 에러", error);
      return null;
    }
  }

  // 댓글 삭제
  public async deleteComment(
    comment_id: string,
    user_id: string
  ): Promise<IComment | null> {
    if (
      !mongoose.Types.ObjectId.isValid(comment_id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      console.error("유효하지 않은 comment_id 또는 user_id입니다.");
      return null;
    }
    const deleteComment = await Comment.findOneAndDelete({
      comment_id,
      user_id,
    });
    if (deleteComment) {
      return deleteComment;
    }
    return null;
  }
}

export default new CommentService();
