// HomeSkeleton.tsx
const HomeSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header 스켈레톤 */}
        <div className="w-full h-16 bg-gray-200 rounded my-4 animate-pulse"></div>

        {/* MainRanks 스켈레톤 */}
        <div className="relative w-full h-[400px] my-6 overflow-hidden">
          {/* 원형으로 배열된 스켈레톤 아이템들 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: 8 }).map((_, i) => {
              // 원형 배치를 위한 각도 계산
              const angle = (i / 8) * 2 * Math.PI;
              const radius = 120; // 원의 반지름
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="absolute rounded-full overflow-hidden shadow-lg animate-pulse"
                  style={{
                    width: "80px",
                    height: "80px",
                    transform: `translate(${x}px, ${y}px) rotate(${angle * (180 / Math.PI)}deg)`,
                    backgroundColor: "#e5e7eb",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* RecentPost 스켈레톤 */}
        <div className="w-full h-[800px] mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                {/* 썸네일 영역 */}
                <div className="h-48 bg-gray-200"></div>
                {/* 콘텐츠 영역 */}
                <div className="p-4 bg-white">
                  {/* 제목 */}
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  {/* 본문 */}
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
    </div>
  );
};

export default HomeSkeleton;
