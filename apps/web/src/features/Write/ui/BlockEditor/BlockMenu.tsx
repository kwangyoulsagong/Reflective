import React, { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Type,
  ListOrdered,
  Image,
  Code,
  BarChart,
} from "lucide-react";
import { Block } from "../../model/BlockEditor/BlockEditor";

interface BlockMenuProps {
  onAddBlock: (type: Block["type"]) => void;
}

const BlockMenu: React.FC<BlockMenuProps> = ({ onAddBlock }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const menuItems: {
    type: Block["type"];
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    subLabel: string;
  }[] = [
    {
      icon: PlusCircle,
      label: "텍스트",
      subLabel: "일반 텍스트 추가",
      type: "paragraph",
    },
    { icon: Type, label: "제목 1", subLabel: "제목 1 추가", type: "heading1" },
    { icon: Type, label: "제목 2", subLabel: "제목 2 추가", type: "heading2" },
    { icon: Type, label: "제목 3", subLabel: "제목 3 추가", type: "heading3" },
    {
      icon: ListOrdered,
      label: "번호 매기기 목록",
      subLabel: "번호가 매겨진 목록 추가",
      type: "numbered-list",
    },
    {
      icon: ListOrdered,
      label: "글머리 기호 목록",
      subLabel: "글머리 기호 목록 추가",
      type: "list",
    },
    { icon: Image, label: "이미지", subLabel: "이미지 추가", type: "image" },
    { icon: Code, label: "코드", subLabel: "코드 블록 추가", type: "code" },
    { icon: BarChart, label: "차트", subLabel: "차트 추가", type: "chart" },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setPopupPosition({
          x: mousePositionRef.current.x,
          y: mousePositionRef.current.y - 400,
        });
        setIsPopupOpen(true);
      } else if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Update the mouse position in the ref
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listeners on cleanup
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (type: Block["type"]) => {
    onAddBlock(type);
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* 상단 고정 메뉴 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {menuItems.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onAddBlock(type)}
            className="flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors border-[#D4D4D4] text-[#D4D4D4] bg-white hover:border-primary hover:text-primary hover:bg-gray-200"
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      {/* '/' 키로 활성화되는 팝업 메뉴 */}
      {isPopupOpen && (
        <div
          ref={menuRef}
          className="fixed z-10 w-64 bg-gray-800 rounded-md shadow-lg"
          style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-400">
              블록 유형을 선택하세요.
            </div>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-start w-full px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={() => handleItemClick(item.type)}
              >
                <div className="w-5 h-5">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div>{item.label}</div>
                  <div className="text-xs text-gray-400">{item.subLabel}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlockMenu;
