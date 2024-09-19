// LoginType 인터페이스 정의
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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
export type WriteMenuProps = {
  onCommand: (startTag: string, endTag: string) => void;
  insertText: (startTag: string, endTag: string) => void;
};
export type WriteUploadProps = {
  data: SavePostType;
  onClose: () => void;
};
export interface SavePostType {
  title: string;
  contents: string;
  category: string;
  thumbnail: string;
  like_count: number;
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
