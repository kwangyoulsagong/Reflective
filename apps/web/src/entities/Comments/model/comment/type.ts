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
