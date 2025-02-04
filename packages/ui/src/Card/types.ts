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
export type PostCardProps = {
  post: PostType;
  index: number;
  handlePost: (post_id: string, nickname: string, title: string) => void;
};
