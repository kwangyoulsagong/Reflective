import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body: object) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/auth/register",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("회원가입이 성공적으로 이루어졌습니다.");
        navigate("/");
        return response.data;
      } catch (error) {
        console.log(error);
        alert("회원가입이 실패하였습니다.");
      }
    },
  });
};
export default useSignUpMutation;
