import { Routes, Route } from "react-router-dom";
import Start from "../containers/Start";
import SignUp from "../containers/SignUp";
import Home from "../containers/Home";

// 시작 페이지 라우트
function StartRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/account/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default StartRoutes;
