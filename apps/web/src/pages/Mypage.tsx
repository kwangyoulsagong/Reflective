import { useState, useRef } from "react";
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
import useGetProfile from "../shared/constants/useGetProfile";
import { PostType } from "@/types/types";

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

  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    setPost_id(post_id);
    setNickname(nickname);
    setTitle(hyphenatedTitle);
    navigate(`/${nickname}/${hyphenatedTitle}`);
  };

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    // 스크롤 초기화
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    setActiveTab(tab);
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
          onClick={() => handleTabChange("posts")}
        />
        <TabButton
          icon={<Bookmark size={20} />}
          label="즐겨찾기"
          isActive={activeTab === "favorites"}
          onClick={() => handleTabChange("favorites")}
        />
      </nav>

      {activeData.length > 0 ? (
        <div
          ref={containerRef}
          className="h-[800px] overflow-auto w-full"
          key={`scroll-container-${activeTab}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeData.map((post: PostType, index: any) => (
              <div key={`${activeTab}-${post.post_id}`} className="mb-6">
                <PostCard post={post} index={index} handlePost={handlePost} />
              </div>
            ))}
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
