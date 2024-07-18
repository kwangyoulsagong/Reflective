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
const profileModel_1 = __importDefault(require("../model/profileModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
class ProfileService {
    //프로필 조회
    GetProfile(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user_id);
            const profile = yield profileModel_1.default.findOne({ user_id: user_id });
            console.log(profile);
            if (!profile) {
                throw new Error('프로필을 찾을 수 없습니다.');
            }
            const user = yield userModel_1.default.findOne({ user_id: user_id });
            if (!user) {
                throw new Error('유저를 찾을 수 없습니다.');
            }
            return {
                nickname: user.nickname,
                email: user.email,
                phone_number: user.phone_number,
                image_url: profile.image_url,
            };
        });
    }
    // 프로필 이미지 업데이트
    UpdateProfileImage(user_id, img) {
        return __awaiter(this, void 0, void 0, function* () {
            // 회원 프로필 찾기
            const profile = yield profileModel_1.default.findOne({ user_id: user_id });
            if (!profile) {
                throw new Error('프로필을 찾을 수 없습니다.');
            }
            // 이미지 업데이트
            profile.image_url = img;
            return yield profile.save();
        });
    }
    // 프로필 정보 업데이트
    UpdateProfile(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield userModel_1.default.findOne({ user_id: user_id });
            if (!profile) {
                throw new Error('프로필을 찾을 수 없습니다.');
            }
            profile.nickname = data.nickname;
            profile.phone_number = data.phone_number;
            return yield profile.save();
        });
    }
}
exports.default = new ProfileService();
