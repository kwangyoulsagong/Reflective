import { CommentButton } from "@repo/ui/commentbutton";

import TextArea from "../Common/TextArea/TextArea";
import { commentContentProps } from "../../../../entities/Comments/model/CommentContent/type";
import { formatRelativeTime } from "@repo/ui/time";

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
    <div className="flex  items-start space-x-2 sm:space-x-3">
      <img
        className={`${
          isReply ? "w-6 h-6 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-10 sm:h-10"
        } rounded-full object-cover`}
        src={comment.image_url}
        alt={`${comment.nickname}'s avatar`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`font-bold ${
              isReply ? "text-xs sm:text-sm" : "text-sm sm:text-base"
            }`}
          >
            {comment.nickname}
          </span>
          <span
            className={`text-gray-500 ${
              isReply ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {formatRelativeTime(comment.created_date)}
          </span>
        </div>

        {editingComment === comment.comment_id ? (
          <div>
            <TextArea
              variant="update"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-1 space-x-2">
              <CommentButton variant="sm-primary" onClick={handleUpdateComment}>
                수정완료
              </CommentButton>
              <CommentButton
                variant="cancel"
                onClick={() => setEditingComment(null)}
              >
                취소
              </CommentButton>
            </div>
          </div>
        ) : (
          <p
            className={`mt-1 ${
              isReply ? "text-xs sm:text-sm" : "text-sm sm:text-base"
            } text-gray-700`}
          >
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};
export default CommentContent;
