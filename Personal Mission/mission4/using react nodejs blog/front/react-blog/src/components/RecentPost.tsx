import sample5 from "../assets/sample5.svg";
import sample6 from "../assets/sample6.svg";
import sample7 from "../assets/sample7.svg";
import time from "../assets/time.svg";
const posts = [
  {
    id: 1,
    title: "2024.08.13 TIL",
    category: "회고",
    time: "50분전",
    nickname: "hardy",
    imageUrl: sample6,
  },
  {
    id: 2,
    title: "인생샷 찍는 방법 알려드림!",
    category: "사진",
    time: "1시간전",
    nickname: "존잘남",
    imageUrl: sample5,
  },
  {
    id: 3,
    title: "웹사이트 커버를 더욱 이쁘게 할 수 있는 5가지 Tip",
    category: "기술 트렌드",
    time: "일주일 전",
    nickname: "sunya",
    imageUrl: sample7,
  },
  {
    id: 4,
    title: "LIKET - RN에서 웹뷰를 앱스럽게 개선하기",
    category: "웹",
    time: "2024.03.13",
    nickname: "Eodnje",
    imageUrl:
      "https://velog.velcdn.com/images/joch2712/post/67217b58-0336-44a9-84a3-58fd2fa2a1e0/image.png",
  },
  {
    id: 5,
    title: "MSA를 찍먹해보자. - feat. Saga Pattern",
    category: "MSA",
    time: "50분전",
    nickname: "Joshua",
    imageUrl:
      "https://velog.velcdn.com/images/joshuara7235/post/303eb0ec-73f6-4cbb-82c6-e0d131e21af1/image.webp",
  },
  {
    id: 6,
    title: "오픈소스 첫 기여 과정 - Spring AI",
    category: "오픈소스",
    time: "6일 전",
    nickname: "rivrdoe",
    imageUrl:
      "https://velog.velcdn.com/images/rivkode/post/2d1b6dd6-ce28-4bfd-a4eb-d731f1753ad9/image.png",
  },
];

const RecentPost = () => {
  return (
    <section className="grid grid-cols-3 gap-32 mt-[200px]">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className={` w-[300px] flex flex-col gap-2 ${
            index % 3 === 0 ? "mt-64" : index % 3 === 1 ? "mt-32" : ""
          }`}
        >
          <span className="font-bold">{post.category}</span>
          <img
            src={post.imageUrl}
            className="w-[400px] h-[175px] object-cover"
            alt="thumbnail"
          />
          <h1 className="text-[20px] font-bold">{post.title}</h1>
          <div className="flex justify-between mt-4">
            <div className="flex gap-4">
              <img
                src={time}
                alt="
            time"
              ></img>
              <span>{post.time}</span>
            </div>
            <span className="font-bold">{post.nickname}</span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default RecentPost;
