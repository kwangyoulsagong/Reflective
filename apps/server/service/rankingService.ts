import { Types } from "mongoose";
import User from "../model/userModel";
import Post from "../model/postModel";

// Define types
export interface UserRankType {
  user_id?: string;
  nickname: string;
  rank: string;
  rate: number;
  log: number;
  progress: number;
}

class RankingService {
  // 특정 유저의 랭킹 조회
  public async getUserRank(user_id: string): Promise<UserRankType | null> {
    try {
      const user = await User.findOne({ user_id }).exec();
      if (!user) {
        return null;
      }

      // 유저의 게시물 수와 좋아요 수 계산
      const posts = await Post.find({ user_id }).exec();
      const totalPosts = posts.length;
      const totalLikes = posts.reduce(
        (sum, post) => sum + (post.like_count || 0),
        0
      );

      // 활동 점수 계산
      const activityScore = totalPosts * 10 + totalLikes;

      // 기본 랭크 결정
      const baseRank = this.determineRank(activityScore);

      // 세부 랭크 결정 (Gold4, Silver2 등)
      const detailedRank = this.getDetailedRank(baseRank, activityScore);

      // 진행률 계산
      const progress = this.calculateProgress(activityScore, detailedRank);

      return {
        user_id,
        nickname: user.nickname,
        rank: detailedRank,
        rate: activityScore,
        log: totalPosts,
        progress: progress,
      };
    } catch (error) {
      console.error("유저 랭킹 조회 에러", error);
      return null;
    }
  }

  // 랭크 결정 함수
  private determineRank(score: number): string {
    if (score >= 1000) return "Diamond";
    if (score >= 800) return "Platinum";
    if (score >= 120) return "Gold";
    if (score >= 50) return "Silver";
    if (score >= 20) return "Bronze";
    return "Iron";
  }

  // 세부 랭크 결정 (예: Gold4, Gold3 등)
  private getDetailedRank(baseRank: string, score: number): string {
    const rankLevels = {
      Diamond: [1000, 1200, 1400, 1600],
      Platinum: [800, 850, 900, 950],
      Gold: [120, 180, 250, 450],
      Silver: [50, 65, 80, 95],
      Bronze: [20, 30, 35, 45],
      Iron: [0, 5, 10, 15],
    };

    const levels = rankLevels[baseRank as keyof typeof rankLevels];

    // 랭크 내 티어 결정 (4가 가장 낮고, 1이 가장 높음)
    for (let i = 0; i < levels.length; i++) {
      if (score < levels[i]) {
        return `${baseRank}${4 - i}`;
      }
    }

    return `${baseRank}1`;
  }

  // 진행률 계산 (현재 랭크에서 다음 랭크까지의 진행 정도)
  private calculateProgress(score: number, currentRank: string): number {
    const baseRank = currentRank.replace(/[0-9]/g, "");
    const tier = parseInt(currentRank.replace(/[^0-9]/g, "") || "4");

    const rankThresholds = {
      Diamond: [1000, 1200, 1400, 1600],
      Platinum: [800, 850, 900, 950],
      Gold: [120, 180, 250, 450],
      Silver: [50, 65, 80, 95],
      Bronze: [20, 30, 35, 45],
      Iron: [0, 5, 10, 15],
    };

    const thresholds = rankThresholds[baseRank as keyof typeof rankThresholds];
    const currentTierIndex = 4 - tier;
    const currentTierMin = thresholds[currentTierIndex];
    const nextTierMin = thresholds[currentTierIndex + 1];

    // 진행률 계산 (소수점 한 자리까지)
    const progress =
      ((score - currentTierMin) / (nextTierMin - currentTierMin)) * 100;
    return Math.min(Math.round(progress * 10) / 10, 99.9); // 최대 99.9%로 제한
  }
}

export default new RankingService();
