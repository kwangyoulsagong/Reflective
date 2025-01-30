import {
  ChevronDown,
  ChevronUp,
  Edit2,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { commentActionProps } from "../../../types/Comments/CommentAction/type";
import Button from "../Common/Button/Button";

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
        <Button
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
        </Button>
      )}
      <Button variant="action" onClick={() => handleEditComment(comment)}>
        <Edit2 size={16} className="mr-1" />
        수정
      </Button>
      <Button
        variant="action"
        onClick={() => handleDeleteComment(comment.comment_id)}
        className="hover:text-red-500"
      >
        <Trash2 size={16} className="mr-1" />
        삭제
      </Button>
    </div>
  );
};
export default CommentAction;
