import { commentState } from "../../../../features/Comments/model/comment/type";

export interface commentContentProps {
  comment: commentState;
  isReply?: boolean;
  editingComment: string | null;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  setEditingComment: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpdateComment: () => Promise<void>;
}
