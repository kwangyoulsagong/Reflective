import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "prismjs/themes/prism.css"; // 원하는 테마로 변경 가능

// Prism.js 언어별 지원
import "prismjs/components/prism-javascript"; // 필요에 따라 추가
import {
  Menu,
  Type,
  CheckSquare,
  List,
  ListOrdered,
  X,
  Calendar,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import WriteUpload from "../components/WriteUpload";
import SchedulePlanner from "../components/schedulePlanner";

const COMMANDS = [
  {
    key: "text",
    icon: Menu,
    label: "텍스트",
    subLabel: "텍스트를 사용해 글쓰기를 시작하세요.",
    type: "paragraph",
  },
  {
    key: "header1",
    icon: Type,
    label: "제목 1",
    subLabel: "제목 (대)",
    type: "heading1",
  },
  {
    key: "header2",
    icon: Type,
    label: "제목 2",
    subLabel: "제목 (중)",
    type: "heading2",
  },
  {
    key: "header3",
    icon: Type,
    label: "제목 3",
    subLabel: "제목 (소)",
    type: "heading3",
  },
  {
    key: "todo",
    icon: CheckSquare,
    label: "할 일 목록",
    subLabel: "할 일 목록으로 작업을 추적하세요.",
    type: "todo",
  },
  {
    key: "ul",
    icon: List,
    label: "글머리 기호 목록",
    subLabel: "간단한 글머리 기호 목록을 생성하세요.",
    type: "bullet",
  },
  {
    key: "ol",
    icon: ListOrdered,
    label: "번호 매기기 목록",
    subLabel: "번호가 매겨진 목록을 생성하세요.",
    type: "numbered",
  },
  { key: "code", icon: ListOrdered, label: "코드", type: "code" },
];

const NotionLikeWrite = () => {
  const { state } = useLocation();
  const isEdit = state?.post ? true : false;

  const [title, setTitle] = useState(isEdit ? state.post.title : "");
  const [blocks, setBlocks] = useState([
    { id: "1", type: "paragraph", content: isEdit ? state.post.contents : "" },
  ]);
  const [activeBlockId, setActiveBlockId] = useState("1");
  const [showCommands, setShowCommands] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [showSchedulePlanner, setShowSchedulePlanner] = useState(false);

  const blockRefs = useRef({});
  const commandsRef = useRef(null);

  useEffect(() => {
    const activeBlock = blockRefs.current[activeBlockId];
    if (activeBlock) {
      activeBlock.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(activeBlock);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [activeBlockId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commandsRef.current && !commandsRef.current.contains(event.target)) {
        setShowCommands(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e, blockId) => {
    const currentBlock = blocks.find((b) => b.id === blockId);
    const index = blocks.findIndex((b) => b.id === blockId);

    if (e.key === "Tab" && currentBlock.type === "code") {
      e.preventDefault();
      document.execCommand("insertText", false, "  ");
    } else if (e.key === "/" && !showCommands) {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      setMenuPosition({ x: rect.left, y: rect.bottom + window.scrollY });
      setShowCommands(true);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (["numbered", "bullet"].includes(currentBlock.type)) {
        // 리스트 항목에서 엔터를 눌렀을 때
        const newItem = ""; // 새로운 항목의 초기 내용
        const newBlockId = Date.now().toString(); // 새 항목의 ID 생성
        setBlocks((prevBlocks) =>
          prevBlocks.map((block) =>
            block.id === blockId
              ? { ...block, items: [...block.items, newItem] }
              : block
          )
        );

        // 방금 추가된 항목에 포커스 설정
        setActiveBlockId(newBlockId);
      } else {
        // 현재 블록이 리스트가 아닐 경우, 새로운 블록 생성
        const newBlock = {
          id: Date.now().toString(),
          type:
            currentBlock.type === "paragraph" ? "paragraph" : currentBlock.type,
          content: "",
          items: [],
        };
        setBlocks([
          ...blocks.slice(0, index + 1),
          newBlock,
          ...blocks.slice(index + 1),
        ]);
        setActiveBlockId(newBlock.id);
      }
    } else if (
      e.key === "Backspace" &&
      blocks.length > 1 &&
      !currentBlock.content &&
      currentBlock.items.length === 0
    ) {
      e.preventDefault();
      if (index > 0) {
        if (["bullet", "numbered", "todo"].includes(currentBlock.type)) {
          setBlocks(
            blocks.map((b) =>
              b.id === blockId ? { ...b, type: "paragraph", items: [] } : b
            )
          );
        } else {
          const newBlocks = blocks.filter((b) => b.id !== blockId);
          setBlocks(newBlocks);
          setActiveBlockId(blocks[index - 1].id);
        }
      }
    }
  };

  const updateBlockContent = (blockId, newContent, cursorPosition) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, content: newContent } : block
      )
    );

    // 커서 위치 복원
    setTimeout(() => {
      const block = blockRefs.current[blockId];
      if (block) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(block.childNodes[0] || block, cursorPosition);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 0);
  };

  const handleContentChange = (e, blockId) => {
    const newContent = e.target.innerText;
    const cursorPosition = getCaretPosition(e.target);
    updateBlockContent(blockId, newContent, cursorPosition);
  };

  const getCaretPosition = (element) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  };

  const handleBlockFocus = (blockId) => {
    setActiveBlockId(blockId);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newBlocks = Array.from(blocks);
    const [reorderedItem] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedItem);

    setBlocks(newBlocks);
  };
  useEffect(() => {
    blocks.forEach((block) => {
      if (block.type === "code" && blockRefs.current[block.id]) {
        Prism.highlightElement(blockRefs.current[block.id]);
      }
    });
  }, [blocks]);

  const renderCodeBlock = (block) => {
    return (
      <pre className="mb-2 relative">
        <code
          ref={(el) => (blockRefs.current[block.id] = el)}
          className="language-javascript block whitespace-pre-wrap"
          contentEditable={true}
          onKeyDown={(e) => handleKeyDown(e, block.id)}
          onFocus={() => handleBlockFocus(block.id)}
          onInput={(e) => handleCodeBlockChange(e, block.id)} // 코드 블록 내용 변경 시
          suppressContentEditableWarning={true}
        >
          {block.content} {/* 상태에서 직접 가져온 내용을 렌더링 */}
        </code>
      </pre>
    );
  };

  const handleCodeBlockChange = (e, blockId) => {
    const newContent = e.target.innerText; // 사용자가 입력한 내용을 가져옴
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, content: newContent } : block
      )
    );
  };

  const renderBlock = (block) => {
    const commonProps = {
      ref: (el) => (blockRefs.current[block.id] = el),
      contentEditable: true,
      onKeyDown: (e) => handleKeyDown(e, block.id),
      onFocus: () => handleBlockFocus(block.id),
      onInput: (e) => handleContentChange(e, block.id),
      className: "outline-none w-full",
      suppressContentEditableWarning: true,
      dangerouslySetInnerHTML: { __html: block.content },
    };

    switch (block.type) {
      case "code":
        return renderCodeBlock(block);
      case "heading1":
        return <h1 {...commonProps} className="text-4xl font-bold mb-4" />;
      case "heading2":
        return <h2 {...commonProps} className="text-3xl font-semibold mb-3" />;
      case "heading3":
        return <h3 {...commonProps} className="text-2xl font-medium mb-2" />;
      case "bullet":
        return (
          <ul className="list-disc list-inside mb-2">
            {block.items.map((item, index) => (
              <li
                key={index}
                {...commonProps}
                onInput={(e) => handleContentChange(e, block.id, index)}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        );
      case "numbered":
        return (
          <ol className="list-decimal list-inside mb-2">
            {block.items.map((item, index) => (
              <li
                key={index}
                {...commonProps}
                onInput={(e) => handleContentChange(e, block.id, index)}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ol>
        );
      case "todo":
        return (
          <div className="flex items-start mb-2">
            <input type="checkbox" className="mr-2 mt-1" />
            <div {...commonProps} className="flex-grow" />
          </div>
        );
      default:
        return <p {...commonProps} className="mb-2" />;
    }
  };
  const handleCommandClick = (type) => {
    setBlocks(
      blocks.map((block) =>
        block.id === activeBlockId
          ? {
              ...block,
              type,
              content: type === "code" ? "" : block.content,
              items: ["numbered", "bullet"].includes(type) ? [""] : [],
            }
          : block
      )
    );
    setShowCommands(false);
  };

  const handleSubmit = () => {
    const content = blocks
      .map((block) => `<${block.type}>${block.content}</${block.type}>`)
      .join("");
    const data = {
      title,
      contents: content,
      category: isEdit ? state.post.category : "",
      thumbnail: isEdit ? state.post.thumbnail : "",
      like_count: isEdit ? state.post.like_count : 0,
    };
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleShowSchedulePlanner = () => {
    setShowSchedulePlanner(true);
  };

  const handleCloseSchedulePlanner = () => {
    setShowSchedulePlanner(false);
  };

  const handleScheduleInsert = (schedule) => {
    const scheduleText = `📅 ${
      schedule.title
    }\n시작: ${schedule.start.toLocaleString()}\n종료: ${schedule.end.toLocaleString()}`;
    const newBlock = {
      id: Date.now().toString(),
      type: "paragraph",
      content: scheduleText,
    };
    setBlocks([...blocks, newBlock]);
    setShowSchedulePlanner(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col w-full max-w-7xl">
        <input
          value={title}
          placeholder="제목을 입력해주세요"
          className="text-4xl font-bold mb-4 p-2 outline-none border-b"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mb-4 flex space-x-2">
          {COMMANDS.map((command) => (
            <button
              key={command.key}
              onClick={() => handleCommandClick(command.type)}
              className="p-2 rounded hover:bg-gray-200"
            >
              <command.icon size={20} />
            </button>
          ))}
          <button
            onClick={handleShowSchedulePlanner}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Calendar size={20} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-300px)]">
          <div className="flex-1 p-4 border rounded-lg overflow-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="blocks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {blocks.map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={block.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="block relative group bg-white rounded-lg shadow-sm mb-2 p-3"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-6 -ml-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Menu className="w-4 h-4 text-gray-400" />
                            </div>
                            {renderBlock(block)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold"
          >
            작성하기
          </button>
        </div>
      </section>
      {showCommands && (
        <div
          ref={commandsRef}
          className="fixed bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden w-[280px]"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="font-semibold">텍스트</span>
            <button
              onClick={() => setShowCommands(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="py-2">
            {COMMANDS.map((command) => (
              <button
                key={command.key}
                className="w-full px-3 py-2 flex items-start hover:bg-gray-800 transition-colors duration-150"
                onClick={() => handleCommandClick(command.type)}
              >
                <div className="mr-3 mt-1">
                  <command.icon size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium">{command.label}</div>
                  <div className="text-sm text-gray-400">
                    {command.subLabel}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {openModal && (
        <WriteUpload
          data={{
            title,
            contents: blocks
              .map((block) => `<${block.type}>${block.content}</${block.type}>`)
              .join(""),
            category: isEdit ? state.post.category : "",
            thumbnail: isEdit ? state.post.thumbnail : "",
            like_count: isEdit ? state.post.like_count : 0,
          }}
          onClose={closeModal}
          isEdit={isEdit}
        />
      )}
      {showSchedulePlanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-3/4">
            <SchedulePlanner
              onClose={handleCloseSchedulePlanner}
              onScheduleSelect={handleScheduleInsert}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default NotionLikeWrite;
