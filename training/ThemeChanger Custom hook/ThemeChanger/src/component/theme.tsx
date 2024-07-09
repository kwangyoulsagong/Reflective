import React from "react";
import { useTheme } from "../Provider/theme";

const Theme = ({ onCLose }: any) => {
  const { setTheme } = useTheme();

  // 테마 변경 함수
  const handleTheme = (value: string) => {
    setTheme(value);
    onCLose()
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 grid grid-cols-4 gap-4">
        <button
          className="border border-gray-300 p-3 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
          onClick={() => handleTheme("bg-gray-100")}
        >
          그레이
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-blue-200 hover:bg-blue-100 focus:outline-none"
          onClick={() => handleTheme("bg-blue-200")}
        >
          하늘색
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-slate-600 hover:bg-slate-500 text-slate-300 focus:outline-none"
          onClick={() => handleTheme("bg-slate-600")}
        >
          슬레이트
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-teal-300 hover:bg-teal-100 text-slate-500 focus:outline-none"
          onClick={() => handleTheme("bg-teal-300")}
        >
          민트
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-purple-300 hover:bg-purple-100 text-white focus:outline-none"
          onClick={() => handleTheme("bg-purple-300")}
        >
          보라색
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-rose-300 hover:bg-rose-200 text-white focus:outline-none"
          onClick={() => handleTheme("bg-rose-300")}
        >
          연분홍
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-orange-500 hover:bg-orange-300 focus:outline-none"
          onClick={() => handleTheme("bg-orange-500")}
        >
          오랜지
        </button>
        <button
          className="border border-gray-300 p-3 rounded-md bg-yellow-400 hover:bg-yellow-300 text-white focus:outline-none"
          onClick={() => handleTheme("bg-yellow-400")}
        >
          노란색
        </button>
      </div>
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        onClick={onCLose}
      >
        닫기
      </button>
    </div>
  );
};

export default Theme;
