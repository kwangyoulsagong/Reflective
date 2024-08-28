import MainHeader from "../components/MainHeader";
import MainRanks from "../components/MainRanks";
import RecentPost from "../components/RecentPost";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px] ">
        <MainHeader />
        <Search />
        <MainRanks />
        <RecentPost />
      </div>
    </div>
  );
};
export default Home;
