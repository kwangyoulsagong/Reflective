import MainHeader from "../components/MainHeader";
import MainRanks from "../components/MainRanks";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px] h-screen">
        <MainHeader />
        <Search />
        <MainRanks />
      </div>
    </div>
  );
};
export default Home;
