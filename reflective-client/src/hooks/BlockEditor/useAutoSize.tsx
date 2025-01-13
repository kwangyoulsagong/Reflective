import { useCallback, useLayoutEffect, useRef } from "react";

const useAutoSize = (
  value: string,
  isEditing: boolean,
  minHeight: number = 0
) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHegiht = Math.max(textarea.scrollHeight, minHeight);
      textarea.style.height = `${newHegiht}px`;
    }
  }, [minHeight]);

  useLayoutEffect(() => {
    if (isEditing) {
      adjustHeight();
    }
  }, [value, isEditing, minHeight]);
  return textareaRef;
};
export default useAutoSize;
