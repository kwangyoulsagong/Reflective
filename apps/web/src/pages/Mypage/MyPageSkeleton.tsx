const MyPageSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header 스켈레톤 */}
      <div className="w-full h-16 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* 프로필 스켈레톤 */}
      <div className="w-full flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-lg shadow-md">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* 등급 및 소개글 섹션 스켈레톤 */}
      <section className="mt-10 flex flex-col items-center md:flex-row md:items-start gap-8">
        <div>
          <div className="h-7 bg-gray-200 rounded w-20 mb-4 animate-pulse"></div>
          <div className="w-64 h-40 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
        </div>
        <div className="w-full max-w-sm">
          <div className="h-7 bg-gray-200 rounded w-20 mb-4 animate-pulse"></div>
          <div className="w-full h-40 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
        </div>
      </section>

      {/* 탭 버튼 스켈레톤 */}
      <nav className="flex space-x-4 mt-10 mb-6">
        <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
      </nav>

      {/* 게시물 그리드 스켈레톤 */}
      <div className="h-[800px] overflow-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              {/* 썸네일 영역 */}
              <div className="h-48 bg-gray-200"></div>
              {/* 콘텐츠 영역 */}
              <div className="p-4 bg-white">
                {/* 제목 */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                {/* 본문 요약 */}
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                {/* 작성자 정보 */}
                <div className="flex items-center mt-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageSkeleton;
