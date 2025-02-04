import { commentState } from "../comment/type";

export interface commentActionProps {
  comment: commentState;
  isReply?: boolean;
  showReplies: {
    [key: string]: boolean;
  };
  setShowReplies: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  handleEditComment: (comment: commentState) => void;
  handleDeleteComment: (comment_id: string) => Promise<void>;
}
