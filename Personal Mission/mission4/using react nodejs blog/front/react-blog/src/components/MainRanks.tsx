import time from "../assets/time.svg";
import { PostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";
import heart from "../assets/heart.png";

const MainRanks = ({ data }: { data: PostType[] }) => {
  return (
    <section className="w-full h-auto border mt-[30px] flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between">
        <article className="flex flex-col md:flex-row w-full md:w-[500px] items-center gap-3 md:ml-[50px] mb-8 md:mb-0">
          <img
            className="w-full md:w-[250px] h-[200px] object-cover"
            src={data[0].thumbnail}
            alt="sample"
          />
          <div className="flex flex-col gap-3 px-4 md:px-0">
            <span>{data[0].category}</span>
            <h2 className="text-[24px] md:text-[30px] font-bold">
              {data[0].title}
            </h2>
            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4 items-center">
                <img src={time} alt="time" />
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[0].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{data[0].nickname}</span>
                <img className="w-[20px] h-[20px]" src={heart} alt="heart" />
                <span>{data[0].like_count}</span>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col md:flex-row w-full md:w-[500px] items-center gap-3 md:mr-[300px] mt-8 md:mt-32">
          <img
            className="w-full md:w-[250px] h-[200px] object-cover"
            src={data[1].thumbnail}
            alt="sample"
          />
          <div className="flex flex-col gap-3 px-4 md:px-0">
            <span>{data[1].category}</span>
            <h2 className="text-[24px] md:text-[30px] font-bold">
              {data[1].title}
            </h2>
            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4 items-center">
                <img src={time} alt="time" />
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[1].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{data[1].nickname}</span>
                <img className="w-[20px] h-[20px]" src={heart} alt="heart" />
                <span>{data[1].like_count}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="flex flex-col items-center text-[40px] md:text-[100px] my-8">
        <span className="md:mr-[300px]">오늘의 트렌드는?</span>
        <span className="md:ml-[300px]">궁금 하신가요?</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <article className="flex flex-col md:flex-row w-full md:w-[500px] items-center gap-3 md:ml-[500px] mt-8 md:mt-[100px]">
          <img
            className="w-full md:w-[250px] h-[200px] object-cover"
            src={data[2].thumbnail}
            alt="sample"
          />
          <div className="flex flex-col gap-3 px-4 md:px-0">
            <span>{data[2].category}</span>
            <h2 className="text-[24px] md:text-[30px] font-bold">
              {data[2].title}
            </h2>
            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4 items-center">
                <img src={time} alt="time" />
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[2].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{data[2].nickname}</span>
                <img className="w-[20px] h-[20px]" src={heart} alt="heart" />
                <span>{data[2].like_count}</span>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col md:flex-row w-full md:w-[500px] items-center gap-3 md:mr-[10px] mt-8 md:mt-48">
          <img
            className="w-full md:w-[250px] h-[200px] object-cover"
            src={data[3].thumbnail}
            alt="sample"
          />
          <div className="flex flex-col gap-3 px-4 md:px-0">
            <span>{data[3].category}</span>
            <h2 className="text-[24px] md:text-[30px] font-bold">
              {data[3].title}
            </h2>
            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4 items-center">
                <img src={time} alt="time" />
                <span className="text-[12px] w-[60px]">
                  {formatRelativeTime(data[3].created_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{data[3].nickname}</span>
                <img className="w-[20px] h-[20px]" src={heart} alt="heart" />
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
