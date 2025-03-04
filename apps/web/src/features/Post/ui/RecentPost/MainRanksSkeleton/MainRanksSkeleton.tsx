const MainRanksSkeleton = () => {
  return (
    <section className="relative w-full h-[400px] overflow-hidden my-6">
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
    </section>
  );
};
export default MainRanksSkeleton;
