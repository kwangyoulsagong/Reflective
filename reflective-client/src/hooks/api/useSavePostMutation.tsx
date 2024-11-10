import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SavePost from "../../api/post/savePost";
const useSaveMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: SavePost,
    onSuccess: () => {
      alert("성공적으로 게시되었습니다.");
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert("게시글 저장에 실패했습니다.");
    },
  });
};
export default useSaveMutation;
