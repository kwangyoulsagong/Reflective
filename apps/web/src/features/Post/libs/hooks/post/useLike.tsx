import { useEffect, useState } from "react";
import UseGetLike from "../../../api/Post/likes/useGetLike";
import UsePatchLike from "../../../api/Post/likes/usePatchLike";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../shared/constants/queryKeys";

const useLike = (
  postId: string,
  initialLikeCount: number,
  initialLiked: boolean
) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const queryclient = useQueryClient();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const response = await UseGetLike(postId);
      if (response.result?.is_liked !== undefined) {
        setIsLiked(response.result.is_liked);
      }
    };
    fetchLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    const is_liked = !isLiked;
    const response = await UsePatchLike(postId, { is_liked });
    if (response.message) {
      setIsLiked(is_liked);
      setLikeCount(likeCount + (is_liked ? 1 : -1));
      queryclient.invalidateQueries({
        queryKey: [queryKeys.PostDetail, postId],
      });
    }
  };

  return { isLiked, likeCount, handleLike };
};
export default useLike;
