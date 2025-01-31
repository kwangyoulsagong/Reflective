import {
  ChevronDown,
  ChevronUp,
  Edit2,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { commentActionProps } from "../../../types/Comments/CommentAction/type";
import { CommentButton } from "@repo/ui/commentbutton";

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
        <CommentButton
          variant="action"
          onClick={() => toggleReplies(comment.comment_id)}
          className="text-primary"
        >
          <MessageCircle size={16} className="mr-1" />
          {comment.replies.length} 개의 답글
          {showReplies[comment.comment_id] ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </CommentButton>
      )}
      <CommentButton
        variant="action"
        onClick={() => handleEditComment(comment)}
      >
        <Edit2 size={16} className="mr-1" />
        수정
      </CommentButton>
      <CommentButton
        variant="action"
        onClick={() => handleDeleteComment(comment.comment_id)}
        className="hover:text-red-500"
      >
        <Trash2 size={16} className="mr-1" />
        삭제
      </CommentButton>
    </div>
  );
};
export default CommentAction;
