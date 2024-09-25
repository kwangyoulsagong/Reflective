import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useDeletePostMutation = () => {
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("accesstoken");
  return useMutation({
    mutationFn: async (post_id: string) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/post/${post_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        const message = await response.json();
        alert(message.message);
        navigate("/home");
        return message;
      } catch (error) {
        console.error("게시물 삭제 실패", error);
      }
    },
  });
};
export default useDeletePostMutation;
