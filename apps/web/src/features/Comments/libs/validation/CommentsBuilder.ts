import { commentState } from "@/types/types";

export class CommentBuilder {
  builderCommentTree(commentData: commentState[]): commentState[] {
    const commentWithReplies = commentData.map((comment) => ({
      ...comment,
      replies: [],
    }));
    this.attachReplies(commentWithReplies);
    return this.getRootComment(commentWithReplies);
  }
  private attachReplies(comments: commentState[]): void {
    comments.forEach((comment: commentState) => {
      if (comment.parent_comment_id != null) {
        const parentComment = comments.find(
          (c: commentState) => c.comment_id == comment.parent_comment_id
        );
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
    });
  }
  private getRootComment(comments: commentState[]): commentState[] {
    return comments.filter((c: commentState) => c.parent_comment_id == null);
  }
}
