export interface Post {
  post_id: string;
  _id?: string;
  title: string;
  contents: string;
  thumbnail?: string;
  category: string;
  like_count?: number;
  created_date: string;
  nickname?: string;
}

export interface SearchListProps {
  results: Post[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  query?: string;
}
