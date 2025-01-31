import unheart from "../../../assets/unheart.png";
import heart from "../../../assets/heart.png";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/button";

import usePost from "../../../libs/hooks/post/usePost";
import { USER_ID_KEY } from "../../../../../shared/constants/api";
import { formatRelativeTime } from "../../../../../utils/times";
import useLike from "../../../libs/hooks/post/useLike";
import { getPostType } from "../../../model/post/type";

const PostHeader = ({ data }: { data: Partial<getPostType> }) => {
  const user_id = localStorage.getItem(USER_ID_KEY);
  const { isLiked, likeCount, handleLike } = useLike(
    data?.post_id || "",
    data?.like_count || 0,
    false
  );
  const { isFavorite, handleDeletePost, handleUpdatePost, handleAddFavorite } =
    usePost({ data });

  return (
    <header className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10">
      <section className="flex gap-2 sm:gap-3 items-center">
        <b className="text-sm sm:text-base">{data?.nickname}</b>
        <span className="text-gray-400">-</span>
        <span className="text-sm sm:text-base text-gray-600">
          {formatRelativeTime(data?.created_date || "")}
        </span>
      </section>

      <section className="flex gap-2 items-center">
        <Button variant="like" onClick={handleLike}>
          <img
            src={isLiked ? heart : unheart}
            alt="Like"
            className="w-full h-full"
          />
        </Button>
        <span className="text-sm sm:text-base">{likeCount}</span>
      </section>

      <section>
        <Button
          variant="favorite"
          onClick={() => handleAddFavorite(data?.user_id || "")}
        >
          {isFavorite ? "취소하기" : "즐겨찾기"}
        </Button>
      </section>

      {user_id === data.user_id && (
        <section className="flex gap-2 sm:gap-3 items-center ml-auto">
          <Button
            variant="edit"
            onClick={handleUpdatePost}
            icon={<Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
          >
            <span className="hidden sm:inline text-primary">수정</span>
          </Button>
          <Button
            variant="delete"
            onClick={() => handleDeletePost(data.post_id || "")}
            icon={<Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            <span className="hidden sm:inline">삭제</span>
          </Button>
        </section>
      )}
    </header>
  );
};

export default PostHeader;
