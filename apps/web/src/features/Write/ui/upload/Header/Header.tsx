import { X } from "lucide-react";
interface HeaderProps {
  isEdit: boolean;
  onClose: () => void;
}
const Header = ({ isEdit, onClose }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">
        {isEdit ? "게시글 수정하기" : "게시글 업로드"}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <X size={20} />
      </button>
    </header>
  );
};
export default Header;
