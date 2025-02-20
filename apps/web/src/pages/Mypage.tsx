import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Bookmark, Settings } from "lucide-react";
import me from "../assets/me.jpeg";
import TabButton from "../features/MyPage/ui/TabButton";
import RankCard from "../features/MyPage/ui/RankCard";
import IntroductionCard from "../features/MyPage/ui/IntroductionCard";
import PostCard from "../features/MyPage/ui/PostCard";
import Header from "../shared/Header/Header";
import useGetPostMyPage from "../features/MyPage/libs/hooks/useGetPostMyPage";
import { usePost_idStore } from "../app/provider/post_idProvider";

const MyPage = () => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [introduction, setIntroduction] = useState<string>(
    "안녕하세요! 여기에 자기소개를 작성해주세요."
  );
  const [isEditingIntro, setIsEditingIntro] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetPostMyPage();
  const posts = data?.myPosts || [];
  const favoritesPosts = data?.favoritePosts || [];
  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    setPost_id(post_id);
    navigate(`/${nickname}/${hyphenatedTitle}`);
  };

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
      <header className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={me} alt="Profile" className="w-20 h-20 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">hardy</h1>
              <p className="text-gray-600">0 팔로워 · 0 팔로잉</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
          >
            <Settings size={20} className="mr-2" />
            프로필 수정
          </button>
        </div>
      </header>
      <section className="mt-10 flex flex-col items-center md:flex-row md:items-center gap-8">
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">등급</h2>
          <RankCard />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">소개글</h2>
          <IntroductionCard
            introduction={introduction}
            setIntroduction={setIntroduction}
            isEditing={isEditingIntro}
            setIsEditing={setIsEditingIntro}
          />
        </div>
      </section>
      <nav className="flex space-x-4 mt-10">
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

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard
              key={post.post_id}
              post={post}
              index={index}
              handlePost={handlePost}
            />
          ))}
        </div>
      )}

      {activeTab === "favorites" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritesPosts.length > 0 ? (
            favoritesPosts.map((post, index) => (
              <PostCard
                key={post.post_id}
                post={post}
                index={index}
                handlePost={handlePost}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">아직 즐겨찾기한 글이 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPage;
