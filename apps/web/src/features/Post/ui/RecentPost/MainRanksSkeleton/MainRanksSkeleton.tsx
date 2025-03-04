const MainRanksSkeleton = () => {
  return (
    <section className="w-full flex justify-center items-center h-[400px] my-6 relative">
      {/* 원형으로 배열된 스켈레톤 아이템들 */}
      <div className="relative w-[300px] h-[300px]">
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
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle * (180 / Math.PI)}deg)`,
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
