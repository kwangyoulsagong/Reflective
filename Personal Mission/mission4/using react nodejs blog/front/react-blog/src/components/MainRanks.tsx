import sample from "../assets/sample.svg";
import sample2 from "../assets/sample2.svg";
import sample3 from "../assets/sanple3.avif";
import sample4 from "../assets/sample4.jpg";
import time from "../assets/time.svg";
const MainRanks = () => {
  return (
    <section className="w-[100%] h-[auto] border 1 mt-[30px] flex flex-col">
      <div className="flex justify-between">
        <article className="flex w-[500px] items-center gap-3 ml-[50px] ">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={sample}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>스포츠</span>
            <h2 className="text-[30px] font-bold">서핑을 나서다!</h2>
            <div className="flex gap-3">
              <img
                src={time}
                alt="
            time"
              ></img>
              <span>4분전</span>
            </div>
          </div>
        </article>
        <article className="flex w-[500px] items-center gap-3 mr-[300px] mt-32 ">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={sample2}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>스포츠</span>
            <h2 className="text-[30px] font-bold">나도 조코비치가 될래</h2>
            <div className="flex gap-3">
              <img
                src={time}
                alt="
            time"
              ></img>
              <span>50분전</span>
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
            src={sample3}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>힐링</span>
            <h2 className="text-[30px] font-bold">
              스트레스를 하이킹으로 날릴래
            </h2>
            <div className="flex gap-3">
              <img
                src={time}
                alt="
            time"
              ></img>
              <span>하루전</span>
            </div>
          </div>
        </article>
        <article className="flex w-[500px] items-center gap-3 mt-48">
          <img
            className="w-[250px] h-[200px] object-cover"
            src={sample4}
            alt="sample"
          ></img>
          <div className="flex flex-col gap-3">
            <span>코딩</span>
            <h2 className="text-[30px] font-bold">next.js 기본 부터 다지기</h2>
            <div className="flex gap-3">
              <img
                src={time}
                alt="
            time"
              ></img>
              <span>일주일 전</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
export default MainRanks;
