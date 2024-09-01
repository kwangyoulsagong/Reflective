import MainHeader from "../components/MainHeader";
import MainRanks from "../components/MainRanks";
import RecentPost from "../components/RecentPost";
import Search from "../components/Search";
import useRecentPostQuery from "../hooks/api/useRecentPostQuery";

const Home = () => {
  const { data, isLoading, error } = useRecentPostQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const topFour = data.slice(0, 10);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px] ">
        <MainHeader />
        <Search />
        <MainRanks data={topFour} />
        <RecentPost data={data} />
      </div>
    </div>
  );
};
export default Home;
