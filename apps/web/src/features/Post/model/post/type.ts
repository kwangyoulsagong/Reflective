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
