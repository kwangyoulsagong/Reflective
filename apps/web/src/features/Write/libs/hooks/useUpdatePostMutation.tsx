import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import updatePostDetail from "../../api/updatePostDetail";

const useUpdatePostMutaion = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updatePostDetail,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      navigate(-1);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default useUpdatePostMutaion;
