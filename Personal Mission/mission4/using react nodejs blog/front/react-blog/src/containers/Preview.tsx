import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Include PrismJS theme
import "prismjs/components/prism-javascript.min.js";
import styles from "./styles/Preview.module.css";

type PreviewProps = {
  content: string;
};

const Preview = ({ content }: PreviewProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div className={styles.previewContainer}>
      <div
        className={styles.prose}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Preview;
