import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Include PrismJS theme
import "prismjs/components/prism-javascript.min.js";
import mermaid from "mermaid"; // Import Mermaid
import styles from "./styles/Preview.module.css";

type PreviewProps = {
  content: string;
};

const Preview = ({ content }: PreviewProps) => {
  useEffect(() => {
    // Highlight code using PrismJS
    Prism.highlightAll();

    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded(); // Rerender Mermaid diagrams
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
