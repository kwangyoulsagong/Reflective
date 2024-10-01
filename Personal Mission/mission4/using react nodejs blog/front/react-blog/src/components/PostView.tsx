import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/Preview.module.css";
import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import { useHeaderIDs, useToC } from "../hooks/usePostViewUtils";
import { getPostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";
import useLike from "../hooks/useLike";
import useDeletePostMutation from "../hooks/api/useDeletePostMutation";
import { useNavigate } from "react-router-dom";
import useSaveFavoritesMutation from "../hooks/api/useSaveFavoritesMutation";
import useGetPostFavoritesQuery from "../hooks/api/useGetPostFavoritesQuery";
import useDeleteFavoriteMutation from "../hooks/api/useDeleteFavoriteMutation";

const PostView = (data: Partial<getPostType>) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [circlePosition, setCirclePosition] = useState<number>(0);
  const [filledHeight, setFilledHeight] = useState<number>(0);
  const { isLiked, likeCount, handleLike } = useLike(
    data?.post_id || "",
    data?.like_count || 0,
    false
  );

  useEffect(() => {
    if (data?.contents) {
      Prism.highlightAll();
    }
  }, [data?.contents]);

  useHeaderIDs(contentRef, data?.contents);
  useToC(contentRef, data?.contents, setCirclePosition, setFilledHeight);
  const { data: favorite, refetch } = useGetPostFavoritesQuery(
    data?.post_id || ""
  );
  const { mutate: deleteMutate } = useDeletePostMutation();
  const { mutate: saveFavoriteMutate } = useSaveFavoritesMutation();
  const { mutate: deleteFavoriteMutate } = useDeleteFavoriteMutation();
  useEffect(() => {
    if (favorite) {
      setIsFavorite(favorite.is_favorite);
    }
  }, [favorite]);
  const handleDeletePost = async (post_id: string) => {
    deleteMutate(post_id);
  };

  const handleUpdatePost = () => {
    navigate("/write", { state: { post: data } }); // post_id와 함께 전달
  };

  const handleAddFavorite = async (user_id: string) => {
    if (isFavorite) {
      deleteFavoriteMutate(user_id);
      refetch();
    } else {
      const body = {
        favorite_id: user_id,
      };
      saveFavoriteMutate(body);
      refetch();
    }
  };

  return (
    <div className="mt-20 w-[900px] h-auto flex flex-col items-center gap-[50px]">
      <h1 className="text-[50px] font-bold">{data?.title}</h1>
      <header className="flex  gap-10  items-center">
        <section className="flex gap-3">
          <b>{data?.nickname}</b>
          <span>-</span>
          <span>{formatRelativeTime(data?.created_date || "")}</span>
        </section>
        <section className="flex gap-2 ">
          <button onClick={handleLike} className="w-[30px] h-[30px]">
            <img className="" src={isLiked ? heart : unheart}></img>
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
        {user_id == data.user_id && (
          <section className="flex gap-3">
            <button onClick={handleUpdatePost}>수정</button>
            <button onClick={() => handleDeletePost(data.post_id || "")}>
              삭제
            </button>
          </section>
        )}
      </header>
      <div className="fixed right-[100px] w-[200px] flex gap-[20px]">
        <div className="w-[10px] relative flex justify-center">
          <div
            className="absolute w-[10px] bg-gray-200 rounded-full"
            style={{ height: "100%" }}
          ></div>
          <div
            className="absolute w-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out"
            style={{ height: `${filledHeight}px` }}
          ></div>
          <div
            className="absolute w-[20px] h-[20px] rounded-full bg-orange-500 transition-transform duration-300"
            style={{ transform: `translateY(${circlePosition}px)` }}
          ></div>
        </div>
        <div id="toc"></div>
      </div>
      <article className={styles.previewContainer} ref={contentRef}>
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: data?.contents || "" }}
        />
      </article>
    </div>
  );
};

export default PostView;
