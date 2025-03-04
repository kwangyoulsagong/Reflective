import { usePost_idStore } from "../../../../app/provider/post_idProvider";
import useSaveMutation from "../../libs/hooks/useSavePostMutation";
import useUpdatePostMutaion from "../../libs/hooks/useUpdatePostMutation";
import { WriteUploadProps } from "../../../../entities/BlockEditor/model/type/BlockEditor";
import { useRef, useState } from "react";
import uploadThumbnail from "../../api/uploadThumbnail";
import Header from "./Header/Header";
import UploadImage from "./UploadImage/UploadImage";
import Footer from "./Footer/Footer";

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
      thumbnail: thumbnail || "",
      like_count: isEdit ? undefined : 0,
    };

    if (isEdit) {
      const updateBody = {
        title: data.title,
        contents: data.contents,
        category: data.category || "",
        thumbnail: thumbnail || "",
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
        <Header isEdit={isEdit} onClose={onClose} />
        <UploadImage
          thumbnail={thumbnail}
          isUploading={isUploading}
          changeProfileImage={changeProfileImage}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
        <Footer
          onClose={onClose}
          handleSubmit={handleSubmit}
          updateMutation={updateMutation}
          saveMutation={saveMutation}
          isUploading={isUploading}
          isEdit={isEdit}
        />
      </section>
    </div>
  );
};

export default WriteUpload;
