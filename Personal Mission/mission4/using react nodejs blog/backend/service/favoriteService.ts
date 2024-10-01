import { Types } from "mongoose"; // Import Types from mongoose
import Favorite, { IFavorite } from "../model/favoriteModel"; // Favorite 모델 import
import Post from "../model/postModel";
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
}

export default new FavoriteService();
