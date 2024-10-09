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
        "data:image/jpeg;base64,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",
      like_count: 0,
    };
    if (isEdit) {
      const body = {
        title: data.title,
        contents: data.contents,
        category: data.category || "",
        thumbnail:
          data.thumbnail ||
          "https://velog.velcdn.com/images/k-svelte-master/post/3b675e72-cdba-4983-8429-1fbea08ca37a/image.png",
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
