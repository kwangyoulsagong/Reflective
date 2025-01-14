import {
  ChevronDown,
  ChevronUp,
  Edit2,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { commentActionProps } from "../../../types/Comments/CommentAction/type";

const CommentAction = ({
  comment,
  isReply = false,
  showReplies,
  setShowReplies,
  handleEditComment,
  handleDeleteComment,
}: commentActionProps) => {
  const toggleReplies = (commentId: string) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div
      className={`mt-2 flex items-center space-x-4 ${
        isReply ? "ml-11" : "ml-13"
      }`}
    >
      {!isReply && (
        <button
          onClick={() => toggleReplies(comment.comment_id)}
          className="text-sm text-primary flex items-center"
        >
          <MessageCircle size={16} className="mr-1" />
          {comment.replies.length} 개의 답글
          {showReplies[comment.comment_id] ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      )}
      <button
        onClick={() => handleEditComment(comment)}
        className="text-sm text-gray-500 flex items-center hover:text-primary"
      >
        <Edit2 size={16} className="mr-1" />
        수정
      </button>
      <button
        onClick={() => handleDeleteComment(comment.comment_id)}
        className="text-sm text-gray-500 flex items-center hover:text-red-500"
      >
        <Trash2 size={16} className="mr-1" />
        삭제
      </button>
    </div>
  );
};
export default CommentAction;
