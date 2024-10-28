import { FaFileAlt, FaCode, FaBook, FaPlane } from "react-icons/fa";

interface TemplatePopupProps {
  onClose: () => void;
  onTemplateSelect: (template: string) => void;
}

const TemplatePopup = ({ onClose, onTemplateSelect }: TemplatePopupProps) => {
  const templates = [
    {
      name: "자소서",
      icon: FaFileAlt,
      template: `
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
    `,
    },
    {
      name: "코드 스타일",
      icon: FaCode,
      template: `
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
    `,
    },
    {
      name: "회고",
      icon: FaBook,
      template: `
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
    `,
    },
    {
      name: "여행 일정",
      icon: FaPlane,
      template: `
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
    `,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-center space-x-8">
          {templates.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
              onClick={() => onTemplateSelect(item.template)}
            >
              <item.icon className="text-2xl mb-1" />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatePopup;
