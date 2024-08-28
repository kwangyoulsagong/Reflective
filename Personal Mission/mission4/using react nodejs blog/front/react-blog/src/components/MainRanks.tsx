import sample from "../assets/sample.svg";
import time from "../assets/time.svg";
const MainRanks = () => {
  return (
    <div className="w-[inherit] h-[600px] border 1 mt-[30px]">
      <div className="flex items-center gap-3">
        <img src={sample} alt="sample"></img>
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
      </div>
    </div>
  );
};
export default MainRanks;
