import Comment, {IComment} from "../model/commentModel";

class CommentService{

    // 댓글 저장 서비스
    public async saveComment(user_id: string, data: IComment): Promise<IComment | null> {
        const body = {
            ...data,
            user_id: user_id
        };
        const comment = new Comment(body);
        if (comment) {
            return await comment.save();
        }
        return null;
    }
}

export default new CommentService