import { SearchBar } from "@repo/ui/searchbar";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSearchQueryDebounce from "../libs/hooks/useSearchQueryDebounce";
const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useSearchQueryDebounce(query);
  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    console.log(debouncedQuery);
  }, [debouncedQuery]);
  return (
    <section className="w-full">
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
    </section>
  );
};
export default Search;
