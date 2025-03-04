import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SavePost from "../../api/savePost";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import { usePost_idStore } from "../../../../app/provider/post_idProvider";
import { usePostRouterStore } from "../../../../app/provider/postRouterProvider";
import { useApiError } from "../../../../shared/useApiError";
import { useToast } from "../../../../shared/Toast/Hooks/useToast";
const useSaveMutation = () => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setTitle } = usePostRouterStore();
  const nickname = localStorage.getItem("nickname");
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: SavePost,
    onSuccess: (response: { result: { post_id: string; title: string } }) => {
      const { post_id, title } = response.result;
      showToast("성공적으로 게시되었습니다.", "success");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostDetail, post_id],
      });
      const hyphenatedTitle = title.replace(/\s+/g, "-");
      setPost_id(post_id);
      setTitle(hyphenatedTitle);
      navigate(`/${nickname}/${hyphenatedTitle}`);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
export default useSaveMutation;
