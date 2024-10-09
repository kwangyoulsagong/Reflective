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
  FaImage,
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

const WriteMenu = ({ onCommand, onShowSchedulePlanner }: WriteMenuProps) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);

  const handleButtonClick = (
    buttonName: string,
    startTag: string,
    endTag: string = ""
  ) => {
    setActiveButton(buttonName);
    onCommand(startTag, endTag);
  };

  return (
    <div className="border-t-2 border-primary h-[70px] flex justify-start items-center gap-2 p-2 bg-white shadow-md">
      {/* Header Buttons */}
      {["h1", "h2", "h3", "h4"].map((header, index) => (
        <CommandButton
          key={header}
          icon={FaHeading}
          onClick={() =>
            handleButtonClick(
              header,
              `<header${index + 1}>`,
              `</header${index + 1}>`
            )
          }
          isActive={activeButton === header}
          label={`Insert ${header}`}
        />
      ))}

      {/* Divider */}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* Text Style Buttons */}
      {[
        {
          icon: FaBold,
          label: "Bold",
          startTag: "<strong>",
          endTag: "</strong>",
        },
        { icon: FaItalic, label: "Italic", startTag: "<i>", endTag: "</i>" },
        {
          icon: FaUnderline,
          label: "Underline",
          startTag: "<u>",
          endTag: "</u>",
        },
        {
          icon: FaListOl,
          label: "Ordered List",
          startTag: "<ol><li>",
          endTag: "</li></ol>",
        },
        {
          icon: FaListUl,
          label: "Unordered List",
          startTag: "<ul><li>",
          endTag: "</li></ul>",
        },
        { icon: FaImage, label: "Insert Image", startTag: "", endTag: "" }, // For later implementation
        {
          icon: FaCode,
          label: "Insert Code Block",
          startTag: "<pre><code class='language-javascript'></code></pre>",
          endTag: "",
        },
        {
          icon: FaLink,
          label: "Insert Link",
          startTag: "<a href=''>",
          endTag: "</a>",
        },
      ].map(({ icon, label, startTag, endTag }) => (
        <CommandButton
          key={label}
          icon={icon}
          onClick={() =>
            handleButtonClick(label.toLowerCase(), startTag, endTag)
          }
          isActive={activeButton === label.toLowerCase()}
          label={label}
        />
      ))}

      {/* Template Button */}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>
      <CommandButton
        icon={FaMagic}
        onClick={() => setShowTemplatePopup(true)}
        isActive={activeButton === "template"}
        label="Insert Template"
      />

      {/* Schedule Planner Button */}
      <CommandButton
        icon={FaCalendarAlt}
        onClick={onShowSchedulePlanner}
        isActive={activeButton === "schedule"}
        label="Open Schedule Planner"
      />

      {showTemplatePopup && (
        <TemplatePopup
          onClose={() => setShowTemplatePopup(false)}
          onTemplateSelect={(template) => {
            onCommand(template, "");
            setShowTemplatePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default WriteMenu;
