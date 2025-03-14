import React, { Suspense } from "react";
const HomeContent = React.lazy(() => import("./HomeContent/HomeContent"));
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";

const Home = () => {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
