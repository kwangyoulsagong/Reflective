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
const rankingService_1 = __importDefault(require("../service/rankingService"));
class RankingController {
    // 특정 유저 랭킹 조회
    getUserRank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "인증 권한 없음" });
                    return;
                }
                const userId = req.user.user_id;
                const userRank = yield rankingService_1.default.getUserRank(userId);
                if (userRank) {
                    res.status(200).json(userRank);
                }
                else {
                    res.status(404).json({ message: "유저 없음" });
                }
            }
            catch (error) {
                console.error("유저 랭킹 조회 컨트롤러 에러", error);
                res.status(500).json({
                    message: "서버 오류가 발생했습니다.",
                });
            }
        });
    }
}
exports.default = new RankingController();
