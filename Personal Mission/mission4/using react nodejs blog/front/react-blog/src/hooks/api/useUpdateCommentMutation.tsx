import { useMutation } from "@tanstack/react-query";

const useUpdateCommentMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");

  return useMutation({
    mutationFn: async ({
      comment_id,
      content,
    }: {
      comment_id: string;
      content: string;
    }) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/comments/${comment_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
            body: JSON.stringify({ content }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update comment");
        }

        const message = await response.json();
        return message;
      } catch (error) {
        console.error("Failed to update the comment:", error);
        throw error; // Ensures React Query's `onError` works
      }
    },
  });
};

export default useUpdateCommentMutation;
