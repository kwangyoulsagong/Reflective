import React, { useCallback } from "react";

import { FormatButtons } from "./FormattedButtons";

import { TextEditorProps } from "../../../../../entities/BlockEditor/model/type/Text";
import useAutoSize from "../../../libs/hooks/BlockEditor/useAutoSize";
import useTextFormatting from "../../../libs/hooks/BlockEditor/Text/useTextFormatting";

const TextEditor = React.memo<TextEditorProps>(
  ({
    block,
    blockContent,
    updateBlockContent,
    debouncedUpdateRef,
    isEditing,
    setIsEditing,
    onFocus,
  }) => {
    const currentContent = blockContent.get(block.id) || block.content || "";
    const editorRef = useAutoSize(
      currentContent,
      isEditing,
      block.type === "paragraph" ? 72 : 40
    );
    const handleContentChange = useCallback(
      (newContent: string) => {
        updateBlockContent(block.id, newContent);
        debouncedUpdateRef.current?.(block.id, newContent, block.type);
      },
      [block.id, block.type, updateBlockContent, debouncedUpdateRef]
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
            placeholder="글을 작성해보세요..."
            className={`
                w-full p-2 bg-transparent outline-none  border border-transparent rounded-md resize-none  overflow-hidden
                ${getHeadingClass()} 
              `}
            rows={block.type === "paragraph" ? 3 : 1}
          />
        ) : (
          <div className={`w-full p-2 ${getHeadingClass()}`}>
            {renderFormattedContent(currentContent)}
          </div>
        )}
      </div>
    );
  }
);
export default TextEditor;
