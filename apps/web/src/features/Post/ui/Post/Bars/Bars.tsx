import { useState } from "react";

import {
  useHeaderIDs,
  useToC,
} from "../../../libs/hooks/post/usePostViewUtils";
import { getPostType } from "../../../model/post/type";

interface barProps {
  contentRef: React.RefObject<HTMLDivElement>;
  data: Partial<getPostType>;
}

const Bars = ({ contentRef, data }: barProps) => {
  const [_, setCirclePosition] = useState<number>(0);
  const [filledHeight, setFilledHeight] = useState<number>(0);

  useHeaderIDs(contentRef, data?.contents);
  useToC(contentRef, data?.contents, setCirclePosition, setFilledHeight);

  return (
    <div className="hidden lg:flex fixed right-0 lg:right-4 xl:right-[60px] top-[100px] w-[160px] gap-2">
      <div className="w-[4px] relative flex justify-center">
        <div
          className="absolute w-full bg-gray-200 rounded-full"
          style={{ height: "100%" }}
        ></div>
        <div
          className="absolute w-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transition-all duration-300 ease-out"
          style={{ height: `${filledHeight}px` }}
        ></div>
      </div>
      <div id="toc" className="text-xs"></div>
    </div>
  );
};

export default Bars;
