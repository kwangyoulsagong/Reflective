import React, { useCallback } from "react";
import { CodeEditorProps } from "../../../types/BlockEditor/Code";
import useAutoSize from "../../../hooks/BlockEditor/useAutoSize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = React.memo<CodeEditorProps>(
  ({
    block,
    blockContent,
    updateBlockContent,
    debouncedUpdateRef,
    setFocusedBlockId,
    isEditing,
    setIsEditing,
  }) => {
    const currentContent = isEditing
      ? block.content
      : blockContent.get(block.id) || "";
    const editorRef = useAutoSize(currentContent, isEditing, 120);
    const handleContentChange = useCallback(
      (newContent: string) => {
        updateBlockContent(block.id, newContent);
        debouncedUpdateRef.current?.(block.id, newContent, block.type);
      },
      [block.id, block.type, updateBlockContent, debouncedUpdateRef]
    );
    return isEditing ? (
      <textarea
        ref={editorRef}
        value={currentContent}
        onChange={(e) => handleContentChange(e.target.value)}
        onFocus={() => setFocusedBlockId(block.id)}
        onBlur={() => setIsEditing(false)}
        className="w-full p-2 font-mono border rounded-md bg-gray-100 resize-none overflow-hidden"
      />
    ) : (
      <div onClick={() => setIsEditing(true)}>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="w-full p-2 font-mono border rounded-md bg-gray-100"
        >
          {currentContent}
        </SyntaxHighlighter>
      </div>
    );
  }
);
export default CodeEditor;