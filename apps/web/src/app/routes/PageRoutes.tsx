import { Routes, Route } from "react-router-dom";
import Write from "../../pages/WritePage";
import PostDetail from "../../pages/PostPage";

import MyPage from "../../pages/Mypage";
import { usePostRouterStore } from "../provider/postRouterProvider";

// 시작 페이지 라우트
function PageRoutes() {
  return (
    <Routes>
      <Route path="/write" element={<Write />}></Route>
      <Route path="/:nickname/:title" element={<PostDetail />} />
      <Route path={`/mypage`} element={<MyPage />} />
    </Routes>
  );
}

export default PageRoutes;
