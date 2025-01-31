import { useState } from "react";
import { usePost_idStore } from "../../provider/post_idProvider";
import useFetchingComments from "../../hooks/Commnets/useFetchingComments";
import useCommentsBuilder from "../../hooks/Commnets/useUpdateComments";
import Comment from "./Comment/Comment";
import TextArea from "./Common/TextArea/TextArea";
import { CommentButton } from "@repo/ui/commentbutton";

const Comments = () => {
  const { post_id } = usePost_idStore();
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { comments, isLoading, error } = useFetchingComments(post_id);
  const {
    handleSaveComment,
    handleDeleteComment,
    handleEditComment,
    handleUpdateComment,
    newComment,
    setNewComment,
    replyContent,
    setReplyContent,
    editingComment,
    setEditingComment,
    editContent,
    setEditContent,
  } = useCommentsBuilder({ post_id });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col mt-8 sm:mt-12 lg:mt-20 items-center gap-3 sm:gap-4 w-[80%] px-4 sm:px-6 max-w-3xl mx-auto">
      <TextArea
        variant="new"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={3}
      />

      <div className="flex justify-end w-full">
        <CommentButton
          variant="primary"
          onClick={() => handleSaveComment(null)}
        >
          댓글 작성
        </CommentButton>
      </div>
      <section className="w-full space-y-6">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleSaveComment={handleSaveComment}
            editingComment={editingComment}
            editContent={editContent}
            setEditContent={setEditContent}
            setEditingComment={setEditingComment}
            handleUpdateComment={handleUpdateComment}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </section>
    </div>
  );
};

export default Comments;
