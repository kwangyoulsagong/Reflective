import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SavePost from "../../api/post/savePost";

import { queryKeys } from "../../shared/constants/queryKeys";
import { usePost_idStore } from "../../app/provider/post_idProvider";
import { usePostRouterStore } from "../../app/provider/postRouterProvider";
const useSaveMutation = () => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setTitle } = usePostRouterStore();
  const nickname = localStorage.getItem("nickname");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SavePost,
    onSuccess: (response: { result: { post_id: string; title: string } }) => {
      const { post_id, title } = response.result;
      alert("성공적으로 게시되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostDetail, post_id],
      });
      const hyphenatedTitle = title.replace(/\s+/g, "-");
      setPost_id(post_id);
      setTitle(hyphenatedTitle);
      navigate(`/${nickname}/${hyphenatedTitle}`);
    },
    onError: (error) => {
      console.log(error);
      alert("게시글 저장에 실패했습니다.");
    },
  });
};
export default useSaveMutation;
