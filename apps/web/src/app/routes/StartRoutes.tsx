import { Routes, Route } from "react-router-dom";
import Start from "../../pages/StartPage";
import SignUp from "../../pages/SignUpPage";
import Home from "../../pages/Home/Home";

// 시작 페이지 라우트
function StartRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default StartRoutes;
