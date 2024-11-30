import { Types } from "mongoose";
import Post, { IPost } from "../model/postModel";
import User from "../model/userModel";

class PostService {
  // 게시물 저장
  public async savePost(
    user_id: string,
    data: IPost
  ): Promise<{ post_id: Types.ObjectId; title: string } | null> {
    const body = {
      user_id: user_id,
      title: data.title,
      contents: data.contents,
      category: data.category,
      thumbnail: data.thumbnail,
      like_count: data.like_count,
    };
    const post = new Post(body);
    if (post) {
      const savedPost = await post.save();
      return {
        post_id: savedPost.post_id,
        title: savedPost.title,
      };
    }
    return null;
  }

  // 게시물 조회
  public async getRecentPost(): Promise<IPost[] | null> {
    try {
      // 좋아요가 많은 순으로 정렬된 최신 게시물 4개를 먼저 가져옴
      const topPost = await Post.find()
        .sort({ like_count: -1, created_date: -1 })
        .limit(3)
        .exec();
      // 만약 좋아요 수가 0 개인 경우
      const tryCatchTop = topPost.some((post) => post.like_count > 0);
      let recentPosts: IPost[] = [];
      if (tryCatchTop) {
        //최신순으로 가져옴(top 4 제외)
        recentPosts = (await Post.find({
          _id: { $nin: topPost.map((post) => post._id) },
        })
          .sort({ created_date: -1 })
          .exec()) as IPost[];
      }
      // 좋아요 수가 0개인경우 최신수으로 가져옴
      else {
        recentPosts = (await Post.find()
          .sort({ created_date: -1 })
          .exec()) as IPost[];
      }
      const posts = [...topPost, ...recentPosts];

      // nickname 추가
      const nicknameWithPosts = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findOne({ user_id: post.user_id });
          if (user) {
            return { ...post.toObject(), nickname: user.nickname };
          }
          return post.toObject();
        })
      );
      return nicknameWithPosts;
    } catch (error) {
      console.error("게시물 조회 에러", error);
      return null;
    }
  }
  // 상세 게시물 조회
  public async getPostDetail(post_id: string): Promise<object | null> {
    try {
      const post = await Post.findOne({ post_id }).exec();
      if (post) {
        const user = await User.findOne({ user_id: post.user_id }).exec();
        if (user) {
          return { ...post.toObject(), nickname: user.nickname };
        }
        return post.toObject();
      }
      return null;
    } catch (error) {
      console.error("게시물 조회 에러", error);
      return null;
    }
  }

  // 상세 게시물 수정
  public async updatePost(
    post_id: string,
    user_id: string,
    data: IPost
  ): Promise<IPost | null> {
    const updateData = {
      ...data,
      updated_date: new Date(),
    };
    const update = await Post.findOneAndUpdate(
      { post_id, user_id },
      { $set: updateData },
      { new: true }
    ).exec();
    if (update) {
      return update;
    }
    return null;
  }

  // 상세 게시물 삭제
  public async deletePost(
    post_id: string,
    user_id: string
  ): Promise<IPost | null> {
    const deletePost = await Post.findOneAndDelete({ post_id, user_id });
    if (deletePost) {
      return deletePost;
    }
    return null;
  }
}

export default new PostService();
