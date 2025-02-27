import React from "react";
import { Search } from "lucide-react";

export const SearchList = () => {
  // 샘플 검색 결과 데이터
  const searchResults = [
    {
      id: 1,
      title: "리액트 기초 가이드",
      category: "프로그래밍",
      date: "2023-12-15",
    },
    {
      id: 2,
      title: "Next.js 시작하기",
      category: "웹개발",
      date: "2024-01-20",
    },
    {
      id: 3,
      title: "Tailwind CSS 활용법",
      category: "디자인",
      date: "2024-02-05",
    },
    {
      id: 4,
      title: "TypeScript 타입 시스템",
      category: "프로그래밍",
      date: "2024-02-18",
    },
    {
      id: 5,
      title: "리액트 훅스 심화 과정",
      category: "프로그래밍",
      date: "2024-03-10",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* 헤더 부분 */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">검색 결과</h2>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">{searchResults.length}개의 결과</span>
          <Search size={16} className="text-gray-400" />
        </div>
      </div>

      {/* 검색 결과 리스트 */}
      <ul className="divide-y divide-gray-200">
        {searchResults.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {item.category}
                  </span>
                  <span className="text-gray-500">{item.date}</span>
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

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
        <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
          이전
        </button>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded-md ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
          다음
        </button>
      </div>
    </section>
  );
};
