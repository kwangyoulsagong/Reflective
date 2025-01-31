import React from "react";

import MainRanks from "../components/MainRanks";
import RecentPost from "../features/Post/ui/RecentPost/RecentPost";
import Search from "../components/Search";
import useRecentPostQuery from "../hooks/api/useRecentPostQuery";
import Favorite from "../components/Favorite";
import Header from "../shared/Header/Header";

const Home = () => {
  const { data, isLoading, error } = useRecentPostQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );

  const topFour = data.slice(0, 10);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Favorite />
        <Header />
        <Search />
        <MainRanks data={topFour} />
        <RecentPost data={data} />
      </div>
    </div>
  );
};

export default Home;
