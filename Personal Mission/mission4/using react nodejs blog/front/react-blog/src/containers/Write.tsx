import { useEffect, useRef, useState } from "react";
import WriteArea from "../components/WriteArea";
import WriteMenu from "../components/WriteMenu";
import Preview from "./Preview";
import WriteUpload from "../components/WriteUpload";

const Write = () => {
  // ref 선언
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  //텍스트 스타일등 삽입 함수
  const insertText = (startTag: string, endTag: string = "") => {
    const textarea = textAreaRef.current;
    if (textarea) {
      // 시작 태그 와 끝 태그에 감싼 값들 가져온다
      const { selectionStart, selectionEnd, value } = textarea;
      const selectedText = value.substring(selectionStart, selectionEnd);

      const newText =
        value.substring(0, selectionStart) +
        startTag +
        selectedText +
        endTag +
        value.substring(selectionEnd);
      textarea.value = newText;
      // 커서 위치
      const cursorPosition = selectionStart + startTag.length;
      textarea.setSelectionRange(
        cursorPosition,
        cursorPosition + selectedText.length
      );
      textarea.focus();
    }
  };

  useEffect(() => {
    const htmlContent = `
      <h1>${title}</h1>
         <pre>${content}</pre>
    `;
    setPreviewContent(htmlContent);
  }, [title, content]);

  // Handle text area change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
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
        <WriteMenu onCommand={insertText} />
        <div className="flex flex-1 h-[80%]">
          <div className="flex-1 p-4">
            <WriteArea inputRef={textAreaRef} onChange={handleContentChange} />
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
      {openModal && <WriteUpload data={previewContent} onClose={closeModal} />}
    </div>
  );
};
export default Write;
