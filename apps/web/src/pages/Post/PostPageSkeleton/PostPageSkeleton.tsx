import BlockViewSkeleton from "./BlockViewSkeleton";

const PostPageSkeleton = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-full">
        {/* PostView 스켈레톤 */}
        <div className="mt-8 md:mt-16 lg:mt-20 w-full md:w-[900px] mx-auto px-4 md:px-0 h-auto flex flex-col items-center gap-6 md:gap-8 lg:gap-[50px]">
          {/* 제목 스켈레톤 */}
          <div className="h-10 md:h-12 lg:h-14 bg-gray-200 rounded w-3/4 animate-pulse"></div>

          {/* PostHeader 스켈레톤 */}
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Bars 스켈레톤 */}
          <div className="w-full flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Article 스켈레톤 */}
          <div className="w-[375px] md:w-[750px] px-4 md:px-0">
            {/* 여러 블록 유형을 표현하는 스켈레톤 */}
            <BlockViewSkeleton />
          </div>
        </div>

        {/* Comments 스켈레톤 */}
        <div className="w-full md:w-[900px] mt-8 px-4 md:px-0">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-6 animate-pulse">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1 ml-11"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3 ml-11"></div>
            </div>
          ))}
        </div>

        {/* Footer 스켈레톤 */}
        <div className="h-[300px] w-full bg-gray-100 mt-8"></div>
      </div>
    </div>
  );
};
export default PostPageSkeleton;
