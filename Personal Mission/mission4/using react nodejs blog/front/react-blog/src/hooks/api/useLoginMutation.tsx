import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../../types/types";
import { useNavigate } from "react-router-dom";
const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body: object) => {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // HTTP 상태 코드를 확인하고, 에러 상태인 경우 예외를 발생시킵니다.
      if (!response.ok) {
        const errorData = await response.json(); // 서버에서 보낸 에러 메시지를 포함할 수 있습니다.
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data: LoginType) => {
      console.log(data.accessToken);
      console.log(data.refreshToken);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("email", data.email);
      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert("아이디 비밀번호를 확인해 주세요");
    },
  });
};
export default useLoginMutation;
