"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
class RankingService {
    // 특정 유저의 랭킹 조회
    getUserRank(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ user_id }).exec();
                if (!user) {
                    return null;
                }
                // 유저의 게시물 수와 좋아요 수 계산
                const posts = yield postModel_1.default.find({ user_id }).exec();
                const totalPosts = posts.length;
                const totalLikes = posts.reduce((sum, post) => sum + (post.like_count || 0), 0);
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
            }
            catch (error) {
                console.error("유저 랭킹 조회 에러", error);
                return null;
            }
        });
    }
    // 랭크 결정 함수
    determineRank(score) {
        if (score >= 5000)
            return "Diamond";
        if (score >= 3000)
            return "Platinum";
        if (score >= 1500)
            return "Gold";
        if (score >= 800)
            return "Silver";
        if (score >= 300)
            return "Bronze";
        return "Iron";
    }
    // 세부 랭크 결정 (예: Gold4, Gold3 등)
    getDetailedRank(baseRank, score) {
        const rankLevels = {
            Diamond: [5000, 6000, 7000, 8000],
            Platinum: [3000, 3500, 4000, 4500],
            Gold: [1500, 1800, 2200, 2600],
            Silver: [800, 1000, 1200, 1350],
            Bronze: [300, 400, 500, 650],
            Iron: [0, 80, 150, 220],
        };
        const levels = rankLevels[baseRank];
        // 랭크 내 티어 결정 (4가 가장 낮고, 1이 가장 높음)
        for (let i = 0; i < levels.length; i++) {
            if (score < levels[i]) {
                return `${baseRank}${4 - i}`;
            }
        }
        return `${baseRank}1`;
    }
    // 진행률 계산 (현재 랭크에서 다음 랭크까지의 진행 정도)
    calculateProgress(score, currentRank) {
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
        const thresholds = rankThresholds[baseRank];
        const currentTierIndex = 4 - tier;
        // 현재 티어의 최소값과 최대값(다음 티어의 최소값) 가져오기
        const currentTierMin = thresholds[currentTierIndex];
        const nextTierMin = thresholds[currentTierIndex + 1];
        // 현재 티어의 범위(시작점)을 정확히 계산하기 위해 이전 티어의 최대값 가져오기
        const prevTierMax = currentTierIndex > 0 ? thresholds[currentTierIndex - 1] : 0;
        // 점수가 현재 티어 최소값보다 작으면(비정상), 이전 티어와의 경계에서 계산
        if (score < currentTierMin) {
            return ((score - prevTierMax) / (currentTierMin - prevTierMax)) * 100;
        }
        // 정상적인 경우: 현재 티어 내에서 진행률 계산
        const progress = ((score - currentTierMin) / (nextTierMin - currentTierMin)) * 100;
        return Math.min(Math.round(progress * 10) / 10, 99.9); // 최대 99.9%로 제한
    }
}
exports.default = new RankingService();
