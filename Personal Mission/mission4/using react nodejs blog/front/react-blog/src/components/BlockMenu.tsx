import React from "react";
import { PlusCircle, Type, ListOrdered, Image, Code } from "lucide-react";

interface BlockMenuProps {
  onAddBlock: (type: string) => void;
  onFormatText: (format: string) => void;
  activeButton: string; // Add activeButton prop to track the active state
}

const BlockMenu: React.FC<BlockMenuProps> = ({ onAddBlock, activeButton }) => {
  const blockTypes = [
    { type: "paragraph", icon: PlusCircle, label: "Text" },
    { type: "heading", icon: Type, label: "Heading" },
    { type: "list", icon: ListOrdered, label: "List" },
    { type: "image", icon: Image, label: "Image" },
    { type: "code", icon: Code, label: "Code" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {blockTypes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onAddBlock(type)}
          className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors ${
            activeButton === type
              ? "border-primary text-primary bg-gray-200" // Active button styles
              : "border-[#D4D4D4] text-[#D4D4D4] bg-white hover:border-primary hover:text-primary hover:bg-gray-200" // Inactive button styles with hover
          }`}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default BlockMenu;
