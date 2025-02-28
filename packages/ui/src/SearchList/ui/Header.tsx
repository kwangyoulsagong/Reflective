import { Search } from "lucide-react";
import { Post } from "../types/type";
interface HeaderProps {
  searchResult: Post[];
  query: string;
}
const Header = ({ searchResult, query }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
      <h2 className="text-xl font-semibold text-gray-800">
        {query ? `'${query}' 검색 결과` : "검색 결과"}
      </h2>
      <div className="flex items-center text-sm text-gray-600">
        <span className="mr-2">
          {searchResult.length > 0
            ? `${searchResult.length}개의 결과`
            : "결과 없음"}
        </span>
        <Search size={16} className="text-gray-400" />
      </div>
    </div>
  );
};
export default Header;
