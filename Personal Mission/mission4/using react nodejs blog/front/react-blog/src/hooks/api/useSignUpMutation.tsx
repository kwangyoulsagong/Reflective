import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body: object) => {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      // HTTP 상태 코드를 확인하고, 에러 상태인 경우 예외를 발생시킵니다.
      if (!response.ok) {
        const errorData = await response.json(); // 서버에서 보낸 에러 메시지를 포함할 수 있습니다.
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    },
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
