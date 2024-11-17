import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  Trash2,
  Bold,
  Italic,
  Underline,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Block, BlockEditorProps, ListItem } from "../../types/types";
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
    const [listItems, setListItems] = useState<ListItem[]>([]);
    const editorRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLInputElement }>({});
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

    // 리스트 데이터 직렬화
    const serializeListItems = useCallback((items: ListItem[]): string => {
      return JSON.stringify(items);
    }, []);

    // 리스트 데이터 역직렬화
    const deserializeListItems = useCallback((content: string): ListItem[] => {
      try {
        return JSON.parse(content);
      } catch {
        return [];
      }
    }, []);
    // 초기 리스트 데이터 로드
    useEffect(() => {
      const content = blockContent.get(block.id) || "";
      if (block.type === "list" || block.type === "numbered-list") {
        try {
          const parsedItems = deserializeListItems(content);
          setListItems(
            parsedItems.length > 0
              ? parsedItems
              : [
                  {
                    id: generateId(),
                    content: "",
                    level: 0,
                    isCollapsed: false,
                  },
                ]
          );
        } catch {
          setListItems([
            {
              id: generateId(),
              content: "",
              level: 0,
              isCollapsed: false,
            },
          ]);
        }
      }
    }, [block.id, block.type]);
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

    // 새로운 아이템 ID 생성
    const generateId = () => `item-${Math.random().toString(36).substr(2, 9)}`;

    // 아이템 번호 계산
    const calculateNumber = useCallback(
      (items: ListItem[], currentIndex: number): string => {
        const currentItem = items[currentIndex];
        if (block.type !== "numbered-list") return "•";

        let number = 1;
        for (let i = 0; i < currentIndex; i++) {
          if (items[i].level === currentItem.level) {
            number++;
          }
        }
        return number.toString() + ".";
      },
      [block.type]
    );

    // 리스트 아이템 추가
    const addListItem = useCallback((afterId: string, level: number) => {
      const newItem: ListItem = {
        id: generateId(),
        content: "",
        level,
        isCollapsed: false,
      };

      setListItems((prev) => {
        const index = prev.findIndex((item) => item.id === afterId);
        const newItems = [...prev];
        newItems.splice(index + 1, 0, newItem);

        // 리코일 상태 업데이트
        const serializedContent = serializeListItems(newItems);
        updateBlockContent(block.id, serializedContent);
        debouncedUpdateRef.current?.(block.id, serializedContent, block.type);
        return newItems;
      });

      setTimeout(() => {
        itemRefs.current[newItem.id]?.focus();
      }, 0);
    }, []);

    // 리스트 아이템 제거
    const removeListItem = useCallback((id: string) => {
      setListItems((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        if (index === -1) return prev;

        const newItems = [...prev];
        newItems.splice(index, 1);

        // 리코일 상태 업데이트
        const serializedContent = serializeListItems(newItems);
        updateBlockContent(block.id, serializedContent);
        debouncedUpdateRef.current?.(block.id, serializedContent, block.type);

        if (index > 0) {
          setTimeout(() => {
            itemRefs.current[prev[index - 1].id]?.focus();
          }, 0);
        }

        return newItems;
      });
    }, []);

    // 들여쓰기 증가
    const increaseIndent = useCallback((id: string) => {
      setListItems((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        if (index === 0) return prev;

        const prevItem = prev[index - 1];
        const currentItem = prev[index];

        if (currentItem.level >= prevItem.level + 1) return prev;

        const newItems = [...prev];
        newItems[index] = { ...currentItem, level: currentItem.level + 1 };

        // 리코일 상태 업데이트
        const serializedContent = serializeListItems(newItems);
        updateBlockContent(block.id, serializedContent);
        debouncedUpdateRef.current?.(block.id, serializedContent, block.type);
        return newItems;
      });
    }, []);

    // 들여쓰기 감소
    const decreaseIndent = useCallback((id: string) => {
      setListItems((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        const currentItem = prev[index];

        if (currentItem.level === 0) return prev;

        const newItems = [...prev];
        newItems[index] = { ...currentItem, level: currentItem.level - 1 };

        // 리코일 상태 업데이트
        const serializedContent = serializeListItems(newItems);
        updateBlockContent(block.id, serializedContent);
        debouncedUpdateRef.current?.(block.id, serializedContent, block.type);

        return newItems;
      });
    }, []);

    // 리스트 아이템 키보드 이벤트 처리
    const handleListKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        const currentItem = listItems.find((item) => item.id === id);
        if (!currentItem) return;

        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();

          if (currentItem.content.trim() === "") {
            if (currentItem.level > 0) {
              decreaseIndent(id);
            } else {
              removeListItem(id);
            }
          } else {
            addListItem(id, currentItem.level);
          }
        } else if (e.key === "Tab") {
          e.preventDefault();
          if (e.shiftKey) {
            decreaseIndent(id);
          } else {
            increaseIndent(id);
          }
        } else if (e.key === "Backspace" && currentItem.content === "") {
          e.preventDefault();
          removeListItem(id);
        }
      },
      [listItems, addListItem, removeListItem, increaseIndent, decreaseIndent]
    );

    // 리스트 아이템 내용 변경 처리
    const handleListItemChange = useCallback((id: string, content: string) => {
      setListItems((prev) => {
        const newItems = prev.map((item) =>
          item.id === id ? { ...item, content } : item
        );
        // 리코일 상태 업데이트
        const serializedContent = serializeListItems(newItems);
        updateBlockContent(block.id, serializedContent);
        debouncedUpdateRef.current?.(block.id, serializedContent, block.type);
        return newItems;
      });
    }, []);

    // 리스트 렌더링
    const renderList = useCallback(() => {
      return (
        <div className="space-y-1">
          {listItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start group"
              style={{ marginLeft: `${item.level * 24}px` }}
            >
              <div className="flex items-center mr-2 mt-2">
                {item.isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500 min-w-[24px]">
                    {calculateNumber(listItems, index)}
                  </span>
                  <input
                    ref={(el) => {
                      if (el) itemRefs.current[item.id] = el;
                    }}
                    value={item.content}
                    onChange={(e) =>
                      handleListItemChange(item.id, e.target.value)
                    }
                    onKeyDown={(e) => handleListKeyDown(e, item.id)}
                    className="flex-1 px-2 py-1 bg-transparent outline-none border-none focus:ring-1 focus:ring-blue-500 rounded"
                    placeholder="List item..."
                  />
                </div>
              </div>
            </div>
          ))}
          {listItems.length === 0 && (
            <button
              onClick={() => addListItem(generateId(), 0)}
              className="text-gray-500 hover:text-gray-700"
            >
              Add first item...
            </button>
          )}
        </div>
      );
    }, [
      listItems,
      calculateNumber,
      handleListItemChange,
      handleListKeyDown,
      addListItem,
    ]);
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
          return renderList();

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
