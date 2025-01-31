import { useEffect, useState } from "react";

import useGetCommentQuery from "../useGetCommentQuery";
import { CommentBuilder } from "../../validation/CommentsBuilder";
import { commentState } from "../../../model/comment/type";

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
