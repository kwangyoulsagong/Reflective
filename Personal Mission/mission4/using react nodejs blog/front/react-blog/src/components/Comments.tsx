import { useEffect, useState } from "react";
import { usePost_idStore } from "../provider/post_idProvider";
import useSaveCommentMutation from "../hooks/api/useSaveCommentMutation";
import useGetCommentQuery from "../hooks/api/useGetCommentQuery";
import { formatRelativeTime } from "../hooks/TimeReducer";
import { commentState } from "../types/types";

const Comments = () => {
  const { post_id } = usePost_idStore();
  const [newComment, setNewComment] = useState(""); // For new comment input
  const [comments, setComments] = useState<commentState[]>([]); // For fetched comments
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );

  const { mutate } = useSaveCommentMutation();
  const { data, isLoading, error, refetch } = useGetCommentQuery(post_id);

  const handleSaveComment = async (parent_comment_id: string | null = null) => {
    const content = parent_comment_id
      ? replyContent[parent_comment_id]
      : newComment;

    if (!content) return;

    const body = {
      post_id,
      parent_comment_id,
      content,
    };
    mutate(body);
    if (parent_comment_id) {
      setReplyContent((prev) => ({ ...prev, [parent_comment_id]: "" }));
    } else {
      setNewComment("");
    }
    refetch();
  };

  const fetchComments = () => {
    if (!data) return;

    const commentsData = data.map((comment: commentState) => ({
      ...comment,
      replies: [],
    }));

    commentsData.forEach((comment: commentState) => {
      if (comment.parent_comment_id != null) {
        const parentComment = commentsData.find(
          (c: commentState) => c.comment_id === comment.parent_comment_id
        );
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
    });

    const rootComments = commentsData.filter(
      (comment: commentState) => comment.parent_comment_id === null
    );
    setComments(rootComments);
  };

  useEffect(() => {
    if (data) {
      fetchComments();
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center gap-4  w-[700px] ">
      <textarea
        className="w-[inherit] h-[auto] outline-none resize-none border p-[10px] "
        placeholder="댓글을 작성해주세요..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <div className="flex justify-end w-[inherit]">
        <button
          onClick={() => handleSaveComment(null)}
          className="w-[100px] h-[30px] border-2 border-primary rounded-[20px] text-primary"
        >
          댓글 작성
        </button>
      </div>
      <section className="flex flex-col  w-[inherit] h-auto gap-7">
        {comments.map((comment: commentState) => (
          <div
            key={comment.comment_id}
            className="w-[inherit] flex flex-col gap-4 justify-center border-b"
          >
            <div className="flex gap-3 items-center">
              <img
                className="border w-[50px] h-[50px] rounded-[25px]"
                src={comment.image_url}
                alt="User Avatar"
              />
              <div className="flex flex-col">
                <b>{comment.nickname}</b>
                <span>{formatRelativeTime(comment.created_date)}</span>
              </div>
            </div>
            <span>{comment.content}</span>
            <div className="ml-8">
              <textarea
                className="w-[inherit] h-[auto] outline-none resize-none border p-[5px] mt-2"
                placeholder="답글을 작성해주세요..."
                value={replyContent[comment.comment_id] || ""}
                onChange={(e) =>
                  setReplyContent({
                    ...replyContent,
                    [comment.comment_id]: e.target.value,
                  })
                }
              ></textarea>
              <div className="flex justify-end w-[inherit]">
                <button
                  onClick={() => handleSaveComment(comment.comment_id)}
                  className="w-[80px] h-[30px] border-2 border-primary rounded-[15px] text-primary mt-1"
                >
                  답글 작성
                </button>
              </div>
            </div>
            <div className="ml-8">
              {comment.replies.map((reply: commentState) => (
                <div
                  key={reply.comment_id}
                  className="w-[inherit] h-auto flex flex-col gap-10 justify-center border-b"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      className="border w-[40px] h-[40px] rounded-[20px]"
                      src={reply.image_url}
                      alt="Reply Avatar"
                    />
                    <div className="flex flex-col">
                      <b>{reply.nickname}</b>
                      <span>{formatRelativeTime(reply.created_date)}</span>
                    </div>
                  </div>
                  <span>{reply.content}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Comments;
