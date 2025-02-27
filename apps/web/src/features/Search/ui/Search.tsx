import { SearchBar } from "@repo/ui/searchbar";
import { SearchList } from "@repo/ui/searchlist";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSearchQueryDebounce from "../libs/hooks/useSearchQueryDebounce";
import useSearchPostQuery from "../libs/hooks/useSearchPostQuery";
const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const debouncedQuery = useSearchQueryDebounce(query);
  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };
  const { data, isLoading, isError, refetch } = useSearchPostQuery({
    value: debouncedQuery,
    page: currentPage,
  });

  useEffect(() => {
    if (debouncedQuery) {
      refetch();
    }
  }, [debouncedQuery, currentPage, refetch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="w-full flex flex-col gap-5">
      <article className="relative  flex items-center w-full max-w-[300px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] mx-auto">
        <SearchBar
          value={query}
          onChange={handleChangeSearchQuery}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
        <SearchIcon
          size={18}
          className={`relative right-10 transition-colors duration-300
          ${isFocused ? "text-primary" : "text-gray-400"}`}
        />
      </article>
      <article className="flex justify-center">
        <SearchList
          results={data?.posts || []}
          totalPages={data?.totalPages || 0}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          isError={isError}
          query={debouncedQuery}
        />
      </article>
    </section>
  );
};
export default Search;
