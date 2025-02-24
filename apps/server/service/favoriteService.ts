import { Types } from "mongoose"; // Import Types from mongoose
import Favorite, { IFavorite } from "../model/favoriteModel"; // Favorite 모델 import
import Post, { IPost } from "../model/postModel";
import Profile, { IProfile } from "../model/profileModel";

interface ProfileWithCounts {
  profile: IProfile | null;
  followers: number;
  following: number;
  isFollowing?: boolean;
}

interface FollowerInfo {
  user_id: string;
  profile_image: string | null;
  favorite_id: string;
  created_at: Date;
}

interface FavoriteDocument extends IFavorite {
  createdAt: Date;
  updatedAt: Date;
}
class FavoriteService {
  // 즐겨찾기 추가 메서드
  public async addFavorite(
    user_id: string,
    favorite_id: string
  ): Promise<IFavorite | null> {
    try {
      const userObjectId = new Types.ObjectId(user_id);
      const favoriteObjectId = new Types.ObjectId(favorite_id);

      // 이미 즐겨찾기한 유저인지 확인
      const existingFavorite = await Favorite.findOne({
        user_id: userObjectId,
        favorite_user_id: favoriteObjectId,
      });

      if (existingFavorite) {
        console.log("이미 즐겨찾기한 유저입니다.");
        return null; // 이미 즐겨찾기한 경우 null 반환
      }

      // 즐겨찾기 추가, is_favorite를 true로 설정
      const newFavorite = new Favorite({
        user_id: userObjectId,
        favorite_user_id: favoriteObjectId,
        is_favorite: true, // 즐겨찾기 추가 시 true로 설정
      });

      return await newFavorite.save(); // 저장 후 결과 반환
    } catch (error) {
      console.error("즐겨찾기 추가 중 오류 발생:", error);
      return null; // 오류 발생 시 null 반환
    }
  }

  // 즐겨찾기 삭제 메서드
  public async removeFavorite(
    user_id: string,
    favorite_id: string
  ): Promise<boolean> {
    try {
      const userObjectId = new Types.ObjectId(user_id);
      const favoriteObjectId = new Types.ObjectId(favorite_id);

      // 즐겨찾기 삭제
      const result = await Favorite.deleteOne({
        user_id: userObjectId,
        favorite_user_id: favoriteObjectId,
      });

      return result.deletedCount === 1; // 삭제 성공 여부 반환
    } catch (error) {
      console.error("즐겨찾기 삭제 중 오류 발생:", error);
      return false; // 오류 발생 시 false 반환
    }
  }

