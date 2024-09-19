import usePostDetailQuery from "../hooks/api/usePostDetailQuery";
import { usePost_idStore } from "../provider/post_idProvider";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Include PrismJS theme
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/Preview.module.css";
import { useEffect } from "react";

const PostView = () => {
  const { post_id } = usePost_idStore();
  const { data, isLoading, error } = usePostDetailQuery(post_id);

  useEffect(() => {
    if (data?.contents) {
      Prism.highlightAll();
    }
  }, [data?.contents]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div className="mt-20 w-[900px] h-auto flex flex-col items-center gap-[50px]">
      <h1 className="text-[50px] font-bold">{data?.title}</h1>
      <div className={styles.previewContainer}>
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: data?.contents }}
        />
      </div>
    </div>
  );
};
export default PostView;
