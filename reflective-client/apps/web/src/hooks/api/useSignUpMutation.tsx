import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../api/user/postRegister";

const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      alert("회원가입이 성공적으로 이루어졌습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("회원가입 실패", error);
      // 서버에서 받은 에러 메시지 출력
      if (error.message) {
        alert(`회원가입 실패: ${error.message}`);
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    },
  });
};
export default useSignUpMutation;
