import { useEffect, useState } from "react";
import { commentState } from "../../types/types";
import useGetCommentQuery from "../api/useGetCommentQuery";

const useFetchingComments = (postId: string) => {
  const [comments, setComments] = useState<commentState[]>([]);
  const { data, isLoading, error, refetch } = useGetCommentQuery(postId);
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

  return { comments, isLoading, error, refetch };
};
export default useFetchingComments;
