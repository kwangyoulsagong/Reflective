import { Image, Upload } from "lucide-react";
import UploadingCircle from "./UploadingCircle/UploadingCircle";
interface UploadImageProps {
  thumbnail: string;
  isUploading: boolean;
  changeProfileImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadImage = ({
  thumbnail,
  isUploading,
  changeProfileImage,
  fileInputRef,
  handleFileChange,
}: UploadImageProps) => {
  return (
    <section className="px-6 py-5">
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
          {isUploading && <UploadingCircle />}

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
    </section>
  );
};
export default UploadImage;
