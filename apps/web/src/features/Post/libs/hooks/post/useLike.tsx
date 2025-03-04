import { useEffect, useState } from "react";
import UseGetLike from "../../../api/Post/likes/useGetLike";
import UsePatchLike from "../../../api/Post/likes/usePatchLike";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../shared/constants/queryKeys";
import { useApiError } from "../../../../../shared/useApiError";

const useLike = (
  postId: string,
  initialLikeCount: number,
  initialLiked: boolean
) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await UseGetLike(postId);

        // response와 response.result가 존재하는지 확인
        if (
          response &&
          response.result &&
          response.result.is_liked !== undefined
        ) {
          setIsLiked(response.result.is_liked);
        }
      } catch (error) {
        // 좋아요 상태 조회 실패 시 에러 처리
        handleError(error);
      }
    };
    fetchLikeStatus();
  }, [postId, handleError]);

  const handleLike = async () => {
    try {
      const is_liked = !isLiked;
      const response = await UsePatchLike(postId, { is_liked });

      // response와 response.message가 존재하는지 확인
      if (response && response.message) {
        setIsLiked(is_liked);
        setLikeCount(likeCount + (is_liked ? 1 : -1));

        queryClient.invalidateQueries({
          queryKey: [queryKeys.PostDetail, postId],
        });
      }
    } catch (error) {
      // 좋아요 토글 실패 시 에러 처리
      handleError(error);
    }
  };

  return { isLiked, likeCount, handleLike };
};

export default useLike;
