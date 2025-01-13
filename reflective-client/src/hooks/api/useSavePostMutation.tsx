import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SavePost from "../../api/post/savePost";
import { usePost_idStore } from "../../provider/post_idProvider";
import { usePostRouterStore } from "../../provider/postRouterProvider";
const useSaveMutation = () => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setTitle } = usePostRouterStore();
  const nickname = localStorage.getItem("nickname");
  return useMutation({
    mutationFn: SavePost,
    onSuccess: (response: { result: { post_id: string; title: string } }) => {
      const { post_id, title } = response.result;
      alert("성공적으로 게시되었습니다.");
      const hyphenatedTitle = title.replace(/\s+/g, "-");
      navigate(`/${nickname}/${hyphenatedTitle}`);
      setPost_id(post_id);
      setTitle(hyphenatedTitle);
    },
    onError: (error) => {
      console.log(error);
      alert("게시글 저장에 실패했습니다.");
    },
  });
};
export default useSaveMutation;
