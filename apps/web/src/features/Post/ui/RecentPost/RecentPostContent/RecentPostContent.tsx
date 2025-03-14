import { useNavigate } from "react-router-dom";
import { PostCard } from "@repo/ui/card";
import { useRef } from "react";
import useVirtualScroll from "../../../../../shared/useVirtualScroll";
import { usePost_idStore } from "../../../../../app/provider/post_idProvider";
import { usePostRouterStore } from "../../../../../app/provider/postRouterProvider";

const RecentPostContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { virtualItems, totalHeight, columns, allPosts, isFetchingNextPage } =
    useVirtualScroll({
      containerRef,
      itemHeight: 400,
      overscan: 3,
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
            allPosts[index] ? (
              <div
                key={allPosts[index].post_id}
                style={{
                  position: "absolute",
                  top: offsetTop,
                  left: columns === 1 ? "50%" : `${columnIndex * columnWidth}%`,
                  width: `calc(${columnWidth}% - 2rem)`,
                  transform: columns === 1 ? "translateX(-50%)" : "none",
                }}
              >
                <PostCard
                  post={allPosts[index]}
                  index={index}
                  handlePost={handlePost}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
      {/* 다음 페이지 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className="sticky bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-white shadow-md rounded-full p-2 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary mr-2"></div>
            <span className="text-sm">더 불러오는 중...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPostContent;
