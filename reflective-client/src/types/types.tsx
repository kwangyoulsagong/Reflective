// LoginType 인터페이스 정의

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
export interface LoginType {
  user_id: string;
  nickname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
export interface PostType {
  post_id: string;
  user_id: string;
  title: string;
  contents: object;
  like_count: number;
  category: string;
  thumbnail: string;
  created_date: string;
  updated_date: string;
  nickname: string;
}
export type WriteAreaProps = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
export type WriteMenuProps = {
  onCommand: (startTag: string) => void;
};
export type WriteUploadProps = {
  data: SavePostType;
  onClose: () => void;
  isEdit: boolean;
};
export interface SavePostType {
  title: string;
  contents: Block[];
  category: string;
  thumbnail: string;
  like_count: number;
}

export interface getPostType {
  post_id: string;
  user_id: string;
  nickname: string;
  title: string;
  contents: string;
  category: string;
  thumbnail: string;
  like_count: number;
  created_date: string;
  refetch: () => void;
}
export interface post_idState {
  post_id: string;
  setPost_id: (post_id: string) => void;
}
export interface postRouterState {
  nickname: string;
  setNickname: (nickname: string) => void;
  title: string;
  setTitle: (title: string) => void;
}
export interface Header {
  tag: string;
  text: string;
  id: string;
}
export interface commentState {
  comment_id: string;
  content: string;
  created_date: string;
  image_url: string;
  nickname: string;
  parent_comment_id: string;
  post_id: string;
  updated_date: string;
  user_id: string;
  replies: [];
}

export interface Event {
  title: string;
  start: Date;
  end: Date;
}
export interface ListItem {
  id: string;
  content: string;
  level: number;
  isCollapsed?: boolean;
}
