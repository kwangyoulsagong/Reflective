import { SearchListProps } from "./types/type";
import List from "./ui/List";
import Header from "./ui/Header";
import Paging from "./ui/Paging";

export const SearchList = ({
  results = [],
  totalPages = 0,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  isError = false,
  query = "",
  goToPostDetail,
}: SearchListProps) => {
  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* 헤더 부분 */}
      <Header searchResult={results} query={query} />
      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 에러 상태 */}
      {isError && (
        <div className="p-6 text-center text-red-500">
          검색 결과를 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      {/* 검색 결과가 없는 경우 */}
      {!isLoading && !isError && results.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          {query
            ? `'${query}'에 대한 검색 결과가 없습니다.`
            : "검색어를 입력해주세요."}
        </div>
      )}

      {/* 검색 결과 리스트 */}
      {!isLoading && !isError && results.length > 0 && (
        <List searchResult={results} goToPostDetail={goToPostDetail} />
      )}

      {/* 페이지네이션 */}
      {!isLoading && !isError && totalPages > 1 && (
        <Paging
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};
