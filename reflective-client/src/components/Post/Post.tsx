import React, { useEffect, useState, useRef } from "react";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";

import { getPostType } from "../../types/types";
import { Block } from "../../types/BlockView/BlockView";
import BlockView from "../common/BlockView/BlockView";
import PostHeader from "./Header/Header";
import Bars from "./Bars/Bars";
import { PostValidation } from "../../services/Post/Post";

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
    <div className="mt-20 w-[900px] h-auto flex flex-col items-center gap-[50px]">
      <h1 className="text-[50px] font-bold">{data?.title}</h1>
      <PostHeader data={data} />
      <Bars contentRef={contentRef} data={data} />
      <article ref={contentRef}>
        <div>
          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default PostView;
