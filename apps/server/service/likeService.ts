import Like, { ILike } from "../model/likeModel";
import Post from "../model/postModel";

// 좋아요 서비스
class LikeService {
  // 좋아요 확인 여부 서비스
  public async IsLike(
    post_id: string,
    user_id: string,
    is_liked: boolean
  ): Promise<{ like: ILike | null; author_id: string | null }> {
    try {
      // 게시글 작성자 정보 조회
      const post = await Post.findOne({ post_id: post_id }).exec();
      if (!post) return { like: null, author_id: null };

      const existingLike = await Like.findOne({
        post_id: post_id,
        user_id: user_id,
      }).exec();

      let resultLike = null;

      if (is_liked) {
        if (!existingLike) {
          // 좋아요 추가
          const newLike = new Like({ post_id, user_id, is_liked: true });
          await newLike.save();

          await Post.findOneAndUpdate(
            { post_id: post_id },
            { $inc: { like_count: 1 } }
          ).exec();

          resultLike = newLike;
        } else if (!existingLike.is_liked) {
          // 이미 존재하는 좋아요를 활성화
          existingLike.is_liked = true;
          existingLike.updated_date = new Date();
          await existingLike.save();

          await Post.findOneAndUpdate(
            { post_id: post_id },
            { $inc: { like_count: 1 } }
          ).exec();

          resultLike = existingLike;
        }
      } else {
        if (existingLike && existingLike.is_liked) {
          // 좋아요 비활성화
          existingLike.is_liked = false;
          existingLike.updated_date = new Date();
          await existingLike.save();

          await Post.findOneAndUpdate(
            { post_id: post_id },
            { $inc: { like_count: -1 } }
          ).exec();

          resultLike = existingLike;
        }
      }

      return {
        like: resultLike,
        author_id: post.user_id.toString(), // Post의 user_id가 작성자 ID입니다
      };
    } catch (error) {
      console.error("좋아요 업데이트 에러", error);
      return { like: null, author_id: null };
    }
  }

  public async GetLike(
    post_id: string,
    user_id: string
  ): Promise<ILike | null> {
    try {
      const existingLike = await Like.findOne({
        post_id: post_id,
        user_id: user_id,
      }).exec();
      return existingLike;
    } catch (error) {
      console.error("좋아요 조회 에러");
      return null;
    }
  }
}

export default new LikeService();
