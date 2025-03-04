import React, { Suspense } from "react";

import RecentPostSkeleton from "./RecentPostSkeleton/RecentPostSkeleton";
const RecentPostContent = React.lazy(
  () => import("./RecentPostContent/RecentPostContent")
);
const RecentPost = () => {
  return (
    <Suspense fallback={<RecentPostSkeleton />}>
      <RecentPostContent />
    </Suspense>
  );
};

export default RecentPost;
