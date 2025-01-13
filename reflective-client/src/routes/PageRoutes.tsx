import { Routes, Route } from "react-router-dom";
import Write from "../pages/Write";
import PostDetail from "../pages/PostDetail";
import { usePostRouterStore } from "../provider/postRouterProvider";
import MyPage from "../pages/Mypage";

// 시작 페이지 라우트
function PageRoutes() {
  const { nickname, title } = usePostRouterStore();
  return (
    <Routes>
      <Route path="/write" element={<Write />}></Route>
      <Route path={`/${nickname}/${title}`} element={<PostDetail />} />
      <Route path={`/mypage`} element={<MyPage />} />
    </Routes>
  );
}

export default PageRoutes;
