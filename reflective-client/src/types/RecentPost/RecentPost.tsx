import { PostType } from "../types";

export type PostCardProps = {
  post: PostType;
  index: number;
  handlePost: (post_id: string, nickname: string, title: string) => void;
};
