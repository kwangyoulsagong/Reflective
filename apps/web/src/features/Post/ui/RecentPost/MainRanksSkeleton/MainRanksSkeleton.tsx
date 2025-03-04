const MainRanksSkeleton = () => {
  return (
    <section className="container">
      <div className="gallery flex justify-center space-x-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-32 h-48 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
      <div className="message flex justify-center mt-4">
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    </section>
  );
};
export default MainRanksSkeleton;
