import { Routes, Route } from "react-router-dom";
import Write from "../containers/Write";

// 시작 페이지 라우트
function PageRoutes() {
  return (
    <Routes>
      <Route path="/write" element={<Write />}></Route>
    </Routes>
  );
}

export default PageRoutes;
