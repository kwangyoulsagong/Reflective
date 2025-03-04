const BlockViewSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* 텍스트 블록 스켈레톤 */}
      <div className="space-y-2 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
        <div className="h-5 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* 이미지 블록 스켈레톤 */}
      <div className="h-64 bg-gray-200 rounded w-full animate-pulse"></div>

      {/* 코드 블록 스켈레톤 */}
      <div className="rounded-lg overflow-hidden">
        <div className="h-6 bg-gray-300 w-full"></div>
        <div className="p-4 space-y-2 bg-gray-100 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      {/* 텍스트 블록 스켈레톤 */}
      <div className="space-y-2 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* 인용구 블록 스켈레톤 */}
      <div className="pl-4 border-l-4 border-gray-300 space-y-2 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};
export default BlockViewSkeleton;
