import { useState } from "react";

import useSaveCommentMutation from "../useSaveCommentMutation";
import useDeleteCommentMutation from "../useDeleteCommentMutation";
import useUpdateCommentMutation from "../useUpdateCommentMutation";
import { commentState } from "../../../../../entities/Comments/model/comment/type";

interface updateCommentState {
  post_id: string;
}
const useCommentsBuilder = ({ post_id }: updateCommentState) => {
  const { mutate: saveMutate } = useSaveCommentMutation(post_id);
  const { mutate: deleteMutate } = useDeleteCommentMutation(post_id);
  const { mutate: updateMutate } = useUpdateCommentMutation(post_id);
  const [newComment, setNewComment] = useState("");

  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );

  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleSaveComment = async (parent_comment_id: string | null = null) => {
    const content = parent_comment_id
      ? replyContent[parent_comment_id]
      : newComment;
    if (!content) return;

    const body = { post_id, parent_comment_id, content };
    saveMutate(body);
    if (parent_comment_id) {
      setReplyContent((prev) => ({
        ...prev,
        [parent_comment_id]: "",
      }));
    } else {
      setNewComment("");
    }
  };

  const handleDeleteComment = async (comment_id: string) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteMutate(comment_id);
    }
  };

  const handleEditComment = (comment: commentState) => {
    setEditingComment(comment.comment_id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (!editingComment || !editContent) return;

    updateMutate({ comment_id: editingComment, content: editContent });
    setEditingComment(null);
    setEditContent("");
  };
  return {
    handleSaveComment,
    handleDeleteComment,
    handleEditComment,
    handleUpdateComment,
    newComment,
    setNewComment,
    replyContent,
    setReplyContent,
    editingComment,
    setEditingComment,
    editContent,
    setEditContent,
  };
};
export default useCommentsBuilder;
