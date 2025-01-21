import { useState } from "react";
import { useHeaderIDs, useToC } from "../../../hooks/usePostViewUtils";
import { getPostType } from "../../../types/types";
interface barProps {
  contentRef: React.RefObject<HTMLDivElement>;
  data: Partial<getPostType>;
}
const Bars = ({ contentRef, data }: barProps) => {
  const [circlePosition, setCirclePosition] = useState<number>(0);
  const [filledHeight, setFilledHeight] = useState<number>(0);
  useHeaderIDs(contentRef, data?.contents);
  useToC(contentRef, data?.contents, setCirclePosition, setFilledHeight);
  return (
    <div className="fixed right-[100px] w-[200px] flex gap-[20px]">
      <div className="w-[10px] relative flex justify-center">
        <div
          className="absolute w-[10px] bg-gray-200 rounded-full"
          style={{ height: "100%" }}
        ></div>
        <div
          className="absolute w-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out"
          style={{ height: `${filledHeight}px` }}
        ></div>
        <div
          className="absolute w-[20px] h-[20px] rounded-full bg-orange-500 transition-transform duration-300"
          style={{ transform: `translateY(${circlePosition}px)` }}
        ></div>
      </div>
      <div id="toc"></div>
    </div>
  );
};
export default Bars;
