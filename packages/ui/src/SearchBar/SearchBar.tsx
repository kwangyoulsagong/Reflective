import React, { useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

export const SearchBar = ({
  value,
  onChange,
  isFocused,
  setIsFocused,
}: SearchBarProps) => {
  // 인풋 요소에 대한 ref 생성
  const inputRef = useRef<HTMLInputElement>(null);

  // isFocused 상태가 변경될 때 포커스 유지
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // 포커스가 true면 포커스 설정
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative flex w-full items-center">
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        className={`w-full py-2 text-sm border rounded-full transition-all duration-300 outline-none
          ${
            isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-gray-300 hover:border-primary"
          }
          placeholder:text-gray-400 focus:placeholder:text-gray-500`}
        style={{ paddingLeft: "20px", paddingRight: "40px" }}
        placeholder="게시물을 검색하세요..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
