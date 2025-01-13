import React, { useCallback } from "react";
import {
  TextFormat,
  UseTextFormattingProps,
} from "../../../types/BlockEditor/Text";

const useTextFormatting = ({
  editorRef,
  content,
  onContentChange,
}: UseTextFormattingProps) => {
  const applyFormatting = useCallback(
    (format: TextFormat) => {
      const textarea = editorRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart ?? 0;
      const end = textarea.selectionEnd ?? 0;
      const selectedText = content.substring(start, end);

      const formatMap: Record<TextFormat, string> = {
        bold: `**${selectedText}**`,
        italic: `*${selectedText}*`,
        underline: `__${selectedText}__`,
      };

      const formattedText = formatMap[format];
      const newContent =
        content.substring(0, start) + formattedText + content.substring(end);

      onContentChange(newContent);

      // 포커스 및 selection 복구
      requestAnimationFrame(() => {
        if (textarea) {
          textarea.focus();
          textarea.selectionStart = start + formattedText.length;
          textarea.selectionEnd = start + formattedText.length;
        }
      });
    },
    [content, editorRef, onContentChange]
  );
  const renderFormattedContent = useCallback((text: string) => {
    const htmlContent = text
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    return htmlContent.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </React.Fragment>
    ));
  }, []);

  return {
    applyFormatting,
    renderFormattedContent,
  };
};
export default useTextFormatting;
