import { useState } from "react";
import { usePost_idStore } from "../../provider/post_idProvider";
import useFetchingComments from "../../hooks/Commnets/useFetchingComments";
import useCommentsBuilder from "../../hooks/Commnets/useUpdateComments";
import Comment from "./Comment/Comment";
import Button from "./Common/Button/Button";

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
    <div className="flex flex-col mt-20 items-center gap-4 w-full max-w-3xl mx-auto">
      <textarea
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="댓글을 작성해주세요..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={3}
      />
      <div className="flex justify-end w-full">
        <Button variant="primary" onClick={() => handleSaveComment(null)}>
          댓글 작성
        </Button>
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
