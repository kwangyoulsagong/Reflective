import { useEffect, useState } from "react";
import { commentState } from "../../types/types";
import useGetCommentQuery from "../api/useGetCommentQuery";
import { CommentBuilder } from "../../services/Comments/CommentsBuilder";

const useFetchingComments = (postId: string) => {
  const [comments, setComments] = useState<commentState[]>([]);
  const { data, isLoading, error, refetch } = useGetCommentQuery(postId);
  const commentBuilder = new CommentBuilder();

  useEffect(() => {
    if (data) {
      const commentTree = commentBuilder.builderCommentTree(data);
      setComments(commentTree);
    }
  }, [data]);

  return { comments, isLoading, error, refetch };
};
export default useFetchingComments;
