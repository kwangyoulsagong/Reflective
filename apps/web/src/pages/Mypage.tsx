import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Bookmark } from "lucide-react";
import TabButton from "../features/MyPage/ui/TabButton";
import RankCard from "../features/MyPage/ui/RankCard";
import IntroductionCard from "../features/MyPage/ui/IntroductionCard";
import { PostCard } from "@repo/ui/card";
import Header from "../shared/Header/Header";
import useGetPostMyPage from "../features/MyPage/libs/hooks/useGetPostMyPage";
import { usePost_idStore } from "../app/provider/post_idProvider";
import { usePostRouterStore } from "../app/provider/postRouterProvider";
import Profile from "../features/MyPage/ui/Profile";

import useVirtualScroll from "../shared/useVirtualScroll";
import useGetProfile from "../shared/constants/useGetProfile";

const MyPage = () => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setNickname, setTitle } = usePostRouterStore();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: myPageData,
    isLoading: myPageLoading,
    isError: myPageError,
  } = useGetPostMyPage();
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfile();

  const posts = myPageData?.myPosts ?? [];
  const favoritesPosts = myPageData?.favoritePosts ?? [];

  const activeData = activeTab === "posts" ? posts : favoritesPosts;

  const { virtualItems, totalHeight, columns } = useVirtualScroll({
    containerRef,
    itemHeight: 400,
    totalItems: activeData.length,
  });

  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    setPost_id(post_id);
    setNickname(nickname);
    setTitle(hyphenatedTitle);
    navigate(`/${nickname}/${hyphenatedTitle}`);
  };

  const isLoading = myPageLoading || profileLoading;
  const isError = myPageError || profileError;

  if (isLoading) {
    return <div className="w-full max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        Error loading data. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Header />
      {profileData && <Profile profileData={profileData} />}

      <section className="mt-10 flex flex-col items-center md:flex-row md:items-start gap-8">
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">등급</h2>
          <RankCard />
        </div>
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">소개글</h2>
          {profileData && (
            <IntroductionCard
              statusMessage={profileData?.myProfile.status_message}
            />
          )}
        </div>
      </section>

      <nav className="flex space-x-4 mt-10 mb-6">
        <TabButton
          icon={<FileText size={20} />}
          label="내 게시물"
          isActive={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        />
        <TabButton
          icon={<Bookmark size={20} />}
          label="즐겨찾기"
          isActive={activeTab === "favorites"}
          onClick={() => setActiveTab("favorites")}
        />
      </nav>

      {activeData.length > 0 ? (
        <div ref={containerRef} className="h-[800px] overflow-auto w-full">
          <div style={{ height: totalHeight, position: "relative" }}>
            <div className="w-full px-4">
              {virtualItems.map(
                ({ index, offsetTop, columnIndex, columnWidth }) =>
                  activeData[index] ? (
                    <div
                      key={activeData[index].post_id}
                      style={{
                        position: "absolute",
                        top: offsetTop,
                        left:
                          columns === 1
                            ? "50%"
                            : `${columnIndex * columnWidth}%`,
                        width: `calc(${columnWidth}% - 2rem)`,
                        transform: columns === 1 ? "translateX(-50%)" : "none",
                      }}
                    >
                      <PostCard
                        post={activeData[index]}
                        index={index}
                        handlePost={handlePost}
                      />
                    </div>
                  ) : null
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {activeTab === "posts"
              ? "작성한 게시글이 없습니다."
              : "즐겨찾기한 글이 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
