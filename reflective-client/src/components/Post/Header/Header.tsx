import unheart from "../../../assets/unheart.png";
import heart from "../../../assets/heart.png";
import { USER_ID_KEY } from "../../../constants/api";
import useLike from "../../../hooks/api/useLike";
import { formatRelativeTime } from "../../../utils/times";
import { getPostType } from "../../../types/types";
import usePost from "../../../hooks/Post/usePost";
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
    <header className="flex gap-10 items-center">
      <section className="flex gap-3">
        <b>{data?.nickname}</b>
        <span>-</span>
        <span>{formatRelativeTime(data?.created_date || "")}</span>
      </section>
      <section className="flex gap-2">
        <button onClick={handleLike} className="w-[30px] h-[30px]">
          <img className="" src={isLiked ? heart : unheart} alt="Like" />
        </button>
        <span>{likeCount}</span>
      </section>
      <section>
        <button
          onClick={() => handleAddFavorite(data?.user_id || "")}
          className="w-[60px] sm:w-[80px] md:w-[100px] h-[35px] sm:h-[38px] md:h-[40px] border-[2px] sm:border-[3px] border-primary rounded-[20px] box-border text-primary text-sm sm:text-base"
        >
          {isFavorite ? "취소하기" : "즐겨찾기"}
        </button>
      </section>
      {user_id === data.user_id && (
        <section className="flex gap-3">
          <button onClick={handleUpdatePost}>수정</button>
          <button onClick={() => handleDeletePost(data.post_id || "")}>
            삭제
          </button>
        </section>
      )}
    </header>
  );
};
export default PostHeader;