  // 포스트에 대한 즐겨찾기 여부 확인 메서드
  public async getPostFavorite(
    user_id: string,
    post_id: string
  ): Promise<IFavorite | null> {
    try {
      // 주어진 post_id로 포스트 조회
      const post = await Post.findOne({ post_id: post_id })
        .select("user_id")
        .exec();
      if (!post) {
        console.log("포스트를 찾을 수 없습니다.");
        return null; // 포스트가 없으면 null 반환
      }

      // 포스트의 주인 user_id 가져오기
      const postOwnerId = post.user_id;

      // 현재 사용자가 해당 포스트를 즐겨찾기했는지 확인
      const favorite = await Favorite.findOne({
        user_id: new Types.ObjectId(user_id),
        favorite_user_id: postOwnerId,
      });

      return favorite; // 즐겨찾기 결과 반환 (존재하면 favorite 객체, 없으면 null)
    } catch (error) {
      console.error("즐겨찾기 조회 중 오류 발생:", error);
      return null; // 오류 발생 시 null 반환
    }
  }
  public async getFavoriteStory(user_id: string): Promise<IPost[] | null> {
    try {
      const userObjectId = new Types.ObjectId(user_id);
      // 즐겨찾기한 유저 목록 가져오기
      const favoriteUsers = await Favorite.find({
        user_id: userObjectId,
        is_favorite: true,
      }).select("favorite_user_id");
      if (!favoriteUsers || favoriteUsers.length === 0) {
        console.log("즐겨찾기한 유저가 없습니다.");
        return null;
      }

      const favoriteUsersIds = favoriteUsers.map((fav) => fav.favorite_user_id);
      console.log(favoriteUsersIds);
      // 24시간 이내에 작성된 포스트 가져오기
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 48);
      console.log(twentyFourHoursAgo);
      const posts = await Post.find({
        user_id: { $in: favoriteUsersIds },
        created_date: { $gte: twentyFourHoursAgo }, // 24시간 이내 포스트 필터링}
      })
        .sort({ created_at: -1 }) // 최신순으로 정렬
        .exec();
      return posts;
    } catch (error) {
      console.error("즐겨찾기한 유저의 포스트 조회 중 오류 발생:", error);
      return null; // 오류 발생 시 null 반환
    }
  }

  public async getProfileWithCounts(
    profile_user_id: string,
    current_user_id?: string
  ): Promise<ProfileWithCounts | null> {
    try {
      const profileObjectId = new Types.ObjectId(profile_user_id);

      // 프로필 정보 조회
      const profile = await Profile.findOne({
        user_id: profileObjectId,
      });

      // 팔로워 수 조회
      const followersCount = await Favorite.countDocuments({
        favorite_user_id: profileObjectId,
        is_favorite: true,
      });

      // 팔로잉 수 조회
      const followingCount = await Favorite.countDocuments({
        user_id: profileObjectId,
        is_favorite: true,
      });

      // 현재 사용자의 팔로우 여부 확인
      let isFollowing = undefined;
      if (current_user_id) {
        const currentUserObjectId = new Types.ObjectId(current_user_id);
        const followStatus = await Favorite.findOne({
          user_id: currentUserObjectId,
          favorite_user_id: profileObjectId,
          is_favorite: true,
        });
        isFollowing = !!followStatus;
      }

      return {
        profile,
        followers: followersCount,
        following: followingCount,
        ...(current_user_id && { isFollowing }),
      };
    } catch (error) {
      console.error("프로필 정보 조회 중 오류 발생:", error);
      return null;
    }
  }

  // 팔로워 목록 조회 메서드
  public async getFollowers(user_id: string): Promise<FollowerInfo[] | null> {
    try {
      const userObjectId = new Types.ObjectId(user_id);

      // 타입 단언을 사용하여 timestamps 필드 접근
      const followers = (await Favorite.find({
        favorite_user_id: userObjectId,
        is_favorite: true,
      }).lean()) as FavoriteDocument[];

      // 각 팔로워의 프로필 이미지 조회
      const followerInfos = await Promise.all(
        followers.map(async (follower) => {
          const profile = await Profile.findOne({
            user_id: follower.user_id,
          }).lean();

          return {
            user_id: follower.user_id.toString(),
            profile_image: profile?.image_url || null,
            favorite_id: follower.favorite_id.toString(),
            created_at: follower.createdAt, // 이제 타입 에러가 발생하지 않습니다
          };
        })
      );

      return followerInfos;
    } catch (error) {
      console.error("팔로워 목록 조회 중 오류 발생:", error);
      return null;
    }
  }

  // 팔로잉 목록 조회 메서드
  public async getFollowing(user_id: string): Promise<FollowerInfo[] | null> {
    try {
      const userObjectId = new Types.ObjectId(user_id);

      // 타입 단언을 사용하여 timestamps 필드 접근
      const following = (await Favorite.find({
        user_id: userObjectId,
        is_favorite: true,
      }).lean()) as FavoriteDocument[];

      // 각 팔로잉 유저의 프로필 이미지 조회
      const followingInfos = await Promise.all(
        following.map(async (follow) => {
          const profile = await Profile.findOne({
            user_id: follow.favorite_user_id,
          }).lean();

          return {
            user_id: follow.favorite_user_id.toString(),
            profile_image: profile?.image_url || null,
            favorite_id: follow.favorite_id.toString(),
            created_at: follow.createdAt,
          };
        })
      );

      return followingInfos;
    } catch (error) {
      console.error("팔로잉 목록 조회 중 오류 발생:", error);
      return null;
    }
  }
}

export default new FavoriteService();
