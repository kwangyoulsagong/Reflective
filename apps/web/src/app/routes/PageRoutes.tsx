import { Routes, Route } from "react-router-dom";
import Write from "../../pages/WritePage";
import PostDetail from "../../pages/Post/PostPage";
import MyPage from "../../pages/Mypage/Mypage";
import SettingPage from "../../pages/SettingPage";
import SearchPage from "../../pages/SearchPage";

//페이지 라우트
function PageRoutes() {
  return (
    <Routes>
      <Route path="/write" element={<Write />}></Route>
      <Route path="/:nickname/:title" element={<PostDetail />} />
      <Route path={`/mypage`} element={<MyPage />} />
      <Route path={"/settings"} element={<SettingPage />} />
      <Route path={"/search"} element={<SearchPage />} />
    </Routes>
  );
}

export default PageRoutes;
