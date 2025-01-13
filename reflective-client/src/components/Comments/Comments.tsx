import { useState } from "react";
import { usePost_idStore } from "../../provider/post_idProvider";
import useFetchingComments from "../../hooks/Commnets/useFetchingComments";

const Comments = () => {
  const { post_id } = usePost_idStore();
  const [newComment, setNewComment] = useState("");
  const { comments, isLoading, error, refetch } = useFetchingComments(post_id);
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
        <button
          onClick={() => handleSaveComment(null)}
          className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
        >
          댓글 작성
        </button>
      </div>
      <section className="w-full space-y-6">
        {comments.map((comment) => renderComment(comment))}
      </section>
    </div>
  );
};
export default Comments;
