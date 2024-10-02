import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import useGetFavoriteStory from "../hooks/api/useGetFavoriteStoryQuery";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/favorite.module.css";
interface Story {
  _id: string;
  title: string;
  thumbnail: string;
  contents: string;
  created_date: string;
}

const FavoriteStories = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [readStories, setReadStories] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetFavoriteStory();

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (containerRef.current) {
      if (isOpen && activeStory) {
        containerRef.current.style.maxHeight = "600px"; // 스토리가 열려있을 때 더 큰 높이 설정
      } else if (isOpen) {
        containerRef.current.style.maxHeight = "150px"; // 열려있지만 스토리가 선택되지 않았을 때
      } else {
        containerRef.current.style.maxHeight = "0px"; // 닫혀있을 때
      }
    }
  }, [isOpen, data, activeStory]);
  useEffect(() => {
    if (activeStory?.contents) {
      Prism.highlightAll();
    }
  }, [activeStory]);
  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );

  const handleStoryClick = (story: Story) => {
    setActiveStory(activeStory && activeStory._id === story._id ? null : story);
    setReadStories((prev) => new Set(prev).add(story._id));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        ref={containerRef}
        className="overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-md"
        style={{ maxHeight: "0px" }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {data &&
              data.map((story: Story) => (
                <div
                  key={story._id}
                  className="cursor-pointer flex flex-col items-center"
                  onClick={() => handleStoryClick(story)}
                >
                  <div
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      readStories.has(story._id)
                        ? "border-gray-300"
                        : "border-primary"
                    }`}
                  >
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-center mt-1 truncate w-16">
                    {story.title}
                  </p>
                </div>
              ))}
          </div>
          {activeStory && (
            <div className="mt-4 bg-gray-100 rounded-lg w-[500px] h-[400px] relative flex justify-center">
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <article className={styles.previewContainer} ref={contentRef}>
                <div
                  className={styles.prose}
                  dangerouslySetInnerHTML={{ __html: activeStory.contents }}
                />
              </article>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={toggleOpen}
        className="mx-auto block bg-white text-gray-800 rounded-b-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
    </div>
  );
};

export default FavoriteStories;
