import { useEffect, useState } from "react";
import { usePost_idStore } from "../provider/post_idProvider";
import useSaveCommentMutation from "../hooks/api/useSaveCommentMutation";
import useGetCommentQuery from "../hooks/api/useGetCommentQuery";
import useDeleteCommentMutation from "../hooks/api/useDeleteCommentMutation";
import useUpdateCommentMutation from "../hooks/api/useUpdateCommentMutation";
import { formatRelativeTime } from "../hooks/TimeReducer";
import { commentState } from "../types/types";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Edit2,
  Trash2,
} from "lucide-react";

const Comments = () => {
  const { post_id } = usePost_idStore();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<commentState[]>([]);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const { mutate: saveMutate } = useSaveCommentMutation();
  const { mutate: deleteMutate } = useDeleteCommentMutation();
  const { mutate: updateMutate } = useUpdateCommentMutation();
  const { data, isLoading, error, refetch } = useGetCommentQuery(post_id);

  const handleSaveComment = async (parent_comment_id: string | null = null) => {
    const content = parent_comment_id
      ? replyContent[parent_comment_id]
      : newComment;
    if (!content) return;

    const body = { post_id, parent_comment_id, content };
    saveMutate(body, {
      onSuccess: () => {
        if (parent_comment_id) {
          setReplyContent((prev) => ({ ...prev, [parent_comment_id]: "" }));
        } else {
          setNewComment("");
        }
        refetch();
      },
    });
  };

  const handleDeleteComment = async (comment_id: string) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteMutate(comment_id, {
        onSuccess: () => refetch(),
      });
    }
  };

  const handleEditComment = (comment: commentState) => {
    setEditingComment(comment.comment_id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (!editingComment || !editContent) return;

    updateMutate(
      { comment_id: editingComment, content: editContent },
      {
        onSuccess: () => {
          setEditingComment(null);
          setEditContent("");
          refetch();
        },
      }
    );
  };

  const fetchComments = () => {
    if (!data) return;

    const commentsData = data.map((comment: commentState) => ({
      ...comment,
      replies: [],
    }));

    commentsData.forEach((comment: commentState) => {
      if (comment.parent_comment_id != null) {
        const parentComment = commentsData.find(
          (c: commentState) => c.comment_id === comment.parent_comment_id
        );
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
    });

    const rootComments = commentsData.filter(
      (comment: commentState) => comment.parent_comment_id === null
    );
    setComments(rootComments);
  };

  useEffect(() => {
    if (data) {
      fetchComments();
    }
  }, [data]);

  const toggleReplies = (commentId: string) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderCommentActions = (comment: commentState, isReply: boolean) => (
    <div
      className={`mt-2 flex items-center space-x-4 ${
        isReply ? "ml-11" : "ml-13"
      }`}
    >
      {!isReply && (
        <button
          onClick={() => toggleReplies(comment.comment_id)}
          className="text-sm text-primary flex items-center"
        >
          <MessageCircle size={16} className="mr-1" />
          {comment.replies.length} 개의 답글
          {showReplies[comment.comment_id] ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      )}
      <button
        onClick={() => handleEditComment(comment)}
        className="text-sm text-gray-500 flex items-center hover:text-primary"
      >
        <Edit2 size={16} className="mr-1" />
        수정
      </button>
      <button
        onClick={() => handleDeleteComment(comment.comment_id)}
        className="text-sm text-gray-500 flex items-center hover:text-red-500"
      >
        <Trash2 size={16} className="mr-1" />
        삭제
      </button>
    </div>
  );

  const renderCommentContent = (comment: commentState, isReply: boolean) => (
    <div className="flex items-start space-x-3">
      <img
        className={`${
          isReply ? "w-8 h-8" : "w-10 h-10"
        } rounded-full object-cover`}
        src={comment.image_url}
        alt={`${comment.nickname}'s avatar`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className={`font-bold ${isReply ? "text-sm" : ""}`}>
            {comment.nickname}
          </span>
          <span className={`text-gray-500 ${isReply ? "text-xs" : "text-sm"}`}>
            {formatRelativeTime(comment.created_date)}
          </span>
        </div>
        {editingComment === comment.comment_id ? (
          <div>
            <textarea
              className="w-full p-2 mt-1 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-1 space-x-2">
              <button
                onClick={handleUpdateComment}
                className="px-3 py-1 text-sm text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
              >
                수정완료
              </button>
              <button
                onClick={() => setEditingComment(null)}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className={`mt-1 ${isReply ? "text-sm" : ""} text-gray-700`}>
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );

  const renderComment = (comment: commentState, isReply = false) => (
    <div
      key={comment.comment_id}
      className={`${isReply ? "ml-10" : "border-b pb-4"} mb-4`}
    >
      {renderCommentContent(comment, isReply)}
      {renderCommentActions(comment, isReply)}
      {!isReply && showReplies[comment.comment_id] && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => renderComment(reply, true))}
          <div className="mt-2 ml-10">
            <textarea
              className="w-full p-2 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="답글을 작성해주세요..."
              value={replyContent[comment.comment_id] || ""}
              onChange={(e) =>
                setReplyContent({
                  ...replyContent,
                  [comment.comment_id]: e.target.value,
                })
              }
              rows={2}
            />
            <div className="flex justify-end mt-1">
              <button
                onClick={() => handleSaveComment(comment.comment_id)}
                className="px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                답글 작성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">
      <textarea
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="댓글을 작성해주세요..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={3}
      />
      <div className="flex justify-end w-full">
        <button
          onClick={() => handleSaveComment(null)}
          className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
        >
          댓글 작성
        </button>
      </div>
      <section className="w-full space-y-6">
        {comments.map((comment) => renderComment(comment))}
      </section>
    </div>
  );
};

export default Comments;
