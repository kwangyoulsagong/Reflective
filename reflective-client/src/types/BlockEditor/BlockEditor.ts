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
    | "code"
    | "chart";
  content: string;
}
export interface BlockEditorProps {
  block: Block;
  updateBlock: (id: string, content: string, type: Block["type"]) => void;
  removeBlock: (id: string) => void;
  setFocusedBlockId: (id: string | null) => void;
  isFocused: boolean;
}
export interface ListItem {
  id: string;
  content: string;
  level: number;
  isCollapsed?: boolean;
}
