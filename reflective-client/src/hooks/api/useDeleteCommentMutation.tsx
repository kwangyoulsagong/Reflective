import { useMutation } from "@tanstack/react-query";

const useDeleteCommentMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  return useMutation({
    mutationFn: async (comment_id: string) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/comments/${comment_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        const message = await response.json();
        return message;
      } catch (error) {
        console.error("메시지를 삭제하는데 실패했습니다.", error);
      }
    },
  });
};
export default useDeleteCommentMutation;
