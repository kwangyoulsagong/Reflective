import React, { useEffect, useState, useRef } from "react";

import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";

import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import { useHeaderIDs, useToC } from "../hooks/usePostViewUtils";
import { getPostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";
import useLike from "../hooks/api/useLike";
import useDeletePostMutation from "../hooks/api/useDeletePostMutation";
import { useNavigate } from "react-router-dom";
import useSaveFavoritesMutation from "../hooks/api/useSaveFavoritesMutation";
import useGetPostFavoritesQuery from "../hooks/api/useGetPostFavoritesQuery";
import useDeleteFavoriteMutation from "../hooks/api/useDeleteFavoriteMutation";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { USER_ID_KEY } from "../constants/api";

interface Block {
  id: string;
  type:
    | "paragraph"
    | "heading1"
    | "heading2"
    | "heading3"
    | "list"
    | "numbered-list"
    | "image"
    | "code";
  content: string;
}

const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  const renderContent = (text: string) => {
    return text.split("\n").map((line, index) => {
      const listMatch = line.match(/^(\s*)(•)/);
      const indent = listMatch ? listMatch[1].length : 0;
      const isListItem = !!listMatch;
      const trimmedLine = line.replace(/^\s*•\s*/, "");

      const formattedLine = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/__(.*?)__/g, "<u>$1</u>");

      return (
        <div
          key={index}
          style={{ marginLeft: isListItem ? `${indent * 10}px` : "0" }}
          dangerouslySetInnerHTML={{
            __html: `${isListItem ? "• " : ""}${formattedLine}`,
          }}
        />
      );
    });
  };

  switch (block.type) {
    case "paragraph":
      return <div className="mb-4">{renderContent(block.content)}</div>;
    case "heading1":
      return <h1 className="text-3xl font-bold mb-4">{block.content}</h1>;
    case "heading2":
      return <h2 className="text-2xl font-bold mb-4">{block.content}</h2>;
    case "heading3":
      return <h3 className="text-xl font-bold mb-4">{block.content}</h3>;
    case "list":
      return (
        <ul className="list-disc list-inside mb-4 pl-4">
          {block.content.split("\n").map((item, index) => {
            const listMatch = item.match(/^(\s*)(•)/);
            const indent = listMatch ? listMatch[1].length : 0;
            const isListItem = !!listMatch;
            const trimmedLine = item.replace(/^\s*•\s*/, "");

            return (
              <li
                key={index}
                style={{ marginLeft: isListItem ? `${indent * 10}px` : "0" }}
              >
                {isListItem ? " " : ""}
                {trimmedLine}
              </li>
            );
          })}
        </ul>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal list-inside mb-4 pl-4">
          {block.content.split("\n").map((item, index) => {
            const match = item.match(/^\s*/);
            const indent = match ? match[0].length : 0;

            return (
              <li key={index} style={{ marginLeft: `${indent * 10}px` }}>
                {item.trim()}
              </li>
            );
          })}
        </ol>
      );
    case "image":
      return (
        <img
          src={block.content}
          alt={`Image for block ${block.id}`}
          className="mb-4 max-w-full h-auto"
        />
      );
    case "code":
      return (
        <SyntaxHighlighter
          language={"javascript"}
          style={tomorrow}
          className="mb-4 p-4 rounded-md"
        >
          {block.content}
        </SyntaxHighlighter>
      );
    default:
      return null;
  }
};

const PostView = (data: Partial<getPostType>) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem(USER_ID_KEY);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [circlePosition, setCirclePosition] = useState<number>(0);
  const [filledHeight, setFilledHeight] = useState<number>(0);
  const { isLiked, likeCount, handleLike } = useLike(
    data?.post_id || "",
    data?.like_count || 0,
    false
  );

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    if (Array.isArray(data?.contents)) {
      setBlocks(data.contents);
    } else {
      console.error(
        "Expected data.contents to be an array, but got:",
        typeof data?.contents
      );
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
    navigate("/write", { state: { post: data } });
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
      <article ref={contentRef}>
        <div>
          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default PostView;
