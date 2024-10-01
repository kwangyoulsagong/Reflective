import { useEffect, useRef, useState } from "react";
import WriteArea from "../components/WriteArea";
import WriteMenu from "../components/WriteMenu";
import Preview from "./Preview";
import WriteUpload from "../components/WriteUpload";
import { SavePostType } from "../types/types";
import { useLocation } from "react-router-dom";

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
        setContent(newValue);
      }

      if (e.key === "Enter") {
        const beforeCursor = value.substring(0, selectionStart);
        const afterCursor = value.substring(selectionStart);

        // 현재 커서 위치에서 <li> 태그가 있는지 확인
        const inLi =
          beforeCursor.lastIndexOf("<li>") > beforeCursor.lastIndexOf("</li>");
        // <ul> 또는 <ol> 태그 안에 있는지 체크
        const inUl =
          beforeCursor.lastIndexOf("<ul>") > beforeCursor.lastIndexOf("</ul>");
        const inOl =
          beforeCursor.lastIndexOf("<ol>") > beforeCursor.lastIndexOf("</ol>");

        // 리스트 내에서 Enter 키를 눌렀을 때 서브 리스트 생성
        if (inLi) {
          e.preventDefault();
          // 서브 리스트 추가
          const newValue = `${value.substring(
            0,
            selectionStart
          )}\t<ul><li></li></ul>\n${afterCursor}`;
          textarea.value = newValue;
          const newCursorPosition = selectionStart; // <ul> 태그의 길이 포함
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
          textarea.focus();
          setContent(newValue);
        } else if (inUl || inOl) {
          e.preventDefault();
          insertText("<li>", "</li>");
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
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col  w-[1300px] h-[800px]">
        <input
          value={title}
          placeholder="제목을 입력해주세요"
          className="h-[80px] text-[37px] outline-none"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <WriteMenu onCommand={insertText} insertText={insertText} />
        <div className="flex flex-1 h-[80%]">
          <div className="flex-1 p-4">
            <WriteArea
              inputRef={textAreaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex-1 p-4 overflow-y-scroll">
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
    </div>
  );
};
export default Write;
