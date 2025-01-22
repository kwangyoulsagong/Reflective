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
    <div className="hidden lg:flex fixed right-0 lg:right-4 xl:right-[100px] top-[120px] w-[200px] gap-3 md:gap-5">
      <div className="w-[6px] md:w-[10px] relative flex justify-center">
        <div
          className="absolute w-full bg-gray-200 rounded-full"
          style={{ height: "100%" }}
        ></div>
        <div
          className="absolute w-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out"
          style={{ height: `${filledHeight}px` }}
        ></div>
        <div
          className="absolute w-[12px] h-[12px] md:w-[20px] md:h-[20px] -left-[3px] md:-left-[5px] rounded-full bg-orange-500 transition-transform duration-300"
          style={{ transform: `translateY(${circlePosition}px)` }}
        ></div>
      </div>
      <div id="toc" className="text-sm md:text-base"></div>
    </div>
  );
};

export default Bars;
