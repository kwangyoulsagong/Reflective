import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { Trash2, Bold, Italic, Underline, Eye, EyeOff } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { EDITOR_CONFIG, INITIAL_CHART_DATA } from "../../constants/blockEditor";
import ImageSizeSlider from "./ImageSize/ImageSize";
import { BlockEditorProps } from "../../types/BlockEditor/BlockEditor";

import useBlockContent from "../../hooks/BlockEditor/useBlockContent";
import { ListEditor } from "./ListEditor/ListEditor";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BlockEditor: React.FC<BlockEditorProps> = React.memo(
  ({ block, updateBlock, removeBlock, setFocusedBlockId, isFocused }) => {
    // 컨텐츠 관리 리코일로 관리를 한다

    const [isEditing, setIsEditing] = useState(true);

    const editorRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
    const [imageSize, setImageSize] = useState(100);

    const {
      blockContent,
      setBlockContent,
      updateBlockContent,
      debouncedUpdateRef,
    } = useBlockContent({ block, updateBlock });

    const adjustEditorHeight = useCallback(() => {
      if (editorRef.current) {
        if (editorRef.current) {
          editorRef.current.style.height = "auto";
          editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
        }
      }
    }, []);

    // useLayoutEffect를 사용하여 DOM 업데이트 최적화
    useLayoutEffect(() => {
      adjustEditorHeight();
    }, [adjustEditorHeight, blockContent]);

    // 초기 블록 설정을 위한 효과
    useEffect(() => {
      const initializeBlock = () => {
        const currentContent = block.content;
        updateBlockContent(block.id, currentContent);
        // 리스트 초기값
        if (block.type === "list" && !block.content.trim()) {
          const initialContent = EDITOR_CONFIG.DEFAULT_LIST_MARKER;
          updateBlockContent(block.id, initialContent);
          updateBlock(block.id, initialContent, block.type);
        }
        // 넘버 리스트 초기값
        if (block.type === "numbered-list" && !block.content.trim()) {
          const initialContent = EDITOR_CONFIG.DEFAULT_NUMBERED_MARKER;
          updateBlockContent(block.id, initialContent);
          updateBlock(block.id, initialContent, block.type);
        }
        // 커서 위치
        if (isFocused && editorRef.current) {
          editorRef.current.focus();
        }
      };
      initializeBlock();
    }, [block.id, block.type, block.content, isFocused, updateBlock]);

    // 콘텐츠 변경 핸들러 최적화
    const handleContentChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newContent = e.target.value;
        updateBlockContent(block.id, newContent);

        debouncedUpdateRef.current?.(block.id, newContent, block.type);

        if (block.type === "image" && isValidImageUrl(newContent)) {
          setIsEditing(false);
        }
      },
      [block.id, block.type]
    );

    // 차트 데이터 입력
    const handleChartDataChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
          const newData = JSON.parse(e.target.value.trim());
          setChartData(newData);
          updateBlock(block.id, e.target.value.trim(), block.type);
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      },
      [block.id, block.type, updateBlock]
    );

    // 이미지 타입
    const isValidImageUrl = (url: string) => {
      return /\.(jpeg|jpg|gif|png|svg)$/.test(url);
    };

    const applyFormatting = useCallback(
      (format: "bold" | "italic" | "underline") => {
        const textarea = editorRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart ?? 0;
        const end = textarea.selectionEnd ?? 0;
        const currentContent = blockContent.get(block.id) || "";
        const selectedText = currentContent.substring(start, end);

        const formatMap = {
          bold: `**${selectedText}**`,
          italic: `*${selectedText}*`,
          underline: `__${selectedText}__`,
        };

        const formattedText = formatMap[format];
        const newContent =
          currentContent.substring(0, start) +
          formattedText +
          currentContent.substring(end);

        setBlockContent((prev) => new Map(prev).set(block.id, newContent));
        debouncedUpdateRef.current?.(block.id, newContent, block.type);

        requestAnimationFrame(() => {
          if (textarea) {
            textarea.selectionStart = start + formattedText.length;
            textarea.selectionEnd = start + formattedText.length;
            textarea.focus();
          }
        });
      },
      [block.id, block.type, blockContent]
    );

    const renderFormatButtons = useCallback(() => {
      if (
        !["paragraph", "heading1", "heading2", "heading3"].includes(block.type)
      ) {
        return null;
      }

      return (
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => applyFormatting("bold")}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => applyFormatting("italic")}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => applyFormatting("underline")}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Underline size={16} />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {isEditing ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      );
    }, [block.type, applyFormatting, isEditing]);

    const renderFormattedContent = (text: string) => {
      const htmlContent = text
        .replace(/__(.*?)__/g, "<u>$1</u>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

      return htmlContent.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          <br />
        </React.Fragment>
      ));
    };
    // 렌더링 최적화를 위한 메모이제이션
    const editorContent = useMemo(() => {
      return blockContent.get(block.id) ?? "";
    }, [blockContent, block.id]);

    const commonProps = useMemo(
      () => ({
        value: editorContent,
        onChange: handleContentChange,
        onFocus: () => setFocusedBlockId(block.id),
      }),
      [editorContent, handleContentChange, setFocusedBlockId, block.id]
    );
    const renderEditor = () => {
      const textareaProps = {
        ...commonProps,
        ref: editorRef as React.RefObject<HTMLTextAreaElement>,
      };

      const inputProps = {
        ...commonProps,
        ref: editorRef as React.RefObject<HTMLInputElement>,
      };
      switch (block.type) {
        case "paragraph":
          return (
            <>
              {renderFormatButtons()}
              {isEditing ? (
                <textarea
                  {...textareaProps}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              ) : (
                <div className="w-full p-2 border rounded-md">
                  {renderFormattedContent(editorContent)}
                </div>
              )}
            </>
          );

        case "heading1":
        case "heading2":
        case "heading3":
          return (
            <>
              {renderFormatButtons()}
              {isEditing ? (
                <textarea
                  {...textareaProps}
                  className={`w-full p-2 border rounded-md ${
                    block.type === "heading1"
                      ? "text-3xl font-bold"
                      : block.type === "heading2"
                      ? "text-2xl font-bold"
                      : "text-xl font-bold"
                  }`}
                  rows={1}
                />
              ) : (
                <div
                  className={`w-full p-2 border rounded-md ${
                    block.type === "heading1"
                      ? "text-3xl font-bold"
                      : block.type === "heading2"
                      ? "text-2xl font-bold"
                      : "text-xl font-bold"
                  }`}
                >
                  {renderFormattedContent(editorContent)}
                </div>
              )}
            </>
          );

        case "list":
        case "numbered-list":
          return (
            <ListEditor
              block={block}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              blockContent={blockContent}
              options={{
                maxLevel: 5,
                minItems: 1,
                maxItems: 1000,
                allowCollapse: true,
              }}
              className="w-full"
              onError={(error) => {
                console.error("List operation failed:", error);
              }}
            />
          );

        case "image":
          return (
            <div>
              {isEditing ? (
                <input
                  {...inputProps}
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter image URL..."
                />
              ) : (
                <div className="space-y-2">
                  <img
                    src={editorContent}
                    alt="Uploaded"
                    className="w-full h-auto rounded-md"
                    style={{ maxWidth: `${imageSize}%` }}
                  />
                  <ImageSizeSlider onChange={(size) => setImageSize(size)} />
                </div>
              )}
            </div>
          );

        case "code":
          return isEditing ? (
            <textarea
              {...textareaProps}
              className="w-full p-2 font-mono border rounded-md bg-gray-100"
              rows={5}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <div onClick={() => setIsEditing(true)}>
              <SyntaxHighlighter
                language="javascript"
                style={tomorrow}
                className="w-full p-2 font-mono border rounded-md bg-gray-100"
              >
                {editorContent}
              </SyntaxHighlighter>
            </div>
          );
        case "chart":
          return isEditing ? (
            <div>
              <textarea
                value={JSON.stringify(chartData, null, 2)}
                onChange={handleChartDataChange}
                className="w-full p-2 font-mono border rounded-md bg-gray-100"
                rows={10}
              />
              <button
                onClick={() => setIsEditing(false)}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                차트 미리보기
              </button>
            </div>
          ) : (
            <div onClick={() => setIsEditing(true)}>
              <Line data={chartData} />
            </div>
          );
        default:
          return null;
      }
    };
    return (
      <div className="mb-4 p-2 border rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{block.type}</span>
          <button
            onClick={() => removeBlock(block.id)}
            className="text-red-500"
          >
            <Trash2 />
          </button>
        </div>
        {renderEditor()}
      </div>
    );
  }
);

export default BlockEditor;
