import unheart from "../../../assets/unheart.png";
import heart from "../../../assets/heart.png";
import { USER_ID_KEY } from "../../../constants/api";
import useLike from "../../../hooks/api/useLike";
import { formatRelativeTime } from "../../../utils/times";
import { getPostType } from "../../../types/types";
import usePost from "../../../hooks/Post/usePost";
import { Pencil, Trash2 } from "lucide-react";

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
    <header className="flex flex-wrap  items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10">
      <section className="flex gap-2 sm:gap-3 items-center">
        <b className="text-sm sm:text-base">{data?.nickname}</b>
        <span className="text-gray-400">-</span>
        <span className="text-sm sm:text-base text-gray-600">
          {formatRelativeTime(data?.created_date || "")}
        </span>
      </section>

      <section className="flex gap-2 items-center">
        <button
          onClick={handleLike}
          className="w-6 h-6 sm:w-[30px] sm:h-[30px] transition-transform hover:scale-110"
        >
          <img
            src={isLiked ? heart : unheart}
            alt="Like"
            className="w-full h-full"
          />
        </button>
        <span className="text-sm sm:text-base">{likeCount}</span>
      </section>

      <section>
        <button
          onClick={() => handleAddFavorite(data?.user_id || "")}
          className="w-[60px] sm:w-[80px] md:w-[100px] h-[35px] sm:h-[38px] md:h-[40px] 
                   border-[2px] sm:border-[3px] border-primary rounded-[20px] 
                   text-primary text-sm sm:text-base
                   transition-colors hover:bg-primary hover:text-white"
        >
          {isFavorite ? "취소하기" : "즐겨찾기"}
        </button>
      </section>

      {user_id === data.user_id && (
        <section className="flex gap-2 sm:gap-3 items-center ml-auto">
          <button
            onClick={handleUpdatePost}
            className="flex items-center gap-1 px-3 py-2 text-sm sm:text-base
                     rounded-lg border border-gray-200 
                     text-blue-600 hover:bg-blue-50 
                     transition-colors"
          >
            <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="hidden sm:inline text-primary">수정</span>
          </button>
          <button
            onClick={() => handleDeletePost(data.post_id || "")}
            className="flex items-center gap-1 px-3 py-2 text-sm sm:text-base
                     rounded-lg border border-gray-200 
                     text-red-600 hover:bg-red-50 
                     transition-colors"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">삭제</span>
          </button>
        </section>
      )}
    </header>
  );
};

export default PostHeader;
