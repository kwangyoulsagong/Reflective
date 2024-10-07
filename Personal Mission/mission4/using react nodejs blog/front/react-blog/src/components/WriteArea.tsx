import React, { useState, useRef, useEffect } from "react";
import { WriteAreaProps } from "../types/types";
import { Menu, Type, CheckSquare, List, ListOrdered, X } from "lucide-react";

const COMMANDS = [
  {
    key: "text",
    icon: Menu,
    label: "텍스트",
    subLabel: "텍스트를 사용해 글쓰기를 시작하세요.",
  },
  {
    key: "header1",
    icon: Type,
    label: "제목 1",
    subLabel: "제목 (대)",
    tag: "<header1>",
    endTag: "</header1>",
  },
  {
    key: "header2",
    icon: Type,
    label: "제목 2",
    subLabel: "제목 (중)",
    tag: "<header2>",
    endTag: "</header2>",
  },
  {
    key: "header3",
    icon: Type,
    label: "제목 3",
    subLabel: "제목 (소)",
    tag: "<header3>",
    endTag: "</header3>",
  },
  {
    key: "todo",
    icon: CheckSquare,
    label: "할 일 목록",
    subLabel: "할 일 목록으로 작업을 추적하세요.",
    tag: "<ul class='todo-list'>",
    endTag: "</ul>",
  },
  {
    key: "ul",
    icon: List,
    label: "글머리 기호 목록",
    subLabel: "간단한 글머리 기호 목록을 생성하세요.",
    tag: "<ul><li>",
    endTag: "</li></ul>",
  },
  {
    key: "ol",
    icon: ListOrdered,
    label: "번호 매기기 목록",
    subLabel: "번호가 매겨진 목록을 생성하세요.",
    tag: "<ol><li>",
    endTag: "</li></ol>",
  },
];

const EnhancedWriteArea = ({
  inputRef,
  value,
  onChange,
  onKeyDown,
}: WriteAreaProps) => {
  const [showCommands, setShowCommands] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);
  const commandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandsRef.current &&
        !commandsRef.current.contains(event.target as Node)
      ) {
        setShowCommands(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "/") {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const lineHeight = parseInt(getComputedStyle(e.currentTarget).lineHeight);
      const lines = e.currentTarget.value
        .substr(0, e.currentTarget.selectionStart)
        .split("\n");
      const currentLine = lines.length;

      setMenuPosition({
        x: rect.left + 10,
        y: rect.top + currentLine * lineHeight - e.currentTarget.scrollTop,
      });
      setCursorPosition(e.currentTarget.selectionStart);
      setShowCommands(true);
    } else if (e.key === "Escape") {
      setShowCommands(false);
    }

    onKeyDown && onKeyDown(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  const insertCommand = (startTag: string, endTag: string) => {
    if (inputRef.current) {
      const newValue =
        value.substring(0, cursorPosition) +
        startTag +
        endTag +
        value.substring(cursorPosition);

      onChange({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLTextAreaElement>);

      // Set cursor position
      const newCursorPosition = cursorPosition + startTag.length;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newCursorPosition;
          inputRef.current.selectionEnd = newCursorPosition;
          inputRef.current.focus();
        }
      }, 0);
    }
    setShowCommands(false);
  };

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={inputRef}
        value={value}
        className="w-full h-full p-2 outline-none resize-none font-mono"
        placeholder="글 작성하기 ... (명령어를 사용하려면 '/'를 입력하세요)"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
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
                onClick={() =>
                  command.tag && insertCommand(command.tag, command.endTag)
                }
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
    </div>
  );
};

export default EnhancedWriteArea;
