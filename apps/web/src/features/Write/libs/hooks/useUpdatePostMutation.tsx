import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import updatePostDetail from "../../api/updatePostDetail";
import { useApiError } from "../../../../shared/useApiError";
import { useToast } from "../../../../shared/Toast/Hooks/useToast";
import { queryKeys } from "../../../../shared/constants/queryKeys";
const useUpdatePostMutaion = () => {
  const navigate = useNavigate();
  const { handleError } = useApiError();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePostDetail,
    onSuccess: (data: {
      message: string;
      updatedPost: { post_id: string };
    }) => {
      console.log(data);
      showToast(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostDetail, data.updatedPost.post_id],
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
export default useUpdatePostMutaion;
