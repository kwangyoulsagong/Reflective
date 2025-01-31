import React, { useEffect, useState, useRef } from "react";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";

import PostHeader from "./Header/Header";
import Bars from "./Bars/Bars";

import { getPostType } from "../../model/post/type";
import { Block } from "../../../../shared/BlockView/model/BlockView/types";
import BlockView from "../../../../shared/BlockView/ui/BlockView";
import { PostValidation } from "../../libs/validation/Post";

const PostView = (data: Partial<getPostType>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const postValidation = new PostValidation();

  useEffect(() => {
    const validationResult = postValidation.isValidation(data);

    if (validationResult.isValid) {
      setBlocks(validationResult.contents || []);
    } else {
      console.error(validationResult.isError);
    }
  }, [data?.contents]);

  return (
    <div className="mt-8 md:mt-16 lg:mt-20 w-full md:w-[900px] mx-auto px-4 md:px-0 h-auto flex flex-col items-center gap-6 md:gap-8 lg:gap-[50px]">
      <h1 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-center">
        {data?.title}
      </h1>
      <PostHeader data={data} />
      <Bars contentRef={contentRef} data={data} />
      <article ref={contentRef}>
        <div className="w-[375px] md:w-[750px] px-4 md:px-0">
          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default PostView;
