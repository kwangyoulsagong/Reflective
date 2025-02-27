interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  setIsFocused: (boolean: boolean) => void;
}
export const SearchBar = ({
  value,
  onChange,
  isFocused,
  setIsFocused,
}: SearchBarProps) => {
  return (
    <div className="relative flex w-full items-center">
      <input
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 pl-10 text-sm border rounded-full transition-all duration-300 outline-none
          ${
            isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-gray-300 hover:border-primary"
          }
          placeholder:text-gray-400 focus:placeholder:text-gray-500`}
        placeholder="게시물을 검색하세요..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
