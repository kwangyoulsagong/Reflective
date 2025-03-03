import useGetRanks from "../libs/hooks/useGetRanks";

interface UserRankType {
  user_id?: string;
  nickname: string;
  rank: string;
  rate: number;
  log: number;
  progress: number;
}

const RankCard = () => {
  const { data, isLoading, isError } = useGetRanks();

  if (isLoading) {
    return <div className="w-full max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        Error loading data. Please try again.
      </div>
    );
  }

  // 데이터 검증을 더 철저히 함
  if (!data) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        No rank data available.
      </div>
    );
  }

  // 데이터가 객체인지 배열인지 확인
  const userRank: UserRankType = Array.isArray(data) ? data[0] : data;

  if (!userRank || !userRank.nickname) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        Invalid rank data format.
      </div>
    );
  }

  // 랭크별 색상 설정
  const getRankGradient = (rank: string) => {
    const baseRank = rank.replace(/[0-9]/g, "");

    switch (baseRank) {
      case "Diamond":
        return "from-blue-400 to-blue-700";
      case "Platinum":
        return "from-cyan-400 to-cyan-600";
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Silver":
        return "from-gray-300 to-gray-500";
      case "Bronze":
        return "from-amber-600 to-amber-800";
      case "Iron":
        return "from-stone-500 to-stone-700";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const gradientClasses = getRankGradient(userRank.rank);
  const safeProgress = Math.max(0, userRank.progress || 0);

  return (
    <div
      className={`w-[300px] bg-gradient-to-r ${gradientClasses} p-4 rounded-lg text-white shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{userRank.nickname}</h3>
        <span className="text-3xl font-bold">{userRank.rank}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm opacity-80">rate</p>
          <p className="text-xl font-semibold">{userRank.rate}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">log</p>
          <p className="text-xl font-semibold">{userRank.log}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5">
          <div
            className="bg-white h-2.5 rounded-full"
            style={{ width: `${safeProgress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">{safeProgress.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default RankCard;
