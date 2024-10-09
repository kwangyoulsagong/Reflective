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
import mermaid from "mermaid"; // Import Mermaid
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
const markdownToHtml = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  const listStack: string[] = [];
  let currentIndent = 0;
  let inCodeBlock = false;
  let inMermaidBlock = false;
  let codeContent = "";
  let codeLanguage = "";
  const processListItem = (line: string, listType: string) => {
    const indent = line.search(/\S|$/);
    const content = line
      .trim()
      .replace(/^[-*+]|\d+\.\s/, "")
      .trim();

    if (listStack.length === 0 || indent > currentIndent) {
      listStack.push(listType);
      html += `<${listType}>`;
      currentIndent = indent;
    } else if (indent < currentIndent) {
      while (indent < currentIndent && listStack.length > 0) {
        const closingTag = listStack.pop();
        html += `</${closingTag}>`;
        currentIndent -= 2;
      }
      if (
        listStack.length === 0 ||
        listStack[listStack.length - 1] !== listType
      ) {
        listStack.push(listType);
        html += `<${listType}>`;
      }
    }

    html += `<li>${content}</li>`;
  };

  for (const line of lines) {
    if (line.trim().startsWith("```mermaid")) {
      if (inMermaidBlock) {
        html += `<div class="mermaid">${escapeHtml(codeContent.trim())}</div>`;
        inMermaidBlock = false;
        codeContent = "";
      } else {
        inMermaidBlock = true;
      }
    } else if (inMermaidBlock) {
      codeContent += line + "\n";
    } else if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        html += `<pre><code class="language-${codeLanguage}">${escapeHtml(
          codeContent.trim()
        )}</code></pre>`;
        inCodeBlock = false;
        codeContent = "";
        codeLanguage = "";
      } else {
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3);
      }
    } else if (inCodeBlock) {
      codeContent += line + "\n";
    } else if (line.trim().match(/^[-*+]\s/)) {
      processListItem(line, "ul");
    } else if (line.trim().match(/^\d+\.\s/)) {
      processListItem(line, "ol");
    } else {
      while (listStack.length > 0) {
        const closingTag = listStack.pop();
        html += `</${closingTag}>`;
      }
      currentIndent = 0;
      html += processLine(line);
    }
  }

  while (listStack.length > 0) {
    const closingTag = listStack.pop();
    html += `</${closingTag}>`;
  }

  if (inCodeBlock) {
    html += `<pre><code class="language-${codeLanguage}">${escapeHtml(
      codeContent.trim()
    )}</code></pre>`;
  }

  return html;
};
const processLine = (line: string): string => {
  return line
    .replace(/^#### (.*?)$/, "<h4>$1</h4>")
    .replace(/^### (.*?)$/, "<h3>$1</h3>")
    .replace(/^## (.*?)$/, "<h2>$1</h2>")
    .replace(/^# (.*?)$/, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    .replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
    .replace(/^\s*>\s*(.*?)$/g, "<blockquote>$1</blockquote>")
    .replace(/^(?!<h|<blockquote|<li|<\/)(.*?)$/g, "<p>$1</p>");
};
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
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded(); // Rerender Mermaid diagrams
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
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(data?.contents || ""),
          }}
        />
      </article>
    </div>
  );
};

export default PostView;
