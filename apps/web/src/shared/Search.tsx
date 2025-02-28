import { useNavigate } from "react-router-dom";
import search from "../assets/search.svg";

const Search = () => {
  const navigate = useNavigate();
  const navigateToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="flex justify-center items-center mt-[50px] sm:mt-[75px] md:mt-[100px] ml-[150px] sm:ml-[200px] md:ml-[400px] gap-3 sm:gap-4 md:gap-5">
      <img
        className="w-[20px] sm:w-[24px] md:w-[28px]"
        src={search}
        alt="search"
      />
      <div
        className="outline-none w-[150px] sm:w-[200px] md:w-[250px] p-1 text-gray-300 cursor-pointer"
        onClick={navigateToSearchPage}
      >
        게시물 검색...
      </div>
    </div>
  );
};

export default Search;
