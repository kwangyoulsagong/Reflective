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
} from "react-icons/fa";

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
      ? "border-primary text-primary bg-gray-200"
      : "border-[#D4D4D4] text-[#D4D4D4] bg-white hover:bg-gray-100";

  const handleCodeButtonClick = () => {
    const codeTemplate =
      `<pre><code class="language-javascript"></code></pre>`.trim();
    onCommand(codeTemplate, "");
  };

  // 자기소개서 템플릿 생성
  const handleResumeTemplateClick = () => {
    const resumeTemplate = `
<header1>자기소개서</header1>
<ul>
  <li><strong>기본 정보:</strong>
    <ul>
      <li>이름: [이름]</li>
      <li>연락처: [연락처]</li>
      <li>이메일: [이메일]</li>
    </ul>
  </li>
  <li><strong>학력:</strong>
    <ul>
      <li>[대학교] [전공] [졸업 연도]</li>
    </ul>
  </li>
  <li><strong>경력:</strong>
    <ul>
      <li>[회사명] [직무] [근무 기간]
        <ul>
          <li>[주요 업무 및 성과]</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>자기소개:</strong> [자신의 강점, 경험, 가치관 등]</li>
</ul>
    `.trim();
    onCommand(resumeTemplate, "");
  };

  // 코드 스타일 템플릿 생성
  const handleCodeStyleTemplateClick = () => {
    const codeStyleTemplate = `
<header1>코드 스타일 가이드</header1>
<ul>
  <li><strong>변수 명명 규칙:</strong>
    <ul>
      <li>변수명은 소문자와 카멜케이스를 사용합니다.</li>
    </ul>
  </li>
  <li><strong>함수 작성 규칙:</strong>
    <ul>
      <li>함수 이름은 동사 + 명사 형식으로 작성합니다.</li>
      <li>각 함수는 한 가지 기능만 수행해야 합니다.</li>
    </ul>
  </li>
  <li><strong>주석 작성 규칙:</strong>
    <ul>
      <li>중요한 로직에는 반드시 주석을 작성합니다.</li>
    </ul>
  </li>
</ul>
<pre><code class="language-javascript"></code></pre>
    `.trim();
    onCommand(codeStyleTemplate, "");
  };

  // 회고 템플릿 생성
  const handleRetrospectiveTemplateClick = () => {
    const retrospectiveTemplate = `
<header1>회고</header1>
<ul>
  <li><strong>프로젝트 이름:</strong> [프로젝트 이름]</li>
  <li><strong>잘된 점:</strong>
    <ul>
      <li>[잘된 점 1]</li>
      <li>[잘된 점 2]</li>
    </ul>
  </li>
  <li><strong>아쉬운 점:</strong>
    <ul>
      <li>[아쉬운 점 1]</li>
      <li>[아쉬운 점 2]</li>
    </ul>
  </li>
  <li><strong>개선할 점:</strong>
    <ul>
      <li>[개선할 점 1]</li>
      <li>[개선할 점 2]</li>
    </ul>
  </li>
</ul>
    `.trim();
    onCommand(retrospectiveTemplate, "");
  };

  // 여행 템플릿 생성
  const handleTravelTemplateClick = () => {
    const travelTemplate = `
<header1>여행 일정</header1>
<ul>
  <li><strong>여행 목적지:</strong> [목적지]</li>
  <li><strong>여행 날짜:</strong> [시작일] ~ [종료일]</li>
  <li><strong>일정:</strong>
    <ul>
      <li>[날짜 1] - [활동 내용]</li>
      <li>[날짜 2] - [활동 내용]</li>
      <li>[날짜 3] - [활동 내용]</li>
    </ul>
  </li>
  <li><strong>준비물:</strong>
    <ul>
      <li>[준비물 1]</li>
      <li>[준비물 2]</li>
      <li>[준비물 3]</li>
    </ul>
  </li>
  <li><strong>경비:</strong> [총 경비]</li>
</ul>
    `.trim();
    onCommand(travelTemplate, "");
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

      {/* Template Buttons */}
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>
      <button
        className={`flex items-center justify-center rounded-lg w-[60px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "resume"
        )}`}
        onClick={handleResumeTemplateClick}
      >
        <span className="font-bold">자소서</span>
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[60px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "codeStyle"
        )}`}
        onClick={handleCodeStyleTemplateClick}
      >
        <span className="font-bold">코드 스타일</span>
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[60px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "retrospective"
        )}`}
        onClick={handleRetrospectiveTemplateClick}
      >
        <span className="font-bold">회고</span>
      </button>
      <button
        className={`flex items-center justify-center rounded-lg w-[60px] h-[40px] transition-colors hover:bg-gray-200 ${getButtonClass(
          "travel"
        )}`}
        onClick={handleTravelTemplateClick}
      >
        <span className="font-bold">여행 일정</span>
      </button>
    </div>
  );
};

export default WriteMenu;
