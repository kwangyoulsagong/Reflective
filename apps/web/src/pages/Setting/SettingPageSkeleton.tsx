const SettingSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-[350px] h-[600px] border border-gray-300 gap-10 p-6 animate-pulse">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-[60px] h-[60px] rounded-full bg-gray-200"></div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>

      {/* 입력 필드 스켈레톤 */}
      <div className="w-full h-10 bg-gray-200 rounded mt-5"></div>
      <div className="w-full h-10 bg-gray-200 rounded"></div>
      <div className="w-full h-10 bg-gray-200 rounded"></div>

      {/* 버튼 스켈레톤 */}
      <div className="w-full h-10 bg-gray-200 rounded"></div>
    </div>
  );
};

export default SettingSkeleton;
