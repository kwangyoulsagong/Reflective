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
