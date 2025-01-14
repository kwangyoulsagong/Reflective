import { commentProps } from "../../../types/Comments/\btype";
import CommentAction from "../CommentAction/CommentAction";
import CommentContent from "../CommentContent/CommentContent";

const Comment = ({
  comment,
  isReply = false,
  showReplies,
  setShowReplies,
  replyContent,
  setReplyContent,
  handleSaveComment,
  editingComment,
  editContent,
  setEditContent,
  setEditingComment,
  handleUpdateComment,
  handleEditComment,
  handleDeleteComment,
}: commentProps) => {
  return (
    <div
      key={comment.comment_id}
      className={`${isReply ? "ml-10" : "border-b pb-4"} mb-4`}
    >
      <CommentContent
        comment={comment}
        isReply={isReply}
        editingComment={editingComment}
        editContent={editContent}
        setEditContent={setEditContent}
        setEditingComment={setEditingComment}
        handleUpdateComment={handleUpdateComment}
      />
      <CommentAction
        comment={comment}
        isReply={isReply}
        showReplies={showReplies}
        setShowReplies={setShowReplies}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
      {!isReply && showReplies[comment.comment_id] && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              comment={reply}
              isReply={true}
              editContent={editContent}
              showReplies={showReplies}
              setShowReplies={setShowReplies}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleSaveComment={handleSaveComment}
              editingComment={editingComment}
              setEditContent={setEditContent}
              setEditingComment={setEditingComment}
              handleUpdateComment={handleUpdateComment}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
          <div className="mt-2 ml-10">
            <textarea
              className="w-full p-2 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="답글을 작성해주세요..."
              value={replyContent[comment.comment_id] || ""}
              onChange={(e) =>
                setReplyContent({
                  ...replyContent,
                  [comment.comment_id]: e.target.value,
                })
              }
              rows={2}
            />
            <div className="flex justify-end mt-1">
              <button
                onClick={() => handleSaveComment(comment.comment_id)}
                className="px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                답글 작성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Comment;
