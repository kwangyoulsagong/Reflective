import React from "react";

interface UserRankProps {
  userRank: {
    nickname: string;
    rank: string;
    rate: number;
    log: number;
    progress: number;
  };
}

const RankCard = () => {
  return (
    <div className="w-[300px] bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg text-white shadow-lg">
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
            style={{ width: ` ${userRank.progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">
          {userRank.progress.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default RankCard;
