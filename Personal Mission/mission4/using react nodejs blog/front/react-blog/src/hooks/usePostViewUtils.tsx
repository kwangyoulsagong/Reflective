import { useEffect, useRef } from "react";

// 헤더 요소들에 고유한 ID를 동적으로 생성하여 할당하는 커스텀 훅
export const useHeaderIDs = (
  contentRef: React.RefObject<HTMLDivElement>, // 콘텐츠가 포함된 div에 대한 참조
  contents: string | undefined // 콘텐츠 내용
) => {
  useEffect(() => {
    // 콘텐츠가 있고, contentRef가 현재 참조하고 있는 요소가 존재할 경우 실행
    if (contents && contentRef.current) {
      // header1, header2, header3, header4 요소를 모두 선택
      const headers = contentRef.current.querySelectorAll(
        "header1,header2,header3,header4"
      );
      // 각 헤더에 대해 ID를 생성하고 할당
      headers.forEach((header) => {
        const id = header.textContent
          ?.trim() // 텍스트에서 앞뒤 공백을 제거
          .replace(/\s+/g, "-") // 공백을 "-"로 대체
          .toLowerCase(); // 소문자로 변환
        if (id) {
          header.id = id; // 헤더에 ID를 설정
        }
      });
    }
  }, [contents, contentRef]); // contents나 contentRef가 변경될 때마다 실행
};

// 목차(ToC)를 생성하고, 스크롤 및 클릭 이벤트를 처리하는 커스텀 훅
export const useToC = (
  contentRef: React.RefObject<HTMLDivElement>, // 콘텐츠가 포함된 div에 대한 참조
  contents: string | undefined, // 콘텐츠 내용
  setCirclePosition: (pos: number) => void // 원형 네비게이션 요소의 위치를 설정하는 함수
) => {
  const tocRef = useRef<HTMLDivElement | null>(null); // 목차를 참조하기 위한 useRef

  useEffect(() => {
    // 콘텐츠가 있고 contentRef가 현재 참조하는 요소가 있을 경우 실행
    if (contents && contentRef.current) {
      const toc = document.querySelector("#toc") as HTMLDivElement; // 목차 요소를 선택
      if (!toc) return;
      tocRef.current = toc;

      toc.innerHTML = ""; // 목차 초기화
      const ul = document.createElement("ul"); // 새로운 ul 요소 생성
      ul.className = "flex flex-col gap-[30px]"; // ul에 클래스 지정

      const headers = contentRef.current.querySelectorAll(
        "header1,header2,header3,header4"
      ); // 모든 헤더 요소를 선택

      headers.forEach((header) => {
        const a = document.createElement("a"); // 링크 요소 생성
        const li = document.createElement("li"); // 리스트 항목 생성

        a.href = `#${header.id}`; // 링크에 헤더의 ID를 기반으로 앵커 설정
        a.innerText = header.textContent || ""; // 링크 텍스트로 헤더의 내용을 설정
        a.dataset.type = header.nodeName; // 헤더 타입을 데이터 속성으로 저장

        li.appendChild(a); // li에 링크 요소 추가
        ul.appendChild(li); // ul에 li 추가

        // 목차 항목 클릭 시 해당 헤더로 스크롤 이동 및 원형 네비게이션 위치 업데이트
        a.addEventListener("click", (e) => {
          e.preventDefault(); // 기본 클릭 이벤트 방지
          const headerElement = document.getElementById(header.id);
          if (headerElement) {
            headerElement.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
            updateCirclePosition(headerElement); // 원형 네비게이션 위치 업데이트
          }
        });
      });

      toc.appendChild(ul); // 완성된 ul을 목차에 추가

      // 스크롤 이벤트 리스너 추가
      window.addEventListener("scroll", handleScroll);

      // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [contents, contentRef, setCirclePosition]); // 의존성 배열에 contents, contentRef, setCirclePosition 포함

  // 스크롤 시 호출되는 함수: 가장 가까운 헤더를 찾아 원형 네비게이션 위치 업데이트
  const handleScroll = () => {
    if (contentRef.current) {
      const headers = contentRef.current.querySelectorAll(
        "header1,header2,header3,header4"
      ); // 모든 헤더 요소 선택
      let closestHeader: Element | null = null; // 가장 가까운 헤더를 저장할 변수
      let minDistance = Infinity; // 가장 가까운 거리 초기화

      // 각 헤더에 대해 현재 스크롤 위치와의 거리를 계산
      headers.forEach((header) => {
        const distance = Math.abs(header.getBoundingClientRect().top); // 헤더와 화면 상단의 거리 계산
        if (distance < minDistance) {
          minDistance = distance; // 최소 거리 업데이트
          closestHeader = header; // 가장 가까운 헤더 업데이트
        }
      });

      if (closestHeader) {
        updateCirclePosition(closestHeader); // 가장 가까운 헤더로 원형 네비게이션 위치 업데이트
      }
    }
  };

  // 원형 네비게이션의 위치를 업데이트하는 함수
  const updateCirclePosition = (header: Element) => {
    if (tocRef.current) {
      const tocItem = tocRef.current.querySelector(`a[href="#${header.id}"]`); // 현재 헤더에 대응하는 목차 항목 선택
      if (tocItem) {
        const liPosition =
          tocItem.getBoundingClientRect().top -
          tocRef.current.getBoundingClientRect().top; // 목차 항목의 상대적인 위치 계산
        setCirclePosition(liPosition); // 원형 네비게이션 위치 설정
      }
    }
  };
};
