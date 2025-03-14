import MainRanks from "../../../features/Post/ui/RecentPost/MainRanks";
import RecentPost from "../../../features/Post/ui/RecentPost/RecentPost";
import Header from "../../../shared/Header/Header";
import FavoriteStories from "../../../features/favorite/ui/Favorite";
import Search from "../../../shared/Search";
import { Footer } from "@repo/ui/footer";
const HomeContent = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <FavoriteStories />
        <Header />
        <Search />
        <MainRanks />
        <RecentPost />
        <section className="pt-[100px] w-full">
          <Footer />
        </section>
      </div>
    </div>
  );
};
export default HomeContent;
