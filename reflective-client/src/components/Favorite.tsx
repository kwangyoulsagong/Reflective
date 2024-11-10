import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGetFavoriteStory from "../hooks/api/useGetFavoriteStoryQuery";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/favorite.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Block } from "../types/types";

interface Story {
  _id: string;
  title: string;
  thumbnail: string;
  contents: string;
  created_date: string;
}
const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  const renderContent = (text: string) => {
    return text.split("\n").map((line, index) => {
      const listMatch = line.match(/^(\s*)(•)/);
      const indent = listMatch ? listMatch[1].length : 0;
      const isListItem = !!listMatch;
      const trimmedLine = line.replace(/^\s*•\s*/, "");

      const formattedLine = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/__(.*?)__/g, "<u>$1</u>");

      return (
        <div
          key={index}
          style={{ marginLeft: isListItem ? `${indent * 10}px` : "0" }}
          dangerouslySetInnerHTML={{
            __html: `${isListItem ? "• " : ""}${formattedLine}`,
          }}
        />
      );
    });
  };

  switch (block.type) {
    case "paragraph":
      return <div className="mb-4">{renderContent(block.content)}</div>;
    case "heading1":
      return <h1 className="text-3xl font-bold mb-4">{block.content}</h1>;
    case "heading2":
      return <h2 className="text-2xl font-bold mb-4">{block.content}</h2>;
    case "heading3":
      return <h3 className="text-xl font-bold mb-4">{block.content}</h3>;
    case "list":
      return (
        <ul className="list-disc list-inside mb-4 pl-4">
          {block.content.split("\n").map((item, index) => {
            const listMatch = item.match(/^(\s*)(•)/);
            const indent = listMatch ? listMatch[1].length : 0;
            const isListItem = !!listMatch;
            const trimmedLine = item.replace(/^\s*•\s*/, "");

            return (
              <li
                key={index}
                style={{ marginLeft: isListItem ? `${indent * 10}px` : "0" }}
              >
                {isListItem ? " " : ""}
                {trimmedLine}
              </li>
            );
          })}
        </ul>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal list-inside mb-4 pl-4">
          {block.content.split("\n").map((item, index) => {
            const match = item.match(/^\s*/);
            const indent = match ? match[0].length : 0;

            return (
              <li key={index} style={{ marginLeft: `${indent * 10}px` }}>
                {item.trim()}
              </li>
            );
          })}
        </ol>
      );
    case "image":
      return (
        <img
          src={block.content}
          alt={`Image for block ${block.id}`}
          className="mb-4 max-w-full h-auto"
        />
      );
    case "code":
      return (
        <SyntaxHighlighter
          language={"javascript"}
          style={tomorrow}
          className="mb-4 p-4 rounded-md"
        >
          {block.content}
        </SyntaxHighlighter>
      );
    default:
      return null;
  }
};

const FavoriteStories = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [readStories, setReadStories] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetFavoriteStory();

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeStory ? "600px" : "150px",
              opacity: activeStory ? 0.95 : 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <motion.div
                className="flex justify-center gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {data &&
                  data.map((story: Story) => (
                    <motion.div
                      key={story._id}
                      className="cursor-pointer flex flex-col items-center"
                      onClick={() => handleStoryClick(story)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                      <p className="text-s text-center mt-1 truncate w-16 text-primary bold">
                        {story.title}
                      </p>
                    </motion.div>
                  ))}
              </motion.div>
              <AnimatePresence>
                {activeStory && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 bg-black rounded-lg w-[500px] h-[400px] relative flex justify-center">
                      <motion.button
                        onClick={() => setActiveStory(null)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={20} />
                      </motion.button>
                      <article
                        className={styles.previewContainer}
                        ref={contentRef}
                      >
                        {Array.isArray(activeStory.contents) ? (
                          activeStory.contents.map((block: Block) => (
                            <BlockView key={block.id} block={block} />
                          ))
                        ) : (
                          <div>Invalid content format</div>
                        )}
                      </article>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleOpen}
        className="mx-auto block bg-white text-gray-800 rounded-b-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        whileHover={{ y: 2 }}
        whileTap={{ y: 0 }}
      >
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </motion.button>
    </div>
  );
};

export default FavoriteStories;
