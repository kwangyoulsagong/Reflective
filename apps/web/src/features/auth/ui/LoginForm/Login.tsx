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
import { LoginValidator } from "../../libs/validation/LoginValidation";

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const handleLogin = () => {
    const lv = new LoginValidator();
    const body = {
      email: state.email,
      password: state.password,
    };
    const validation = lv.valdiateForm(body);
    if (!validation.isValid) {
      dispatch({ type: ActionType.SET_ERRORS, payload: validation.errors });
      return;
    }
    mutate(body);
  };
  const { mutate, error } = useLoginMutation();
  return (
    <section className="flex flex-col gap-8 justify-center items-center ">
      <div className="box-border flex flex-col gap-6 items-center w-[400px] h-[450px] border border-gray-300">
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
        {state.errors.email && (
          <span className="text-red-500 text-sm ">{state.errors.email}</span>
        )}
        <Input
          value={state.password}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_PASSWORD, payload: e.target.value })
          }
          placeholder="비밀번호"
          type="password"
        />
        {state.errors.password && (
          <span className="text-red-500 text-sm ">{state.errors.password}</span>
        )}
        {error && (
          <span className="text-red-500 text-sm">
            {error instanceof Error ? error.message : "로그인에 실패했습니다"}
          </span>
        )}
        <Button variant="auth" onClick={handleLogin}>
          로그인
        </Button>
      </div>
      <div className="box-border flex justify-center items-center w-[400px] h-[70px] border border-gray-300">
        <span>
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
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
