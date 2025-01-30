import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import deletePostDetail from "../../api/post/deletePostDetail";

const useDeletePostMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deletePostDetail,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      navigate("/home");
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default useDeletePostMutation;
