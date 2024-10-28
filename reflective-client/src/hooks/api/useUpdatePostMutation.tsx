import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface updatePostState {
  post_id: string;
  body: object;
}
const useUpdatePostMutaion = () => {
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("accesstoken");
  console.log(accesstoken);
  return useMutation({
    mutationFn: async ({ post_id, body }: updatePostState) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/post/${post_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
            body: JSON.stringify(body),
          }
        );
        const message = await response.json();
        alert(message.message);
        navigate(-1);
        return message;
      } catch (error) {
        console.error("게시물 수정 중 에러", error);
      }
    },
  });
};
export default useUpdatePostMutaion;
