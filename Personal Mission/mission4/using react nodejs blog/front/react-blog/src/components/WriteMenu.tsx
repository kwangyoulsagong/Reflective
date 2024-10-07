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
} from "react-icons/fa";
import TemplatePopup from "./TemplatePopup";

const WriteMenu = ({ onCommand }: WriteMenuProps) => {
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

  const getButtonClass = (buttonName: string) =>
    activeButton === buttonName
      ? "border-primary text-primary bg-gray-200"
      : "border-[#D4D4D4] text-[#D4D4D4] bg-white hover:bg-gray-100";

  const handleCodeButtonClick = () => {
    const codeTemplate =
      `<pre><code class="language-javascript"></code></pre>`.trim();
    onCommand(codeTemplate, "");
  };

  const handleTemplateClick = (template: string) => {
    onCommand(template, "");
    setShowTemplatePopup(false);
  };

  return (
    <div className="border-t-2 border-primary h-[70px] flex justify-start items-center gap-2 p-2 bg-white shadow-md">
      {/* Header Buttons */}
      {["h1", "h2", "h3", "h4"].map((header, index) => (
        <button
          key={header}
          className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
            header
          )}`}
          onClick={() =>
            handleButtonClick(
              header,
              `<header${index + 1}>`,
              `</header${index + 1}>`
            )
          }
        >
          {<FaHeading />} {index + 1}
        </button>
      ))}

      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* Text Style Buttons */}
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "bold"
        )}`}
        onClick={() => handleButtonClick("bold", "<strong>", "</strong>")}
      >
        <FaBold />
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "italic"
        )}`}
        onClick={() => handleButtonClick("italic", "<i>", "</i>")}
      >
        <FaItalic />
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "underline"
        )}`}
        onClick={() => handleButtonClick("underline", "<u>", "</u>")}
      >
        <FaUnderline />
      </button>

      {/* List Buttons */}
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "ol"
        )}`}
        onClick={() => handleButtonClick("ol", "<ol><li>", "</li></ol>")}
      >
        <FaListOl />
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "ul"
        )}`}
        onClick={() => handleButtonClick("ul", "<ul><li>", "</li></ul>")}
      >
        <FaListUl />
      </button>

      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* Other Buttons */}
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "image"
        )}`}
        onClick={() => alert("Image insertion not implemented")}
      >
        <FaImage />
      </button>

      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "code"
        )}`}
        onClick={handleCodeButtonClick}
      >
        <FaCode />
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "link"
        )}`}
        onClick={() => handleButtonClick("link", "<a href=''>", "</a>")}
      >
        <FaLink />
      </button>

      {/* Template Button */}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>
      <button
        className={`flex items-center justify-center rounded-lg w-[40px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "template"
        )}`}
        onClick={() => setShowTemplatePopup(true)}
      >
        <FaMagic />
      </button>

      {showTemplatePopup && (
        <TemplatePopup
          onClose={() => setShowTemplatePopup(false)}
          onTemplateSelect={handleTemplateClick}
        />
      )}
    </div>
  );
};

export default WriteMenu;
