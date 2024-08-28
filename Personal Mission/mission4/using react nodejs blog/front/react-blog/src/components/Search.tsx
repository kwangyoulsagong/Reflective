import search from "../assets/search.svg";
const Search = () => {
  return (
    <div className="flex justify-center items-center mt-[100px] ml-[300px] gap-5">
      <img src={search} alt="search"></img>
      <input className="outline-none" placeholder="게시물 검색..."></input>
    </div>
  );
};
export default Search;
