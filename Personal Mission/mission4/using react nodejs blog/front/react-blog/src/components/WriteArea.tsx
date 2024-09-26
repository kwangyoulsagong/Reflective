import { WriteAreaProps } from "../types/types";

const WriteArea = ({
  inputRef,
  value,
  onChange,
  onKeyDown,
}: WriteAreaProps) => {
  return (
    <textarea
      ref={inputRef}
      value={value}
      className="mt-[30px] w-[100%] h-[90%] text-[18px] outline-none p-4 resize-none"
      placeholder="글 작성하기 ..."
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default WriteArea;
