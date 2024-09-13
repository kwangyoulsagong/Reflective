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
};
export type WriteMenuProps = {
  onCommand: (startTag: string, endTag: string) => void;
};
export type WriteUploadProps = {
  data: string;
  onClose: () => void;
};
