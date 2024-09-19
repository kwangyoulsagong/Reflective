import useSaveMutation from "../hooks/api/useSavePostMutation";
import { WriteUploadProps } from "../types/types";

const WriteUpload = ({ data, onClose }: WriteUploadProps) => {
  const handleSubmit = () => {
    const body = {
      title: data.title,
      contents: data.contents,
      category: data.category || "",
      thumbnail:
        data.thumbnail ||
        "https://velog.velcdn.com/images%2Fkimdukbae%2Fpost%2F50497c5d-1598-48ad-b7cd-e60b2df366da%2Fimage.png",
      like_count: 0,
    };
    mutate(body);
  };
  const { mutate } = useSaveMutation();
  return (
    <div className="absolute w-full h-[120vh] flex justify-center items-center bg-gray-300 opacity-80">
      <section className="w-[400px] h-[400px] rounded-md bg-[#ffffff]">
        <div className="flex justify-end">
          <button onClick={() => onClose()}>X</button>
        </div>
        <div className="flex justify-center">
          <div className="border-2 border-dashed border-gray-100 w-[200px] h-[200px] flex justify-center items-center">
            <button className="  bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold">
              섭네일 첨부
            </button>
          </div>
        </div>
        <button onClick={handleSubmit}>업로드</button>
      </section>
    </div>
  );
};
export default WriteUpload;
