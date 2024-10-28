import { useEffect, useState } from "react";
import UseGetLike from "./api/useGetLike";
import UsePatchLike from "./api/usePatchLike";
const useLike = (
  postId: string,
  initialLikeCount: number,
  initialLiked: boolean
) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

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
    }
  };

  return { isLiked, likeCount, handleLike };
};
export default useLike;
