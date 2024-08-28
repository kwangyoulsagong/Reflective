import MainHeader from "../components/MainHeader";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px]">
        <MainHeader />
        <Search />
      </div>
    </div>
  );
};
export default Home;
