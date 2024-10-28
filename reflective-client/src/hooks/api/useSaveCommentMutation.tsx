import { useMutation } from "@tanstack/react-query";

const useSaveCommentMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  console.log(accesstoken);
  return useMutation({
    mutationFn: async (body: object) => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("댓글 작성 오류", error);
      }
    },
  });
};
export default useSaveCommentMutation;
