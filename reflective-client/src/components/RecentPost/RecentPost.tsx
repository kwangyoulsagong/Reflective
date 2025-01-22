import { useNavigate } from "react-router-dom";
import { PostType } from "../../types/types";
import { usePost_idStore } from "../../provider/post_idProvider";
import { usePostRouterStore } from "../../provider/postRouterProvider";
import PostCard from "./PostCard";
import { useRef } from "react";
import useVirtualScroll from "../../hooks/useVirtualScroll";

const RecentPost = ({ data }: { data: PostType[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { virtualItems, totalHeight, columns } = useVirtualScroll({
    containerRef,
    itemHeight: 400,
    totalItems: data.length,
  });

  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setNickname, setTitle } = usePostRouterStore();

  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    navigate(`/${nickname}/${hyphenatedTitle}`);
    setPost_id(post_id);
    setNickname(nickname);
    setTitle(hyphenatedTitle);
  };

  return (
    <div ref={containerRef} className="h-[800px] overflow-auto w-full">
      <div style={{ height: totalHeight, position: "relative" }}>
        <div className="w-full px-4">
          {virtualItems.map(({ index, offsetTop, columnIndex, columnWidth }) =>
            data[index] ? (
              <div
                key={data[index].post_id}
                style={{
                  position: "absolute",
                  top: offsetTop,
                  left: columns === 1 ? "50%" : `${columnIndex * columnWidth}%`,
                  width: `calc(${columnWidth}% - 2rem)`,
                  transform: columns === 1 ? "translateX(-50%)" : "none",
                }}
              >
                <PostCard
                  post={data[index]}
                  index={index}
                  handlePost={handlePost}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
