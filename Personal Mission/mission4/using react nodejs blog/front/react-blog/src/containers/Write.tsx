import { useEffect, useRef, useState } from "react";
import WriteArea from "../components/WriteArea";
import WriteMenu from "../components/WriteMenu";
import Preview from "./Preview";
import WriteUpload from "../components/WriteUpload";
import { Event, SavePostType } from "../types/types";
import { useLocation } from "react-router-dom";
import SchedulePlanner from "../components/schedulePlanner";
const Write = () => {
  // ref 선언
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { state } = useLocation();
  const isEdit = state?.post ? true : false;

  // 기존 데이터를 상태로 설정 (수정 모드일 경우 해당 데이터를 사용)
  const [title, setTitle] = useState(isEdit ? state.post.title : "");
  const [content, setContent] = useState(isEdit ? state.post.contents : "");
  const [previewContent, setPreviewContent] = useState("");
  const [data, setData] = useState<SavePostType>({
    title: "",
    contents: "",
    category: "",
    thumbnail: "",
    like_count: 0,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSchedulePlanner, setShowSchedulePlanner] = useState(false); // 새로 추가

  //텍스트 스타일등 삽입 함수
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const insertText = (startTag: string, endTag: string = "") => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd, value } = textarea;
      const selectedText = value.substring(selectionStart, selectionEnd);

      let newText;
      let escapedText = "";
      if (startTag.includes("<pre><code")) {
        // 코드 블록의 경우, HTML을 이스케이프 처리합니다
        escapedText = escapeHtml(selectedText);
        newText =
          value.substring(0, selectionStart) +
          startTag +
          escapedText +
          endTag +
          value.substring(selectionEnd);
      } else {
        // 다른 태그의 경우, 기존 방식대로 처리합니다
        newText =
          value.substring(0, selectionStart) +
          startTag +
          selectedText +
          endTag +
          value.substring(selectionEnd);
      }

      textarea.value = newText;
      setContent(newText);

      // 커서 위치 설정
      const cursorPosition =
        selectionStart +
        startTag.length +
        (startTag.includes("<pre><code")
          ? escapedText.length
          : selectedText.length);
      textarea.setSelectionRange(cursorPosition, cursorPosition);
      textarea.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textAreaRef.current;

    if (textarea) {
      const { value, selectionStart, selectionEnd } = textarea;

      //텝을 하면 인덴트
      if (e.key === "Tab") {
        e.preventDefault();
        const tabCharacter = "    ";
        const newValue =
          value.substring(0, selectionStart) +
          tabCharacter +
          value.substring(selectionEnd);

        textarea.value = newValue;
        textarea.setSelectionRange(
          selectionStart + tabCharacter.length,
          selectionStart + tabCharacter.length
        );
        textarea.focus();
        const beforeCursor = value.substring(0, selectionStart);
        setContent(newValue);

        const inLi =
          beforeCursor.lastIndexOf("<li>") > beforeCursor.lastIndexOf("</li>");
        if (inLi) {
          insertText("\n<ul><li>");
        }
      }

      if (e.key === "Enter") {
        const beforeCursor = value.substring(0, selectionStart);

        const inUl =
          beforeCursor.lastIndexOf("<ul>") > beforeCursor.lastIndexOf("</ul>");

        // 체크: 두 번 연속 엔터를 입력했는지 확인
        const isEmptyLineBefore = beforeCursor.endsWith("<li></li>");
        const endLIne = beforeCursor.startsWith("<li>");
        const inLi =
          beforeCursor.lastIndexOf("<li>") > beforeCursor.lastIndexOf("</li>");
        if (inUl && isEmptyLineBefore) {
          e.preventDefault();
          // 두 번 연속 엔터 -> 상위 리스트로 나가기 위해 리스트 닫기
          insertText("</ul><li></li>");
        } else if (inUl || endLIne || inLi) {
          e.preventDefault();
          insertText("\n<li>");
        }
      }
    }
  };

  useEffect(() => {
    const processedContent = content.replace(
      /(<pre><code[^>]*>)([\s\S]*?)(<\/code><\/pre>)/g,
      (match: string, p1: string, p2: string, p3: string) => {
        return p1 + escapeHtml(p2) + p3;
      }
    );
    const htmlContent = `
      <pre>${processedContent}</pre>
    `;
    setPreviewContent(htmlContent);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    const htmlContent = `
      <pre>${content}</pre>
    `;
    setData({
      title,
      contents: htmlContent,
      category: isEdit ? state.post.category : "",
      thumbnail: isEdit ? state.post.thumbnail : "",
      like_count: isEdit ? state.post.like_count : 0,
    });

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

  const handleScheduleInsert = (schedule: Event) => {
    // 선택된 일정을 content에 삽입하는 로직
    const scheduleText = `\n📅 ${
      schedule.title
    }\n시작: ${schedule.start.toLocaleString()}\n종료: ${schedule.end.toLocaleString()}\n`;
    setContent((prevContent: string) => prevContent + scheduleText);
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
        ></input>
        <WriteMenu
          onCommand={insertText}
          insertText={insertText}
          onShowSchedulePlanner={handleShowSchedulePlanner}
        />
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-300px)]">
          <div className="flex-1 p-4 border rounded-lg">
            <WriteArea
              inputRef={textAreaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex-1 p-4 border rounded-lg overflow-auto">
            <Preview content={previewContent} />
          </div>
        </div>
        <div className=" mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="  bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold"
          >
            작성하기
          </button>
        </div>
      </section>
      {openModal && (
        <WriteUpload data={data} onClose={closeModal} isEdit={isEdit} />
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
export default Write;
