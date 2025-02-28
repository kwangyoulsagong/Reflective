import { Types } from "mongoose";
import Post, { IPost } from "../model/postModel";
import User from "../model/userModel";
import Favorite from "../model/favoriteModel";

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

  public async getInfiniteRecentPosts(
    page: number = 1,
    limit: number = 30
  ): Promise<{
    posts: IPost[];
    hasMore: boolean;
  } | null> {
    try {
      const skip = (page - 1) * limit;

      // 첫 페이지에는 좋아요 많은 상위 게시물 포함
      let topPosts: IPost[] = [];
      if (page === 1) {
        topPosts = await Post.find()
          .sort({ like_count: -1, created_date: -1 })
          .limit(3)
          .exec();
      }

      // 나머지 게시물 조회 (첫 페이지에서는 상위 게시물 제외)
      const regularPosts = await Post.find(
        page === 1 ? { _id: { $nin: topPosts.map((post) => post._id) } } : {}
      )
        .sort({ created_date: -1 })
        .skip(skip)
        .limit(page === 1 ? limit - topPosts.length : limit)
        .exec();

      // 전체 게시물 수 조회 (더 많은 데이터가 있는지 확인용)
      const totalCount = await Post.countDocuments();
      const currentCount =
        skip + (page === 1 ? topPosts.length : 0) + regularPosts.length;
      const hasMore = currentCount < totalCount;

      // 결합 및 닉네임 추가
      const allPosts = [...(page === 1 ? topPosts : []), ...regularPosts];
      const postsWithNickname = await Promise.all(
        allPosts.map(async (post) => {
          const user = await User.findOne({ user_id: post.user_id });
          if (user) {
            return { ...post.toObject(), nickname: user.nickname };
          }
          return post.toObject();
        })
      );

      return { posts: postsWithNickname, hasMore };
    } catch (error) {
      console.error("페이지네이션 게시물 조회 에러", error);
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

  // 내포스트 조회
  public async myPost(user_id: string): Promise<IPost[] | null> {
    try {
      const myPosts = (await Post.find({ user_id: user_id })
        .sort({ created_date: -1 })
        .exec()) as IPost[];

      if (myPosts.length === 0) {
        return [];
      }

      const user = await User.findOne({ user_id });
      const nickname = user ? user.nickname : null;

      const postsWithNickname = myPosts.map((post) => {
        return {
          ...post.toObject(),
          nickname: nickname,
        };
      });

      return postsWithNickname;
    } catch (error) {
      console.error("내 게시물 조회 에러", error);
      return null;
    }
  }

  // 즐겨찾기한 포스트 조회
  public async getFavoritePosts(user_id: string): Promise<IPost[] | null> {
    try {
      // Favorite 모델 동적 임포트
      const userObjectId = new Types.ObjectId(user_id);

      // 즐겨찾기한 유저 목록 가져오기
      const favoriteUsers = await Favorite.find({
        user_id: userObjectId,
        is_favorite: true,
      }).select("favorite_user_id");

      if (!favoriteUsers || favoriteUsers.length === 0) {
        return [];
      }

      const favoriteUserIds = favoriteUsers.map((fav) => fav.favorite_user_id);

      // 즐겨찾기한 유저들의 포스트 조회
      const favoritePosts = (await Post.find({
        user_id: { $in: favoriteUserIds },
      })
        .sort({ created_date: -1 })
        .exec()) as IPost[];

      // 닉네임 추가
      const postsWithDetails = await Promise.all(
        favoritePosts.map(async (post) => {
          const postUser = await User.findOne({ user_id: post.user_id });
          return {
            ...post.toObject(),
            nickname: postUser ? postUser.nickname : null,
            is_favorite: true,
          };
        })
      );

      return postsWithDetails;
    } catch (error) {
      console.error("즐겨찾기 포스트 조회 에러", error);
      return null;
    }
  }

  public async searchPostsComprehensive(
    searchTerm: string,
    page: number = 1,
    limit: number = 5
  ): Promise<{ posts: any[]; total: number; totalPages: number } | null> {
    try {
      if (!searchTerm || searchTerm.trim() === "") {
        return {
          posts: [],
          total: 0,
          totalPages: 0,
        };
      }
      const skip = (page - 1) * limit;

      // 닉네임으로 사용자 ID 찾기
      const users = await User.find({
        nickname: { $regex: searchTerm, $options: "i" },
      });

      const userIds = users.map((user) => user.user_id);

      // 검색 쿼리 구성 (제목, 내용, 작성자 닉네임)
      const searchQuery = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { contents: { $regex: searchTerm, $options: "i" } },
          { user_id: { $in: userIds } },
        ],
      };

      // 검색 조건에 맞는 전체 게시물 수 계산
      const total = await Post.countDocuments(searchQuery);
      const totalPages = Math.ceil(total / limit);

      // 검색 조건에 맞는 게시물 가져오기 (페이지네이션 적용)
      const posts = await Post.find(searchQuery)
        .sort({ created_date: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      if (!posts || posts.length === 0) {
        return {
          posts: [],
          total: 0,
          totalPages: 0,
        };
      }

      // 각 게시물에 닉네임 추가
      const postsWithNickname = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findOne({ user_id: post.user_id });
          return {
            ...post.toObject(),
            nickname: user ? user.nickname : null,
          };
        })
      );

      return {
        posts: postsWithNickname,
        total,
        totalPages,
      };
    } catch (error) {
      console.error("통합 검색 에러", error);
      return null;
    }
  }
}

export default new PostService();
