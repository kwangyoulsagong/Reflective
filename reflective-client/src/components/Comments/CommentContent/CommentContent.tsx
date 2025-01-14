import { formatRelativeTime } from "../../../hooks/TimeReducer";
import { commentContentProps } from "../../../types/Comments/CommentContent/type";

const CommentContent = ({
  comment,
  isReply = false,
  editingComment,
  editContent,
  setEditContent,
  setEditingComment,
  handleUpdateComment,
}: commentContentProps) => {
  return (
    <div className="flex items-start space-x-3">
      <img
        className={`${
          isReply ? "w-8 h-8" : "w-10 h-10"
        } rounded-full object-cover`}
        src={comment.image_url}
        alt={`${comment.nickname}'s avatar`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className={`font-bold ${isReply ? "text-sm" : ""}`}>
            {comment.nickname}
          </span>
          <span className={`text-gray-500 ${isReply ? "text-xs" : "text-sm"}`}>
            {formatRelativeTime(comment.created_date)}
          </span>
        </div>
        {editingComment === comment.comment_id ? (
          <div>
            <textarea
              className="w-full p-2 mt-1 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-1 space-x-2">
              <button
                onClick={handleUpdateComment}
                className="px-3 py-1 text-sm text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
              >
                수정완료
              </button>
              <button
                onClick={() => setEditingComment(null)}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className={`mt-1 ${isReply ? "text-sm" : ""} text-gray-700`}>
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};
export default CommentContent;
