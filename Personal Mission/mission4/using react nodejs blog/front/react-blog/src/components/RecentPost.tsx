import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Heart } from "lucide-react";
import { PostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";
import { usePost_idStore } from "../provider/post_idProvider";
import { usePostRouterStore } from "../provider/postRouterProvider";

const RecentPost = ({ data }: { data: PostType[] }) => {
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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 sm:mt-24 lg:mt-32">
      {data.map((post, index) => (
        <article
          key={post.post_id}
          onClick={() => handlePost(post.post_id, post.nickname, post.title)}
          className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer
            ${
              index % 3 === 0
                ? "sm:mt-16 lg:mt-24"
                : index % 3 === 1
                ? "sm:mt-8 lg:mt-12"
                : ""
            }`}
        >
          <img
            src={post.thumbnail}
            className="w-full h-48 object-cover"
            alt={post.title}
          />
          <div className="p-4">
            <span className="text-sm font-semibold text-primary">
              {post.category}
            </span>
            <h2 className="text-xl font-bold mt-2 mb-4 line-clamp-2">
              {post.title}
            </h2>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{formatRelativeTime(post.created_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.nickname}</span>
                <Heart size={16} className="text-red-500" />
                <span>{post.like_count}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default RecentPost;
