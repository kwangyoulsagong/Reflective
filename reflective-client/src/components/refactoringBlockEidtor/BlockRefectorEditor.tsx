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
import { Block, BlockEditorProps } from "../../types/types";
import { debounce } from "lodash";
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
import { useRecoilCallback, useRecoilState } from "recoil";
import { blockContentState } from "./recoil/blockContentState";
import { EDITOR_CONFIG, INITIAL_CHART_DATA } from "../../constants/blockEditor";
import ImageSizeSlider from "./ImageSize/ImageSize";
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
    const [blockContent, setBlockContent] = useRecoilState(blockContentState);
    const [isEditing, setIsEditing] = useState(true);
    const editorRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
    const [imageSize, setImageSize] = useState(100);
    // 디바운스 함수를 useRef로 관리하여 메모리 누수 방지
    const debouncedUpdateRef = useRef<ReturnType<typeof debounce>>();

    // 컴포넌트 마운트 시 디바운스 함수 생성
    useEffect(() => {
      debouncedUpdateRef.current = debounce(
        (id: string, content: string, type: Block["type"]) => {
          updateBlock(id, content, type);
        },
        EDITOR_CONFIG.DEBOUNCE_DELAY
      );

      // 클린업 함수에서 디바운스 함수 취소
      return () => {
        debouncedUpdateRef.current?.cancel();
      };
    }, [updateBlock]);

    // Recoil 상태 업데이트를 위한 콜백
    const updateBlockContent = useRecoilCallback(
      ({ set }) =>
        (id: string, content: string) => {
          set(blockContentState, (prev) => new Map(prev).set(id, content));
        },
      []
    );

    // 에디터 height 조정을 위한 별도의 함수
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

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (block.type === "list" || block.type === "numbered-list") {
          const textarea = e.currentTarget as HTMLTextAreaElement;
          const { selectionStart, selectionEnd, value } = textarea;
          const currentLine =
            value.substring(0, selectionStart).split("\n").pop() || "";
          const currentLineStart =
            value.lastIndexOf("\n", selectionStart - 1) + 1;

          if (e.key === "Enter") {
            // 현재 줄이 비어 있는지 확인
            const previousLineEmpty = currentLine.trim() === "";
            const isListLine =
              /^\d+\.\s*$/.test(currentLine) ||
              currentLine === EDITOR_CONFIG.DEFAULT_LIST_MARKER;

            if (previousLineEmpty || isListLine) {
              // Enter 두 번 누르거나 리스트 항목이 비었으면 상위 리스트로 이동
              e.preventDefault();

              // 들여쓰기를 줄임
              const newIndent =
                currentLine.match(/^\s*/)![0].slice(0, -2) || "";
              const newContent =
                value.substring(0, currentLineStart) +
                newIndent +
                value.substring(selectionEnd);

              setBlockContent((prev) =>
                new Map(prev).set(block.id, newContent)
              );
              updateBlock(block.id, newContent, block.type);

              // 부드러운 스크롤
              requestAnimationFrame(() => {
                if (textarea) {
                  const newPosition = currentLineStart + newIndent.length;
                  textarea.selectionStart = textarea.selectionEnd = newPosition;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }
              });
            } else {
              // 일반적으로 리스트 번호 증가
              e.preventDefault();
              const indent = currentLine.match(/^\s*/)?.[0] || "";

              let currentNumber = parseInt(
                currentLine.match(/^\d+/)?.[0] || "0"
              );
              if (isNaN(currentNumber) || currentNumber === 0) {
                // 현재 줄이 번호 리스트가 아니면 이전 줄의 번호를 추적
                const previousLines = value
                  .substring(0, selectionStart)
                  .split("\n");
                for (let i = previousLines.length - 1; i >= 0; i--) {
                  const match = previousLines[i].match(/^\s*(\d+)\./);
                  if (match) {
                    currentNumber = parseInt(match[1]);
                    break;
                  }
                }
              }
              const nextNumber =
                block.type === "numbered-list" ? currentNumber + 1 : 0;

              const listMarker =
                block.type === "numbered-list"
                  ? `${nextNumber}. ` // 번호 리스트의 경우 다음 번호로 증가
                  : EDITOR_CONFIG.DEFAULT_LIST_MARKER;
              const newContent =
                value.substring(0, selectionStart) +
                "\n" +
                indent +
                listMarker +
                value.substring(selectionEnd);

              setBlockContent((prev) =>
                new Map(prev).set(block.id, newContent)
              );
              debouncedUpdateRef.current?.(block.id, newContent, block.type);
              requestAnimationFrame(() => {
                if (textarea) {
                  const newPosition =
                    selectionStart + indent.length + listMarker.length + 1;
                  textarea.selectionStart = textarea.selectionEnd = newPosition;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }
              });
            }
          } else if (e.key === "Tab") {
            e.preventDefault();
            const newIndent = "  ";
            let newContent = value;

            if (block.type === "numbered-list") {
              // Tab 눌렀을 때 번호 리스트라면 다시 1로 초기화
              const newNumberedList = EDITOR_CONFIG.DEFAULT_NUMBERED_MARKER;
              newContent =
                value.substring(0, currentLineStart) +
                newIndent +
                newNumberedList +
                value.substring(selectionStart);

              setBlockContent((prev) =>
                new Map(prev).set(block.id, newContent)
              );
              debouncedUpdateRef.current?.(block.id, newContent, block.type);

              requestAnimationFrame(() => {
                if (textarea) {
                  const newPosition =
                    currentLineStart +
                    newIndent.length +
                    newNumberedList.length;
                  textarea.selectionStart = textarea.selectionEnd = newPosition;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }
              });
            } else {
              newContent =
                value.substring(0, currentLineStart) +
                newIndent +
                value.substring(currentLineStart);

              setBlockContent((prev) =>
                new Map(prev).set(block.id, newContent)
              );
              debouncedUpdateRef.current?.(block.id, newContent, block.type);

              requestAnimationFrame(() => {
                if (textarea) {
                  const newPosition = selectionStart + newIndent.length;
                  textarea.selectionStart = textarea.selectionEnd = newPosition;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }
              });
            }
          }
        }
      },
      [block.id, block.type]
    );
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

    const renderListContent = useMemo(() => {
      const content = blockContent.get(block.id) || "";
      const lines = content.split("\n");
      return lines
        .map((line: string, index: number) => {
          const isNumbered = block.type === "numbered-list";
          const listItem = isNumbered ? line.replace(/^\d+\.\s*/, "") : line;
          const marker = isNumbered
            ? `${index + 1}. `
            : EDITOR_CONFIG.DEFAULT_LIST_MARKER;
          return `<div key=${index}>${marker}${listItem}</div>`;
        })
        .join("");
    }, [blockContent, block.id, block.type]);

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
            <>
              {renderFormatButtons()}
              {isEditing ? (
                <textarea
                  {...textareaProps}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 border rounded-md"
                  rows={5}
                  placeholder="List item (press Enter for new item, Tab for indentation)"
                />
              ) : (
                <div
                  className="w-full p-2 border rounded-md"
                  dangerouslySetInnerHTML={{
                    __html: renderListContent(editorContent),
                  }}
                />
              )}
            </>
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
