import { useEffect } from "react";
import Login from "../features/auth/ui/LoginForm/Login";
import StartBackground from "../features/auth/ui/StartBackground";
import { ACCESS_TOKEN_KEY } from "../shared/constants/api";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      navigate("/home");
    }
  }, []);
  return (
    <div className=" flex justify-center items-center h-screen ">
      <main className="flex justify-center  w-1301 h-800">
        <StartBackground />
        <Login />
      </main>
    </div>
  );
};
export default Start;
