import Login from "../features/auth/ui/LoginForm/Login";
import StartBackground from "../features/auth/ui/StartBackground";

const Start = () => {
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
