import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-8 justify-center items-center ">
      <div className="box-border flex flex-col gap-6 items-center w-[400px] h-[420px] border border-gray-300">
        <header>
          <img className="w-[85px] mt-10" src={logo} alt="logo" />
        </header>
        <input
          placeholder="이메일"
          type="string"
          className="mt-5 w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <input
          placeholder="비밀번호"
          type="password"
          className="w-[340px] h-[40px] bg-custom-gray outline-none indent-4 text-sm "
        />
        <button className="w-[340px] h-[40px] rounded-[20px] text-[#ffffff] bg-primary">
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
