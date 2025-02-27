import React from "react";
import { Search } from "lucide-react";
import { formatRelativeTime } from "../utils/times";
import { PagingService } from "./Services/PagingService";

// 검색 결과 타입 정의
interface Post {
  post_id: string;
  _id?: string;
  title: string;
  contents: string;
  thumbnail?: string;
  category: string;
  like_count?: number;
  created_date: string;
  nickname?: string;
}

// SearchList Props 타입 정의
interface SearchListProps {
  results: Post[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  query?: string;
}

export const SearchList: React.FC<SearchListProps> = ({
  results = [],
  totalPages = 0,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  isError = false,
  query = "",
}) => {
  const pagingService = new PagingService();
  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* 헤더 부분 */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {query ? `'${query}' 검색 결과` : "검색 결과"}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">
            {results.length > 0 ? `${results.length}개의 결과` : "결과 없음"}
          </span>
          <Search size={16} className="text-gray-400" />
        </div>
      </div>

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
        <ul className="divide-y divide-gray-200">
          {results.map((item) => (
            <li
              key={item.post_id || item._id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {item.category || "일반"}
                    </span>
                    {item.nickname && (
                      <span className="text-gray-500">
                        작성자: {item.nickname}
                      </span>
                    )}
                    <span className="text-gray-500">
                      {formatRelativeTime(item.created_date)}
                    </span>
                    {item.like_count !== undefined && (
                      <span className="flex items-center text-gray-500">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.like_count}
                      </span>
                    )}
                  </div>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-200">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 페이지네이션 */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t ">
          <button
            className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <div className="flex space-x-1 gap-3">
            {pagingService
              .getPageNumber({ currentPage, totalPages })
              .map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 text-sm rounded-md ${
                    page === currentPage
                      ? "bg-white text-primary border border-gray-300 hover:bg-gray-100"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              ))}
          </div>
          <button
            className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </section>
  );
};
