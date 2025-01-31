import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Layers, FileText, Bookmark, Settings } from "lucide-react";

import me from "../assets/me.jpeg";
import TabButton from "../components/mypage/TabButton";
import RankCard from "../components/mypage/RankCard";
import IntroductionCard from "../components/mypage/IntroductionCard";
import CategoryCard from "../components/mypage/CategoryCard";
import PostCard from "../components/mypage/PostCard";
import Header from "../shared/Header/Header";

interface UserRankType {
  nickname: string;
  rank: string;
  rate: number;
  log: number;
  progress: number;
}

const MyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [introduction, setIntroduction] = useState<string>(
    "안녕하세요! 여기에 자기소개를 작성해주세요."
  );
  const [isEditingIntro, setIsEditingIntro] = useState<boolean>(false);

  const dummyPosts = [
    {
      post_id: "1",
      title: "React Hooks Introduction",
      created_date: "2024-10-01",
      like_count: 10,
      category: "React",
      nickname: "user1",
      thumbnail: "image_url",
    },
    {
      post_id: "2",
      title: "Advanced React Patterns",
      created_date: "2024-10-02",
      like_count: 20,
      category: "React",
      nickname: "user1",
      thumbnail: "image_url",
    },
    {
      post_id: "3",
      title: "CSS Grid Layout",
      created_date: "2024-10-03",
      like_count: 5,
      category: "CSS",
      nickname: "user1",
      thumbnail: "image_url",
    },
    {
      post_id: "4",
      title: "Responsive Design Techniques",
      created_date: "2024-10-04",
      like_count: 15,
      category: "CSS",
      nickname: "user1",
      thumbnail: "image_url",
    },
  ];

  const categories: string[] = Array.from(
    new Set(dummyPosts.map((post) => post.category))
  );

  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    navigate(`/${nickname}/${hyphenatedTitle}`);
  };

  const userRank: UserRankType = {
    nickname: "hardy",
    rank: "Gold4",
    rate: 971,
    log: 195,
    progress: 97.1,
  };

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
          <RankCard userRank={userRank} />
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
          icon={<Layers size={20} />}
          label="카테고리 뷰"
          isActive={activeTab === "categories"}
          onClick={() => {
            setActiveTab("categories");
            setSelectedCategory(null);
          }}
        />
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

      {activeTab === "categories" && !selectedCategory && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              postCount={
                dummyPosts.filter((post) => post.category === category).length
              }
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      )}

      {activeTab === "categories" && selectedCategory && (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center text-blue-500 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            카테고리로 돌아가기
          </button>
          <h3 className="text-2xl font-bold mb-4">{selectedCategory} 포스트</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyPosts
              .filter((post) => post.category === selectedCategory)
              .map((post, index) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  index={index}
                  handlePost={handlePost}
                />
              ))}
          </div>
        </div>
      )}

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyPosts.map((post, index) => (
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
        <div className="text-center py-12">
          <img
            src="/path/to/empty-state-image.svg"
            alt="No favorites"
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">아직 즐겨찾기한 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
