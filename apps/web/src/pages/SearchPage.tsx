import Search from "../features/Search/ui/Search";
import Header from "../shared/Header/Header";

const SearchPage = () => {
  return (
    <section className="flex flex-col items-center gap-10">
      <Header />
      <Search />
    </section>
  );
};
export default SearchPage;
