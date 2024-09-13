import { useState } from "react";
import image from "../assets/image.png";
import { WriteMenuProps } from "../types/types";

const WriteMenu = ({ onCommand }: WriteMenuProps) => {
  const [activeButton, setActiveButton] = useState<string>("");

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
      ? "border-primary text-primary"
      : "border-[#D4D4D4] text-[#D4D4D4]";
  const handleCodeButtonClick = () => {
    const codeTemplate = `
    <pre><code class="language-javascript"></code></pre>`.trim();
    onCommand(codeTemplate, "");
  };

  return (
    <div className="border-t-2 border-primary h-[70px] flex justify-center items-center gap-3">
      {/* 헤더 버튼 */}
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[12px] ${getButtonClass(
          "h1"
        )}`}
        onClick={() => handleButtonClick("h1", "<header1>", "</header1>")}
      >{`<h1>`}</button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[12px] ${getButtonClass(
          "h2"
        )}`}
        onClick={() => handleButtonClick("h2", "<header2>", "</header2>")}
      >{`<h2>`}</button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[12px] ${getButtonClass(
          "h3"
        )}`}
        onClick={() => handleButtonClick("h3", "<header3>", "</header3>")}
      >{`<h3>`}</button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[12px] ${getButtonClass(
          "h4"
        )}`}
        onClick={() => handleButtonClick("h4", "<header4>", "</header4>")}
      >{`<h4>`}</button>
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* 글꼴 스타일 버튼 */}
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "bold"
        )}`}
        onClick={() => handleButtonClick("bold", "<strong>", "</strong>")}
      >
        B
      </button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] italic ${getButtonClass(
          "italic"
        )}`}
        onClick={() => handleButtonClick("italic", "<i>", "</i>")}
      >
        I
      </button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "underline"
        )}`}
        onClick={() => handleButtonClick("underline", "<u>", "</u>")}
      >
        U
      </button>

      {/* 리스트 버튼 */}
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "ol"
        )}`}
        onClick={() => handleButtonClick("ol", "<ol><li>", "</li></ol>")}
      >
        OL
      </button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "ul"
        )}`}
        onClick={() => handleButtonClick("ul", "<ul><li>", "</li></ul>")}
      >
        UL
      </button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "li"
        )}`}
        onClick={() => handleButtonClick("li", "<li>", "</li>")}
      >
        LI
      </button>

      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* 기타 버튼 */}
      <div className="flex justify-center items-center cursor-pointer rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]">
        <img src={image} alt="image" />
      </div>

      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[20px] ${getButtonClass(
          "code"
        )}`}
        onClick={handleCodeButtonClick}
      >{`<>`}</button>
      <button
        className={`border rounded-[5px] w-[40px] h-[40px] text-[18px] ${getButtonClass(
          "link"
        )}`}
        onClick={() => handleButtonClick("link", "<a href=''>", "</a>")}
      >
        link
      </button>
    </div>
  );
};

export default WriteMenu;
