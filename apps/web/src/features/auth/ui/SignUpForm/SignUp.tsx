import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { useReducer } from "react";
import {
  ActionType,
  initialState,
  SignUpReducer,
} from "../../model/reducers/SignUpReducer";
import useSignUpMutation from "../../libs/hooks/useSignUpMutation";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { SignUpValidator } from "../../libs/validation/SignUpValidation";
const SignUp = () => {
  const [state, dispatch] = useReducer(SignUpReducer, initialState);
  const navigate = useNavigate();
  const handleSignUp = () => {
    const sv = new SignUpValidator();
    const body = {
      email: state.email,
      password: state.password,
      nickname: state.nickname,
      phone_number: state.phone_number,
    };
    const validation = sv.validateForm(body);
    // 유효성 검사 오류가 있으면 에러 상태를 업데이트하고 리턴
    if (!validation.isValid) {
      dispatch({ type: ActionType.SET_ERRORS, payload: validation.errors });
      return;
    }
    mutate(body);
  };
  const { mutate } = useSignUpMutation();
  return (
    <section className="flex flex-col gap-8 justify-center items-center ">
      <div className="box-border flex flex-col gap-6 items-center w-[400px] h-[600px] border border-gray-300">
        <header>
          <img className="w-[150px] mt-10" src={logo} alt="logo" />
        </header>
        <Input
          value={state.email}
          placeholder="이메일"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_EMAIL,
              payload: e.target.value,
            })
          }
          className="mt-5"
        />
        {state.errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {state.errors.email}
          </span>
        )}
        <Input
          value={state.password}
          placeholder="비밀번호"
          type="password"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_PASSWORD,
              payload: e.target.value,
            })
          }
        />
        {state.errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {state.errors.password}
          </span>
        )}
        <Input
          value={state.nickname}
          placeholder="닉네임"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_NICKNAME,
              payload: e.target.value,
            })
          }
        />
        {state.errors.nickname && (
          <span className="text-red-500 text-sm mt-1">
            {state.errors.nickname}
          </span>
        )}
        <Input
          value={state.phone_number}
          placeholder="전화번호"
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_PHONE_NUMBER,
              payload: e.target.value,
            })
          }
        />
        {state.errors.phone_number && (
          <span className="text-red-500 text-sm mt-1">
            {state.errors.phone_number}
          </span>
        )}
        <Button variant="auth" onClick={handleSignUp}>
          회원가입
        </Button>
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
export default SignUp;
