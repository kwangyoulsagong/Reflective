const PostCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md bg-white">
      {/* 이미지 스켈레톤 */}
      <div className="h-48 bg-gray-200 w-full animate-pulse"></div>

      {/* 컨텐츠 스켈레톤 */}
      <div className="p-4">
        {/* 제목 스켈레톤 */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>

        {/* 내용 스켈레톤 */}
        <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 mb-4 animate-pulse"></div>

        {/* 작성자 정보 스켈레톤 */}
        <div className="flex items-center mt-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default PostCardSkeleton;
