import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/Preview.module.css";
import usePostDetailQuery from "../hooks/api/usePostDetailQuery";
import { usePost_idStore } from "../provider/post_idProvider";
import {
  useScrollHighlight,
  useHeaderIDs,
  useToC,
} from "../hooks/usePostViewUtils";

const PostView = () => {
  const { post_id } = usePost_idStore();
  const { data, isLoading, error } = usePostDetailQuery(post_id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.contents) {
      Prism.highlightAll();
    }
  }, [data?.contents]);

  useHeaderIDs(contentRef, data?.contents);
  useToC(contentRef, data?.contents);
  useScrollHighlight(contentRef);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-20 w-[900px] h-auto flex flex-col items-center gap-[50px]">
      <h1 className="text-[50px] font-bold">{data?.title}</h1>
      <div className="fixed right-[200px] w-[200px] border">
        <div id="toc"></div>
      </div>
      <div className={styles.previewContainer} ref={contentRef}>
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: data?.contents }}
        />
      </div>
    </div>
  );
};

export default PostView;
