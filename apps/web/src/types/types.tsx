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
  parent_comment_id: string | null;
  post_id: string;
  updated_date: string;
  user_id: string;
  replies: commentState[]; // 여기서 replies의 타입을 명시적으로 정의
}

export interface Event {
  title: string;
  start: Date;
  end: Date;
}
