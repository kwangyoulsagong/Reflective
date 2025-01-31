import { Block } from "../../../../features/Write/model/BlockEditor/BlockEditor";

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
  blockContent: Map<string, string>;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: Block["type"]) => void) | undefined
  >;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onFocus?: () => void;
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
