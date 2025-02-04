import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FolderTree } from "lucide-react";
interface CategoryCardProps {
  category: string;
  postCount: number;
  onClick: () => void;
}

const CategoryCard = ({ category, postCount, onClick }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered
      ? "0 10px 20px rgba(0,0,0,0.2)"
      : "0 5px 10px rgba(0,0,0,0.1)",
  });

  return (
    <animated.div
      style={cardSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden cursor-pointer p-6"
    >
      <FolderTree size={48} className="text-blue-500 mb-4" />
      <h3 className="text-xl font-bold mb-2">{category}</h3>
      <p className="text-gray-600">{postCount} 포스트</p>
    </animated.div>
  );
};

export default CategoryCard;
