import { CommentButton } from "@repo/ui/commentbutton";

import CommentAction from "../CommentAction/CommentAction";
import CommentContent from "../CommentContent/CommentContent";
import TextArea from "../Common/TextArea/TextArea";
import { commentProps } from "../../../../entities/Comments/model/type";

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
            <TextArea
              variant="reply"
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
              <CommentButton
                variant="secondary"
                onClick={() => handleSaveComment(comment.comment_id)}
              >
                답글 작성
              </CommentButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Comment;
