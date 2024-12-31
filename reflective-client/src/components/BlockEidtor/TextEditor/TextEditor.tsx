import React, { useCallback, useRef } from "react";
import { TextEditorProps } from "../../../types/BlockEditor/Text";
import useTextFormatting from "../../../hooks/BlockEditor/Text/useTextFormatting";
import { FormatButtons } from "./FormattedButtons";

export const TextEditor = React.memo<TextEditorProps>(
  ({
    block,
    blockContent,
    updateBlockContent,
    debouncedUpdateRef,
    isEditing,
    setIsEditing,
    onFocus,
    className = "",
  }) => {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const currentContent = blockContent.get(block.id) || "";

    const handleContentChange = useCallback(
      (newContent: string) => {
        updateBlockContent(block.id, newContent);
        debouncedUpdateRef.current?.(block.id, newContent, block.type);
      },
      [block.id, block.type, updateBlockContent]
    );
    const { applyFormatting, renderFormattedContent } = useTextFormatting({
      editorRef,
      content: currentContent,
      onContentChange: handleContentChange,
    });

    const getHeadingClass = () => {
      switch (block.type) {
        case "heading1":
          return "text-3xl font-bold";
        case "heading2":
          return "text-2xl font-bold";
        case "heading3":
          return "text-xl font-bold";
        default:
          return "";
      }
    };

    return (
      <div>
        <FormatButtons
          onFormat={applyFormatting}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
        />
        {isEditing ? (
          <textarea
            ref={editorRef}
            value={currentContent}
            onChange={(e) => handleContentChange(e.target.value)}
            onFocus={onFocus}
            className={`w-full px-2 py-1 bg-transparent outline-none border-0 border-b border-gray-200 focus:border-b-gray-400 transition-colors ${getHeadingClass()} ${className}`}
            rows={block.type === "paragraph" ? 3 : 1}
          />
        ) : (
          <div className={`w-full p-2 ${getHeadingClass()} ${className}`}>
            {renderFormattedContent(currentContent)}
          </div>
        )}
      </div>
    );
  }
);
