import { Block } from "./BlockEditor";

export type TextBlockType = "paragraph" | "heading1" | "heading2" | "heading3";

export type TextFormat = "bold" | "italic" | "underline";

export interface TextBlockContent {
  text: string;
  formats?: {
    type: TextFormat;
    start: number;
    end: number;
  }[];
}

export interface TextEditorProps {
  block: Block;
  blockContent: Map<string, string>; // 추가
  updateBlockContent: (id: string, content: string) => void; // 추가
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: Block["type"]) => void) | undefined
  >; // 추가
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void; // 추가
  onFocus?: () => void;
  className?: string;
}
export interface UseTextFormattingProps {
  editorRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  onContentChange: (content: string) => void;
}
export interface FormatButtonsProps {
  onFormat: (format: TextFormat) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
}
