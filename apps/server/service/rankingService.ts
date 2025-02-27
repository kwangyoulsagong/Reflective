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
    if (score >= 5000) return "Diamond";
    if (score >= 3000) return "Platinum";
    if (score >= 1500) return "Gold";
    if (score >= 800) return "Silver";
    if (score >= 300) return "Bronze";
    return "Iron";
  }

  // 세부 랭크 결정 (예: Gold4, Gold3 등)
  private getDetailedRank(baseRank: string, score: number): string {
    const rankLevels = {
      Diamond: [5000, 6000, 7000, 8000],
      Platinum: [3000, 3500, 4000, 4500],
      Gold: [1500, 1800, 2200, 2600],
      Silver: [800, 1000, 1200, 1350],
      Bronze: [300, 400, 500, 650],
      Iron: [0, 80, 150, 220],
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
      Diamond: [5000, 6000, 7000, 8000, 10000],
      Platinum: [3000, 3500, 4000, 4500, 5000],
      Gold: [1500, 1800, 2200, 2600, 3000],
      Silver: [800, 1000, 1200, 1350, 1500],
      Bronze: [300, 400, 500, 650, 800],
      Iron: [0, 80, 150, 220, 300],
    };

    const thresholds = rankThresholds[baseRank as keyof typeof rankThresholds];
    const currentTierIndex = 4 - tier;

    // 현재 티어의 최소값과 최대값(다음 티어의 최소값) 가져오기
    const currentTierMin = thresholds[currentTierIndex];
    const nextTierMin = thresholds[currentTierIndex + 1];

    // 현재 티어의 범위(시작점)을 정확히 계산하기 위해 이전 티어의 최대값 가져오기
    const prevTierMax =
      currentTierIndex > 0 ? thresholds[currentTierIndex - 1] : 0;

    // 점수가 현재 티어 최소값보다 작으면(비정상), 이전 티어와의 경계에서 계산
    if (score < currentTierMin) {
      return ((score - prevTierMax) / (currentTierMin - prevTierMax)) * 100;
    }

    // 정상적인 경우: 현재 티어 내에서 진행률 계산
    const progress =
      ((score - currentTierMin) / (nextTierMin - currentTierMin)) * 100;
    return Math.min(Math.round(progress * 10) / 10, 99.9); // 최대 99.9%로 제한
  }
}

export default new RankingService();
