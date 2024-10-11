import React, { useState, useRef, useEffect } from "react";
import { Trash2, Bold, Italic, Underline, Eye, EyeOff } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface Block {
  id: string;
  type:
    | "paragraph"
    | "heading1"
    | "heading2"
    | "heading3"
    | "list"
    | "numbered-list"
    | "image"
    | "code";
  content: string;
}

interface BlockEditorProps {
  block: Block;
  updateBlock: (id: string, content: string, type: Block["type"]) => void;
  removeBlock: (id: string) => void;
  setFocusedBlockId: (id: string | null) => void;
  isFocused: boolean;
}

const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  updateBlock,
  removeBlock,
  setFocusedBlockId,
  isFocused,
}) => {
  const [content, setContent] = useState(block.content);
  const [isEditing, setIsEditing] = useState(true);
  const editorRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setContent(block.content);

    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }

    if (block.type === "list" && !block.content.trim()) {
      const initialContent = "• ";
      setContent(initialContent);
      updateBlock(block.id, initialContent, block.type);
    }

    if (block.type === "numbered-list" && !block.content.trim()) {
      const initialContent = "1. ";
      setContent(initialContent);
      updateBlock(block.id, initialContent, block.type);
    }

    if (isFocused && editorRef.current) {
      editorRef.current.focus();
    }
  }, [block.content, block.type, block.id, updateBlock, isFocused]);

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }

    updateBlock(block.id, newContent, block.type);

    if (block.type === "image" && isValidImageUrl(newContent)) {
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    setFocusedBlockId(block.id);
  };
  const isValidImageUrl = (url: string) => {
    // Check for valid image URL using a regex
    return /\.(jpeg|jpg|gif|png|svg)$/.test(url);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (block.type === "list" || block.type === "numbered-list") {
      const textarea = e.currentTarget as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const currentLine =
        value.substring(0, selectionStart).split("\n").pop() || "";
      const currentLineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;

      if (e.key === "Enter") {
        e.preventDefault();
        const indent = currentLine.match(/^\s*/)[0];
        const listMarker =
          block.type === "numbered-list"
            ? `${
                currentLine.match(/^\d+/)
                  ? parseInt(currentLine.match(/^\d+/)[0]) + 1 + ". "
                  : "• "
              } `
            : "• ";
        const newContent =
          value.substring(0, selectionStart) +
          "\n" +
          indent +
          listMarker +
          value.substring(selectionEnd);

        setContent(newContent);
        updateBlock(block.id, newContent, block.type);

        setTimeout(() => {
          if (textarea) {
            const newPosition =
              selectionStart + indent.length + listMarker.length + 1;
            textarea.selectionStart = textarea.selectionEnd = newPosition;

            // Adjust the height of the textarea
            textarea.style.height = "auto"; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
          }
        }, 0);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const newIndent = "  ";
        const newContent =
          value.substring(0, currentLineStart) +
          newIndent +
          value.substring(currentLineStart);

        setContent(newContent);
        updateBlock(block.id, newContent, block.type);

        setTimeout(() => {
          if (textarea) {
            const newPosition = selectionStart + newIndent.length;
            textarea.selectionStart = textarea.selectionEnd = newPosition;

            // Adjust the height of the textarea
            textarea.style.height = "auto"; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
          }
        }, 0);
      }
    }
  };

  const applyFormatting = (format: "bold" | "italic" | "underline") => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    updateBlock(block.id, newContent, block.type);

    // Reset cursor position
    setTimeout(() => {
      textarea.selectionStart = start + 2;
      textarea.selectionEnd = end + 2;
      textarea.focus();
    }, 0);
  };
  const renderLineBreaks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };
  const renderFormatButtons = () => {
    if (block.type !== "paragraph" && block.type !== "heading") return null;

    return (
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => applyFormatting("bold")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => applyFormatting("italic")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => applyFormatting("underline")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Underline size={16} />
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          {isEditing ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    );
  };
  const renderListContent = (text: string) => {
    const lines = text.split("\n");
    return lines
      .map((line, index) => {
        const isNumbered = block.type === "numbered-list";
        const listItem = isNumbered ? line.replace(/^\d+\.\s*/, "") : line;
        const marker = isNumbered ? `${index + 1}. ` : "• ";

        return `<div>${marker}${listItem}</div>`;
      })
      .join("");
  };

  const renderFormattedContent = (text: string) => {
    // Convert markdown-like syntax to HTML
    const htmlContent = text
      .replace(/__(.*?)__/g, "<u>$1</u>") // Underline
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic

    return htmlContent.split("\n").map((line, index) => (
      <span key={index}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </span>
    ));
  };

  const renderEditor = () => {
    const commonProps = {
      ref: editorRef as React.RefObject<HTMLTextAreaElement | HTMLInputElement>,
      value: content,
      onChange: handleContentChange,
      onFocus: handleFocus,
    };

    switch (block.type) {
      case "paragraph":
        return (
          <>
            {renderFormatButtons()}
            {isEditing ? (
              <textarea
                {...commonProps}
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            ) : (
              <div className="w-full p-2 border rounded-md">
                {renderFormattedContent(content)}
              </div>
            )}
          </>
        );

      case "heading1":
      case "heading2":
      case "heading3":
        return (
          <>
            {renderFormatButtons()}
            {isEditing ? (
              <textarea
                {...commonProps}
                className={`w-full p-2 border rounded-md ${
                  block.type === "heading1"
                    ? "text-3xl font-bold"
                    : block.type === "heading2"
                    ? "text-2xl font-bold"
                    : "text-xl font-bold"
                }`}
                rows={1}
              />
            ) : (
              <div
                className={`w-full p-2 border rounded-md ${
                  block.type === "heading1"
                    ? "text-3xl font-bold"
                    : block.type === "heading2"
                    ? "text-2xl font-bold"
                    : "text-xl font-bold"
                }`}
              >
                {renderFormattedContent(content)}
              </div>
            )}
          </>
        );

      case "list":
      case "numbered-list":
        return (
          <>
            {renderFormatButtons()}
            {isEditing ? (
              <textarea
                {...commonProps}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border rounded-md"
                rows={5}
                placeholder="List item (press Enter for new item, Tab for indentation)"
              />
            ) : (
              <div
                className="w-full p-2 border rounded-md"
                dangerouslySetInnerHTML={{ __html: renderListContent(content) }}
              />
            )}
          </>
        );

      case "image":
        return (
          <div>
            {isEditing ? (
              <input
                {...commonProps}
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter image URL..."
              />
            ) : (
              <img
                src={content}
                alt="Uploaded"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        );

      case "code":
        return isEditing ? (
          <textarea
            {...commonProps}
            className="w-full p-2 font-mono border rounded-md bg-gray-100"
            rows={5}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              className="w-full p-2 font-mono border rounded-md bg-gray-100"
            >
              {content}
            </SyntaxHighlighter>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="mb-4 p-2 border rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{block.type}</span>
        <button onClick={() => removeBlock(block.id)} className="text-red-500">
          <Trash2 />
        </button>
      </div>
      {renderEditor()}
    </div>
  );
};

export default BlockEditor;
