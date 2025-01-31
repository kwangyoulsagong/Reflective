export interface ListItem {
  id: string;
  content: string;
  level: number;
  isCollapsed: boolean;
}
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
  content: string | ListItem[];
}
