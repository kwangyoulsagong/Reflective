import { useState } from "react";
import { WriteMenuProps } from "../types/types";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaCode,
  FaLink,
  FaHeading,
  FaMagic,
  FaCalendarAlt,
} from "react-icons/fa";
import TemplatePopup from "./TemplatePopup";

interface CommandButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  isActive: boolean;
  label: string;
}

const CommandButton = ({
  icon: Icon,
  onClick,
  isActive,
  label,
}: CommandButtonProps) => (
  <button
    className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${
      isActive
        ? "border-primary text-primary bg-gray-200"
        : "border-[#D4D4D4] text-[#D4D4D4] bg-white"
    }`}
    onClick={onClick}
    aria-label={label}
  >
    <Icon />
  </button>
);

const WriteMenu = ({ onCommand }: WriteMenuProps) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);

  const handleButtonClick = (buttonName: string, markdown: string) => {
    setActiveButton(buttonName);
    onCommand(markdown);
  };

  const handleShowSchedulePlanner = () => {
    setActiveButton("schedule");
    // Schedule Planner의 로직을 추가해야 할 수도 있습니다.
  };

  return (
    <div className="border-t-2 border-primary h-[70px] flex justify-start items-center gap-2 p-2 bg-white shadow-md">
      {["h1", "h2", "h3", "h4"].map((header) => (
        <CommandButton
          key={header}
          icon={FaHeading}
          onClick={() => handleButtonClick(header, `# ${header} 제목`)}
          isActive={activeButton === header}
          label={`Insert ${header}`}
        />
      ))}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>
      {[
        { icon: FaBold, label: "Bold", markdown: "**텍스트**" },
        { icon: FaItalic, label: "Italic", markdown: "*텍스트*" },
        { icon: FaUnderline, label: "Underline", markdown: "~~텍스트~~" },
        { icon: FaListOl, label: "Ordered List", markdown: "1. 항목" },
        { icon: FaListUl, label: "Unordered List", markdown: "- 항목" },
        {
          icon: FaCode,
          label: "Insert Code Block",
          markdown: "```\n코드\n```",
        },
        { icon: FaLink, label: "Insert Link", markdown: "[링크 텍스트](URL)" },
      ].map(({ icon, label, markdown }) => (
        <CommandButton
          key={label}
          icon={icon}
          onClick={() => handleButtonClick(label.toLowerCase(), markdown)}
          isActive={activeButton === label.toLowerCase()}
          label={label}
        />
      ))}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>
      <CommandButton
        icon={FaMagic}
        onClick={() => setShowTemplatePopup(true)}
        isActive={activeButton === "template"}
        label="Insert Template"
      />
      <CommandButton
        icon={FaCalendarAlt}
        onClick={handleShowSchedulePlanner}
        isActive={activeButton === "schedule"}
        label="Insert Schedule"
      />
      {showTemplatePopup && (
        <TemplatePopup
          onClose={() => setShowTemplatePopup(false)}
          onTemplateSelect={(template) => {
            onCommand(template);
            setShowTemplatePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default WriteMenu;
