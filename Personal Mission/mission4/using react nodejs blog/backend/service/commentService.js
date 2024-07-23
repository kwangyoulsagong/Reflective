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
const commentModel_1 = __importDefault(require("../model/commentModel"));
class CommentService {
    // 댓글 저장 서비스
    saveComment(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = Object.assign(Object.assign({}, data), { user_id: user_id });
            const comment = new commentModel_1.default(body);
            if (comment) {
                return yield comment.save();
            }
            return null;
        });
    }
}
exports.default = new CommentService;
