import { useState } from "react";
import { Clock, Heart, Eye } from "lucide-react";
import { useSpring, animated } from "react-spring";

import { PostCardProps } from "./types";
import { formatRelativeTime } from "@repo/ui/time";

export const PostCard = ({ post, index, handlePost }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered
      ? "0 10px 20px rgba(0,0,0,0.2)"
      : "0 5px 10px rgba(0,0,0,0.1)",
  });

  const imageSpring = useSpring({
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  });

  return (
    <animated.article
      style={cardSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handlePost(post.post_id, post.nickname, post.title)}
      className={`bg-white rounded-lg overflow-hidden cursor-pointer
          ${
            index % 3 === 0
              ? "sm:mt-16 lg:mt-24"
              : index % 3 === 1
                ? "sm:mt-8 lg:mt-12"
                : ""
          }`}
    >
      <section className="relative overflow-hidden">
        <animated.img
          style={imageSpring}
          src={post.thumbnail}
          className="w-full h-48 object-cover"
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <Eye size={20} />
            <span className="ml-2">더 보기</span>
          </div>
        </div>
      </section>
      <article className="p-4">
        <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
          {post.category}
        </span>
        <h2 className="text-xl font-bold mt-2 mb-4 line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </h2>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>{formatRelativeTime(post.created_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.nickname}</span>
            <Heart size={16} className="text-red-500" />
            <span>{post.like_count}</span>
          </div>
        </div>
      </article>
    </animated.article>
  );
};
