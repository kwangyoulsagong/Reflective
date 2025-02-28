import { UpdateState } from "../../../../../features/Write/api/updatePostDetail";
import { UseMutationResult } from "@tanstack/react-query";

interface FooterProps {
  onClose: () => void;
  handleSubmit: () => void;
  updateMutation: UseMutationResult<
    {
      message: string;
    },
    Error,
    UpdateState,
    unknown
  >;
  saveMutation: UseMutationResult<
    {
      result: {
        post_id: string;
        title: string;
      };
    },
    Error,
    object,
    unknown
  >;
  isUploading: boolean;
  isEdit: boolean;
}
const Footer = ({
  onClose,
  handleSubmit,
  updateMutation,
  saveMutation,
  isUploading,
  isEdit,
}: FooterProps) => {
  return (
    <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-100">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
      >
        취소
      </button>
      <button
        onClick={handleSubmit}
        className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md flex items-center"
        disabled={
          updateMutation.isPending || saveMutation.isPending || isUploading
        }
      >
        {(updateMutation.isPending || saveMutation.isPending) && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isEdit ? "수정하기" : "업로드"}
      </button>
    </div>
  );
};
export default Footer;
