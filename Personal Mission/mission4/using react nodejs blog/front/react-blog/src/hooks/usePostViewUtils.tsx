import { useEffect } from "react";

// 헤더에 ID 추가하는 훅
export const useHeaderIDs = (
  contentRef: React.RefObject<HTMLDivElement>,
  contents: string | undefined
) => {
  useEffect(() => {
    if (contents && contentRef.current) {
      // header1 header2 header3 header4 요소를 찾음
      const headers = contentRef.current.querySelectorAll(
        "header1,header2, header3, header4"
      );
      headers.forEach((header) => {
        // 헤더의 텍스트 콘텐츠에서 공백을 대시(-)로 바꾸고 소문자로 변환하여 ID 생성
        const id = header.textContent
          ?.trim()
          .replace(/\s+/g, "-")
          .toLowerCase();
        if (id) {
          // 생성된 ID를 헤더에 할당
          header.id = id;
        }
      });
    }
  }, [contents, contentRef]);
};

// 목차(ToC)를 생성하는 훅
export const useToC = (
  contentRef: React.RefObject<HTMLDivElement>,
  contents: string | undefined
) => {
  useEffect(() => {
    if (contents) {
      const toc = document.querySelector("#toc");
      if (!toc) return;

      toc.innerHTML = ""; // 이전 목차(ToC)를 초기화
      const ul = document.createElement("ul");

      if (contentRef.current) {
        // header1, header2, header3, header4 요소를 찾음
        const headers = contentRef.current.querySelectorAll(
          "header1,header2, header3,header4"
        );
        headers.forEach((header) => {
          const a = document.createElement("a"); // 링크(anchor) 생성
          const li = document.createElement("li"); // 목록 항목 생성

          a.href = `#${header.id}`; // 해당 헤더 ID로 링크 연결
          a.innerText = header.textContent || ""; // 링크 텍스트 설정
          a.dataset.type = header.nodeName; // 헤더 타입을 데이터 속성으로 저장

          li.appendChild(a); // 목록 항목에 링크 추가
          ul.appendChild(li); // 목록에 항목 추가
        });

        toc.appendChild(ul); // 목차(ToC)에 목록 추가
      }
    }
  }, [contents, contentRef]);
};

// 현재 섹션을 강조 표시하는 훅
export const useScrollHighlight = (
  contentRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleScroll = () => {
      const tocAnchors = document.querySelectorAll("#toc a");
      if (!contentRef.current) return;

      // 모든 목차 링크에서 'activate' 클래스 제거
      tocAnchors.forEach((anchor) => anchor.classList.remove("activate"));

      // header1 header2 header3 header4 요소를 찾음
      const headers = contentRef.current.querySelectorAll(
        "header1,header2, header3,header4"
      );
      headers.forEach((header, index) => {
        const rect = header.getBoundingClientRect(); // 헤더의 위치를 가져옴
        // 현재 뷰포트 내에 있는 헤더에 해당하는 목차 링크에 'activate' 클래스 추가
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
          tocAnchors[index]?.classList.add("activate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트에 핸들러 추가
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트되면 이벤트 핸들러 제거
    };
  }, [contentRef]);
};
