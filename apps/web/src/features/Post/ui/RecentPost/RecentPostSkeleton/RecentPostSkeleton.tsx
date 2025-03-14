import PostCardSkeleton from "./PostCardSkeleton/PostCardSkeleton";

const RecentPostSkeleton = () => {
  return (
    <div className="h-[800px] overflow-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
export default RecentPostSkeleton;
