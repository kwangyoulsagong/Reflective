const HomeSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header 스켈레톤 */}
        <div className="w-full h-16 bg-gray-200 rounded my-4 animate-pulse"></div>

        {/* Search 스켈레톤 */}
        <div className="w-full h-12 bg-gray-200 rounded-full my-4 animate-pulse"></div>

        {/* MainRanks 스켈레톤 */}
        <div className="w-full">
          <div className="flex justify-center space-x-4 my-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-32 h-48 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
        </div>

        {/* RecentPost 스켈레톤 */}
        <div className="w-full h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
