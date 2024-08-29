import time from "../assets/time.svg";
import heart from "../assets/heart.png";
import { PostType } from "../types/types";
import { formatRelativeTime } from "../hooks/TimeReducer";

const RecentPost = ({ data }: { data: PostType[] }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-32 mt-[50px] md:mt-[100px] lg:mt-[200px]">
      {data.map((post, index) => (
        <article
          key={post.post_id}
          className={`w-full md:w-[300px] flex flex-col gap-2 ${
            index % 3 === 0
              ? "mt-32 sm:mt-64"
              : index % 3 === 1
              ? "mt-16 sm:mt-32"
              : ""
          }`}
        >
          <span className="font-bold">{post.category}</span>
          <img
            src={post.thumbnail}
            className="w-full h-[175px] object-cover"
            alt="thumbnail"
          />
          <h1 className="text-[18px] md:text-[20px] font-bold">{post.title}</h1>
          <div className="flex justify-between mt-4">
            <div className="flex gap-4 items-center">
              <img src={time} alt="time" />
              <span className="text-[12px] w-[50px]">
                {formatRelativeTime(post.created_date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{post.nickname}</span>
              <img className="w-[20px] h-[20px]" src={heart} alt="heart" />
              <span>{post.like_count}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default RecentPost;
