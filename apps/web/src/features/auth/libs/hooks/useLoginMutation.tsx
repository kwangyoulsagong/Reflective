import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../api/user/postLogin";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
} from "../../../../shared/constants/api";
const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data: LoginType) => {
      console.log(data);
      localStorage.setItem(USER_ID_KEY, data.user_id);
      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("email", data.email);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert("아이디 비밀번호를 확인해 주세요");
    },
  });
};
export default useLoginMutation;
