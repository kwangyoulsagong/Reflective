interface TextAreaProps {
  variant?: variantType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}
type variantType = "new" | "reply" | "update";
const TextArea = ({
  variant = "new",
  value,
  onChange,
  rows = 3,
}: TextAreaProps) => {
  const variants = {
    new: "w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary",
    reply:
      "w-full p-1.5 sm:p-2 text-xs sm:text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary",
    update:
      "w-full p-1.5 sm:p-2 mt-1 text-xs sm:text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary",
  };
  const placehlders = {
    new: "댓글을 작성해주세요...",
    reply: "답글을 작성해주세요...",
    update: "",
  };
  return (
    <textarea
      className={variants[variant]}
      placeholder={placehlders[variant]}
      value={value}
      onChange={onChange}
      rows={rows}
    ></textarea>
  );
};
export default TextArea;
