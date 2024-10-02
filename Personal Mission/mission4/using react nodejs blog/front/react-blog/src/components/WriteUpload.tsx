import useSaveMutation from "../hooks/api/useSavePostMutation";
import useUpdatePostMutaion from "../hooks/api/useUpdatePostMutation";
import { usePost_idStore } from "../provider/post_idProvider";
import { WriteUploadProps } from "../types/types";

const WriteUpload = ({ data, onClose, isEdit }: WriteUploadProps) => {
  const { post_id } = usePost_idStore();
  console.log(post_id);
  const saveMutation = useSaveMutation();
  const updateMutation = useUpdatePostMutaion();
  const handleSubmit = () => {
    const body = {
      title: data.title,
      contents: data.contents,
      category: data.category || "",
      thumbnail:
        data.thumbnail ||
        "https://velog.velcdn.com/images/wyk172899/post/8463d1fd-300c-4719-b57a-b92e38490dff/image.png",
      like_count: 0,
    };
    if (isEdit) {
      const body = {
        title: data.title,
        contents: data.contents,
        category: data.category || "",
        thumbnail:
          data.thumbnail ||
          "https://velog.velcdn.com/images/joshuara7235/post/5795bbd0-a5d9-48a6-91a8-c6d9e02db05f/image.webp",
      };
      updateMutation.mutate({ post_id, body });
    } else {
      saveMutation.mutate(body);
    }
  };
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
