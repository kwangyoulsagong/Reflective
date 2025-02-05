import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { useReducer } from "react";
import {
  ActionType,
  initialState,
  LoginReducer,
} from "../../model/reducers/LoginReducer";
import useLoginMutation from "../../libs/hooks/useLoginMutation";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const handleLogin = () => {
    const body = {
      email: state.email,
      password: state.password,
    };
    mutate(body);
  };
  const { mutate } = useLoginMutation();
  return (
    <section className="flex flex-col gap-8 justify-center items-center ">
      <div className="box-border flex flex-col gap-6 items-center w-[400px] h-[420px] border border-gray-300">
        <header>
          <img className="w-[150px] mt-10" src={logo} alt="logo" />
        </header>
        <Input
          value={state.email}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_EMAIL, payload: e.target.value })
          }
          placeholder="이메일"
          className="mt-5"
        />

        <Input
          value={state.password}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_PASSWORD, payload: e.target.value })
          }
          placeholder="비밀번호"
          type="password"
        />
        <Button variant="auth" onClick={handleLogin}>
          로그인
        </Button>
      </div>
      <div className="box-border flex justify-center items-center w-[400px] h-[70px] border border-gray-300">
        <span>
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/account/signup")}
            className="text-[#21B8C2] cursor-pointer"
          >
            가입하기
          </span>
        </span>
      </div>
    </section>
  );
};
export default Login;
