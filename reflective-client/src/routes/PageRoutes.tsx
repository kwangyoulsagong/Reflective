import { Routes, Route } from "react-router-dom";
import Write from "../containers/Write";
import PostDetail from "../containers/PostDetail";
import { usePostRouterStore } from "../provider/postRouterProvider";
import MyPage from "../containers/Mypage";

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
