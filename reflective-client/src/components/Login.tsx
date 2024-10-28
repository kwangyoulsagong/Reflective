import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useReducer } from "react";
import { LoginReducer } from "../reducers/LoginReducer";
import { ActionType, initialState } from "../reducers/LoginReducer";
import useLoginMutation from "../hooks/api/useLoginMutation";

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
        <input
          value={state.email}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_EMAIL, payload: e.target.value })
          }
          placeholder="이메일"
          type="string"
          className="mt-5 w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <input
          value={state.password}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_PASSWORD, payload: e.target.value })
          }
          placeholder="비밀번호"
          type="password"
          className="w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <button
          onClick={handleLogin}
          className="w-[340px] h-[40px] rounded-[20px] text-[#ffffff] bg-primary"
        >
          로그인
        </button>
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
