import React, { Suspense } from "react";
import MainRanksContent from "./MainRanksContent/MainRanksContent";
const MainRanksSkeleton = React.lazy(
  () => import("./MainRanksSkeleton/MainRanksSkeleton")
);
const MainRanks = () => {
  return (
    <Suspense fallback={<MainRanksSkeleton />}>
      <MainRanksContent />
    </Suspense>
  );
};

export default MainRanks;
