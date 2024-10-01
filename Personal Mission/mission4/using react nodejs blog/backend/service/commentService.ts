import Comment, { IComment } from "../model/commentModel";
import Profile from "../model/profileModel";
import User from "../model/userModel";

class CommentService {
  // 댓글 저장 서비스
  public async saveComment(
    user_id: string,
    data: IComment
  ): Promise<IComment | null> {
    const body = {
      ...data,
      user_id: user_id,
    };
    const comment = new Comment(body);
    if (comment) {
      return await comment.save();
    }
    return null;
  }

  // 댓글 조회 서비스
  public async getComment(post_id: string): Promise<object[] | null> {
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
