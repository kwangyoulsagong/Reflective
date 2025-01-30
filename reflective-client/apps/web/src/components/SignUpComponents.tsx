import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useReducer } from "react";
import {
  ActionType,
  initialState,
  SignUpReducer,
} from "../reducers/SignUpReducer";
import useSignUpMutation from "../hooks/api/useSignUpMutation";
const SignUpComponents = () => {
  const [state, dispatch] = useReducer(SignUpReducer, initialState);
  const navigate = useNavigate();
  const handleSignUp = () => {
    const body = {
      email: state.email,
      password: state.password,
      nickname: state.nickname,
      phone_number: state.phone_number,
    };
    mutate(body);
  };
  const { mutate } = useSignUpMutation();
  return (
    <section className="flex flex-col gap-8 justify-center items-center ">
      <div className="box-border flex flex-col gap-6 items-center w-[400px] h-[600px] border border-gray-300">
        <header>
          <img className="w-[150px] mt-10" src={logo} alt="logo" />
        </header>
        <input
          value={state.email}
          placeholder="이메일"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_EMAIL,
              payload: e.target.value,
            })
          }
          type="string"
          className="mt-5 w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <input
          value={state.password}
          placeholder="비밀번호"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_PASSWORD,
              payload: e.target.value,
            })
          }
          type="password"
          className="w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <input
          value={state.nickname}
          placeholder="닉네임"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_NICKNAME,
              payload: e.target.value,
            })
          }
          type="string"
          className="w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <input
          value={state.phone_number}
          placeholder="전화번호"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_PHONE_NUMBER,
              payload: e.target.value,
            })
          }
          type="string"
          className="w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <button
          onClick={handleSignUp}
          className="mt-32 w-[340px] h-[40px] rounded-[20px] text-[#ffffff] bg-primary"
        >
          회원가입
        </button>
      </div>
      <div className="box-border flex justify-center items-center w-[400px] h-[70px] border border-gray-300">
        <span>
          계정이 있으신가요?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#21B8C2] cursor-pointer"
          >
            로그인
          </span>
        </span>
      </div>
    </section>
  );
};
export default SignUpComponents;
