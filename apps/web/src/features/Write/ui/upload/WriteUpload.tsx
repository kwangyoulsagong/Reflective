import { usePost_idStore } from "../../../../app/provider/post_idProvider";
import useSaveMutation from "../../libs/hooks/useSavePostMutation";
import useUpdatePostMutaion from "../../libs/hooks/useUpdatePostMutation";
import { WriteUploadProps } from "../../../../entities/BlockEditor/model/type/BlockEditor";
import { X, Upload, Image } from "lucide-react";
import { useRef, useState } from "react";
import uploadThumbnail from "../../api/uploadThumbnail";

const WriteUpload = ({ data, onClose, isEdit }: WriteUploadProps) => {
  const { post_id } = usePost_idStore();
  const saveMutation = useSaveMutation();
  const updateMutation = useUpdatePostMutaion();
  const [thumbnail, setThumbnail] = useState(data.thumbnail || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const body = {
      title: data.title,
      contents: data.contents,
      category: data.category || "",
      thumbnail: thumbnail,
      like_count: isEdit ? undefined : 0,
    };

    if (isEdit) {
      const updateBody = {
        title: data.title,
        contents: data.contents,
        category: data.category || "",
        thumbnail: thumbnail,
      };
      updateMutation.mutate({ post_id, body: updateBody });
    } else {
      saveMutation.mutate(body);
    }
  };

  const changeProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 여기에 필요한 validation 로직 추가
    const isValidImage = file.type.startsWith("image/");
    if (!isValidImage) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("thumbnailImage", file);
      const response = await uploadThumbnail(formData);

      if (response.data.thumbnailUrl) {
        setThumbnail(response.data.thumbnailUrl);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("섭네일 업로드:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <section className="w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "게시글 수정하기" : "게시글 업로드"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              썸네일 이미지
            </label>
            <div
              className={`
              border-2 border-dashed rounded-lg 
              ${thumbnail ? "border-primary" : "border-gray-300"} 
              bg-gray-50 transition-all hover:bg-gray-100
              w-full h-[220px] flex flex-col justify-center items-center overflow-hidden
              relative
            `}
            >
              {isUploading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <svg
                      className="animate-spin h-8 w-8 text-primary mb-2"
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
                    <span className="text-sm text-gray-600">업로드 중...</span>
                  </div>
                </div>
              )}

              {thumbnail ? (
                <div className="relative w-full h-full group">
                  <img
                    src={thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <button
                      onClick={changeProfileImage}
                      className="cursor-pointer bg-white text-primary hover:bg-primary hover:text-white transition-colors font-medium rounded-lg px-4 py-2 shadow-md"
                    >
                      <span className="flex items-center">
                        <Upload size={16} className="mr-1" />
                        변경하기
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="cursor-pointer flex flex-col items-center gap-3"
                  onClick={changeProfileImage}
                >
                  <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                    <Image size={28} className="text-primary" />
                  </div>
                  <span className="text-gray-500 text-sm">
                    이미지를 업로드하세요
                  </span>
                  <button
                    type="button"
                    className="bg-primary text-white font-medium rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors shadow-md"
                  >
                    <span className="flex items-center">
                      <Upload size={16} className="mr-1" />
                      썸네일 첨부
                    </span>
                  </button>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

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
              updateMutation.isLoading || saveMutation.isLoading || isUploading
            }
          >
            {(updateMutation.isLoading || saveMutation.isLoading) && (
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
      </section>
    </div>
  );
};

export default WriteUpload;
