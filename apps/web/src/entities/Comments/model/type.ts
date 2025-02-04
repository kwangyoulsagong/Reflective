import { commentState } from "./comment/type";

export interface CommentMutationResponse {
  success: boolean;
  message?: string;
}

export interface SaveCommentParams {
  post_id: string;
  parent_comment_id: string | null;
  content: string;
}

export interface UpdateCommentParams {
  comment_id: string;
  content: string;
}

export interface UpdateCommentsHookProps {
  post_id: string;
  refetch: () => void;
}
export interface commentProps {
  comment: commentState;
  isReply?: boolean;
  showReplies: {
    [key: string]: boolean;
  };
  replyContent: {
    [key: string]: string;
  };
  setReplyContent: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  handleSaveComment: (parent_comment_id?: string | null) => Promise<void>;
  editingComment: string | null;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  setEditingComment: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpdateComment: () => Promise<void>;
  setShowReplies: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  handleEditComment: (comment: commentState) => void;
  handleDeleteComment: (comment_id: string) => Promise<void>;
}
