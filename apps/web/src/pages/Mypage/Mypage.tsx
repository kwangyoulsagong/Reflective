import { Suspense } from "react";
import MyPageSkeleton from "./MyPageSkeleton";
import MyPageContent from "../../features/MyPage/ui/MyPageContent";

const MyPage = () => {
  return (
    <Suspense fallback={<MyPageSkeleton />}>
      <MyPageContent />
    </Suspense>
  );
};
export default MyPage;
