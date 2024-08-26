import { Routes, Route } from "react-router-dom";
import Start from "../containers/Start";

// 시작 페이지 라우트
function StartRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
    </Routes>
  );
}

export default StartRoutes;
