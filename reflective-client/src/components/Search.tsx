import search from "../assets/search.svg";

const Search = () => {
  return (
    <div className="flex justify-center items-center mt-[50px] sm:mt-[75px] md:mt-[100px] ml-[150px] sm:ml-[200px] md:ml-[400px] gap-3 sm:gap-4 md:gap-5">
      <img
        className="w-[20px] sm:w-[24px] md:w-[28px]"
        src={search}
        alt="search"
      />
      <input
        className="outline-none w-[150px] sm:w-[200px] md:w-[250px] p-1"
        placeholder="게시물 검색..."
      ></input>
    </div>
  );
};

export default Search;
