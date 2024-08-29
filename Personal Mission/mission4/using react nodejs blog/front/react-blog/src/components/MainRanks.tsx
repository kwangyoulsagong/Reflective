import time from "../assets/time.svg";
import { PostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";
import heart from "../assets/heart.png";
const MainRanks = ({ data }: { data: PostType[] }) => {
  return (
    <section className="w-[100%] h-[auto] border 1 mt-[30px] flex flex-col">
      <div className="flex justify-between">
        <article className="flex w-[500px] items-center gap-3 ml-[50px] ">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={data[0].thumbnail}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>{data[0].category}</span>
            <h2 className="text-[30px] font-bold">{data[0].title}</h2>
            <div className="flex justify-between mt-4">
              <div className="flex gap-4 items-center">
                <img
                  src={time}
                  alt="
            time"
                ></img>
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[0].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold ">{data[0].nickname}</span>
                <img
                  className="w-[20px] h-[20px]"
                  src={heart}
                  alt="heart"
                ></img>
                <span>{data[0].like_count}</span>
              </div>
            </div>
          </div>
        </article>
        <article className="flex w-[500px] items-center gap-3 mr-[300px] mt-32 ">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={data[1].thumbnail}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>{data[1].category}</span>
            <h2 className="text-[30px] font-bold">{data[1].title}</h2>
            <div className="flex justify-between mt-4">
              <div className="flex gap-4 items-center">
                <img
                  src={time}
                  alt="
            time"
                ></img>
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[1].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold ">{data[1].nickname}</span>
                <img
                  className="w-[20px] h-[20px]"
                  src={heart}
                  alt="heart"
                ></img>
                <span>{data[1].like_count}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="flex flex-col items-center text-[100px]">
        <span className="mr-[300px]">오늘의 트렌드는?</span>
        <span className="ml-[300px]">궁금 하신가요?</span>
      </div>
      <div className="flex justify-between">
        <article className="flex w-[500px] items-center gap-3 ml-[500px] mt-[100px]">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={data[2].thumbnail}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>{data[2].category}</span>
            <h2 className="text-[30px] font-bold">{data[2].title}</h2>
            <div className="flex justify-between mt-4">
              <div className="flex gap-4 items-center">
                <img
                  src={time}
                  alt="
            time"
                ></img>
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[2].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold ">{data[2].nickname}</span>
                <img
                  className="w-[20px] h-[20px]"
                  src={heart}
                  alt="heart"
                ></img>
                <span>{data[2].like_count}</span>
              </div>
            </div>
          </div>
        </article>
        <article className="flex w-[500px] items-center mr-[10px] gap-3 mt-48 ">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={data[3].thumbnail}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>{data[3].category}</span>
            <h2 className="text-[30px] font-bold">{data[3].title}</h2>
            <div className="flex justify-between mt-4">
              <div className="flex gap-4 items-center">
                <img
                  src={time}
                  alt="
            time"
                ></img>
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[3].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{data[3].nickname}</span>
                <img
                  className="w-[20px] h-[20px]"
                  src={heart}
                  alt="heart"
                ></img>
                <span>{data[3].like_count}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
export default MainRanks;
