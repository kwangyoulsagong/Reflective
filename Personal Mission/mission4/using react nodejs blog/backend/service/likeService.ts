import Like, {ILike} from "../model/likeModel";
import Post from "../model/postModel";

// 좋아요 서비스
class LikeService{

    // 좋아요 확인 여부 서비스
    public async IsLike(post_id:string, user_id:string, is_liked:boolean):Promise<ILike | null>{
        try {
            console.log(post_id, user_id, is_liked)
            // 기존의 좋아요 기록을 찾음
            const existingLike = await Like.findOne({ post_id:post_id, user_id: user_id }).exec();
            console.log(existingLike)
            if (is_liked) {
                if (!existingLike) {
                    // 좋아요 추가
                    const newLike = new Like({ post_id, user_id, is_liked: true });
                    await newLike.save();

                    // 게시물의 좋아요 수 증가
                    await Post.findOneAndUpdate({post_id:post_id}, { $inc: { like_count: 1 } }).exec();

                    return newLike;
                } else if (!existingLike.is_liked) {
                    // 이미 존재하는 좋아요를 활성화
                    existingLike.is_liked = true;
                    existingLike.updated_date = new Date();
                    await existingLike.save();

                    // 게시물의 좋아요 수 증가
                    await Post.findOneAndUpdate({post_id:post_id}, { $inc: { like_count: 1 } }).exec();

                    return existingLike;
                }
            } else {
                if (existingLike && existingLike.is_liked) {
                    // 좋아요 비활성화
                    existingLike.is_liked = false;
                    existingLike.updated_date = new Date();
                    await existingLike.save();

                    // 게시물의 좋아요 수 감소
                    await Post.findOneAndUpdate({post_id:post_id}, { $inc: { like_count: 1 } }).exec();

                    return existingLike;
                }
            }

            return null;
        } catch (error) {
            console.error("좋아요 업데이트 에러", error);
            return null;
        }
    }
}

export default new LikeService