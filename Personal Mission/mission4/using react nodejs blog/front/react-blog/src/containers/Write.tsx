import { useEffect, useRef, useState } from "react";
import WriteArea from "../components/WriteArea";
import WriteMenu from "../components/WriteMenu";
import Preview from "./Preview";
import WriteUpload from "../components/WriteUpload";
import { Event, SavePostType } from "../types/types";
import { useLocation } from "react-router-dom";
import SchedulePlanner from "../components/schedulePlanner";
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
const Write = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { state } = useLocation();
  const isEdit = Boolean(state?.post);

  const [title, setTitle] = useState(isEdit ? state.post.title : "");
  const [content, setContent] = useState(isEdit ? state.post.contents : "");
  const [previewContent, setPreviewContent] = useState("");
  const [data, setData] = useState<SavePostType>({
    title: "",
    contents: "",
    category: isEdit ? state.post.category : "",
    thumbnail: isEdit ? state.post.thumbnail : "",
    like_count: isEdit ? state.post.like_count : 0,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSchedulePlanner, setShowSchedulePlanner] = useState(false);

  // 텍스트 영역 변경 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setData((prev) => ({
      ...prev,
      title,
      contents: content,
    }));
    setOpenModal(true);
  };

  const markdownToHtml = (markdown: string): string => {
    const lines = markdown.split(/\r?\n/);
    let html = "";
    const listStack: string[] = [];
    let currentIndent = 0;
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";
    const processListItem = (line: string, listType: string) => {
      const indent = line.search(/\S|$/);
      const content = line
        .trim()
        .replace(/^[-*+]|\d+\.\s/, "")
        .trim();

      if (listStack.length === 0 || indent > currentIndent) {
        listStack.push(listType);
        html += `<${listType}>`;
        currentIndent = indent;
      } else if (indent < currentIndent) {
        while (indent < currentIndent && listStack.length > 0) {
          const closingTag = listStack.pop();
          html += `</${closingTag}>`;
          currentIndent -= 2;
        }
        if (
          listStack.length === 0 ||
          listStack[listStack.length - 1] !== listType
        ) {
          listStack.push(listType);
          html += `<${listType}>`;
        }
      }

      html += `<li>${content}</li>`;
    };

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          html += `<pre><code class="language-${codeLanguage}">${escapeHtml(
            codeContent.trim()
          )}</code></pre>`;
          inCodeBlock = false;
          codeContent = "";
          codeLanguage = "";
        } else {
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3);
        }
      } else if (inCodeBlock) {
        codeContent += line + "\n";
      } else if (line.trim().match(/^[-*+]\s/)) {
        processListItem(line, "ul");
      } else if (line.trim().match(/^\d+\.\s/)) {
        processListItem(line, "ol");
      } else {
        while (listStack.length > 0) {
          const closingTag = listStack.pop();
          html += `</${closingTag}>`;
        }
        currentIndent = 0;
        html += processLine(line);
      }
    }

    while (listStack.length > 0) {
      const closingTag = listStack.pop();
      html += `</${closingTag}>`;
    }

    if (inCodeBlock) {
      html += `<pre><code class="language-${codeLanguage}">${escapeHtml(
        codeContent.trim()
      )}</code></pre>`;
    }

    return html;
  };
  const processLine = (line: string): string => {
    return line
      .replace(/^#### (.*?)$/, "<h4>$1</h4>")
      .replace(/^### (.*?)$/, "<h3>$1</h3>")
      .replace(/^## (.*?)$/, "<h2>$1</h2>")
      .replace(/^# (.*?)$/, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
      .replace(/^\s*>\s*(.*?)$/g, "<blockquote>$1</blockquote>")
      .replace(/^(?!<h|<blockquote|<li|<\/)(.*?)$/g, "<p>$1</p>");
  };
  // 키 다운 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd } = e.currentTarget;
    const value = content;

    if (e.key === "Enter") {
      e.preventDefault();

      const currentLine = value
        .substring(0, selectionStart)
        .split("\n")
        .pop()
        .trim();

      const indentMatch = value
        .substring(0, selectionStart)
        .split("\n")
        .pop()
        .match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : "";

      if (currentLine.match(/^[-*+]\s/) || currentLine.match(/^\d+\.\s/)) {
        const listMarker = currentLine.match(/^[-*+]\s/) ? "- " : "1. ";
        const newContent =
          value.substring(0, selectionStart) +
          "\n" +
          currentIndent +
          listMarker +
          value.substring(selectionEnd);
        setContent(newContent);

        setTimeout(() => {
          if (textAreaRef.current) {
            const newPosition =
              selectionStart + currentIndent.length + listMarker.length + 1;
            textAreaRef.current.setSelectionRange(newPosition, newPosition);
            textAreaRef.current.focus();
          }
        }, 0);
      } else if (currentLine === "") {
        // 빈 줄이면 들여쓰기 제거
        const newIndent = currentIndent.slice(0, -2);
        const newContent =
          value.substring(0, selectionStart - currentIndent.length) +
          "\n" +
          newIndent +
          value.substring(selectionEnd);
        setContent(newContent);

        setTimeout(() => {
          if (textAreaRef.current) {
            const newPosition =
              selectionStart - currentIndent.length + newIndent.length + 1;
            textAreaRef.current.setSelectionRange(newPosition, newPosition);
            textAreaRef.current.focus();
          }
        }, 0);
      } else {
        // 일반 텍스트의 경우 기본 동작
        const newContent =
          value.substring(0, selectionStart) +
          "\n" +
          currentIndent +
          value.substring(selectionEnd);
        setContent(newContent);

        setTimeout(() => {
          if (textAreaRef.current) {
            const newPosition = selectionStart + currentIndent.length + 1;
            textAreaRef.current.setSelectionRange(newPosition, newPosition);
            textAreaRef.current.focus();
          }
        }, 0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();

      const lines = value.substring(0, selectionStart).split("\n");
      const currentLine = lines[lines.length - 1];
      const isListItem =
        currentLine.trim().match(/^[-*+]\s/) ||
        currentLine.trim().match(/^\d+\.\s/);

      if (isListItem) {
        // 리스트 항목인 경우 들여쓰기 추가
        const newIndent = "  " + currentLine;
        const newContent =
          lines.slice(0, -1).join("\n") +
          (lines.length > 1 ? "\n" : "") +
          newIndent +
          value.substring(selectionStart);
        setContent(newContent);

        setTimeout(() => {
          if (textAreaRef.current) {
            const newPosition = selectionStart + 2;
            textAreaRef.current.setSelectionRange(newPosition, newPosition);
            textAreaRef.current.focus();
          }
        }, 0);
      } else {
        // 일반 텍스트의 경우 기존 동작 유지
        const newContent =
          value.substring(0, selectionStart) +
          "  " +
          value.substring(selectionEnd);
        setContent(newContent);

        setTimeout(() => {
          if (textAreaRef.current) {
            const newPosition = selectionStart + 2;
            textAreaRef.current.setSelectionRange(newPosition, newPosition);
            textAreaRef.current.focus();
          }
        }, 0);
      }
    }
  };

  // 미리보기 콘텐츠 업데이트
  useEffect(() => {
    setPreviewContent(markdownToHtml(content));
  }, [content]);

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col w-full max-w-7xl">
        <input
          value={title}
          placeholder="제목을 입력해주세요"
          className="text-4xl font-bold mb-4 p-2 outline-none border-b"
          onChange={(e) => setTitle(e.target.value)}
        />
        <WriteMenu
          onCommand={(markdown) =>
            setContent((prev: string) => prev + markdown)
          }
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
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold"
          >
            작성하기
          </button>
        </div>
      </section>
      {openModal && (
        <WriteUpload
          data={data}
          onClose={() => setOpenModal(false)}
          isEdit={isEdit}
        />
      )}
      {showSchedulePlanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-3/4">
            <SchedulePlanner
              onClose={() => setShowSchedulePlanner(false)}
              onScheduleSelect={(schedule: Event) => {
                const scheduleText = `\n## ${
                  schedule.title
                }\n시작: ${schedule.start.toLocaleString()}\n종료: ${schedule.end.toLocaleString()}\n`;
                setContent((prev: string) => prev + scheduleText);
                setShowSchedulePlanner(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
