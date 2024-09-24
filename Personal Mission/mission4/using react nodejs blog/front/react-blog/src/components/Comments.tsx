import { useState } from "react";
import { usePost_idStore } from "../provider/post_idProvider";
import useSaveCommentMutation from "../hooks/api/useSaveCommentMutation";
const Comments = () => {
  const { post_id } = usePost_idStore();
  const [comment, setComment] = useState("");
  const handleSaveComment = async () => {
    const body = {
      post_id,
      parent_comment_id: null,
      content: comment,
    };
    mutate(body);
  };
  const { mutate } = useSaveCommentMutation();
  return (
    <div className="flex flex-col items-center gap-4  w-[700px] ">
      <textarea
        className="w-[inherit] h-[auto] outline-none resize-none border p-[10px] "
        placeholder="댓글을 작성해주세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="flex justify-end w-[inherit]">
        <button
          onClick={handleSaveComment}
          className="w-[100px] h-[30px] border-2 border-primary rounded-[20px] text-primary"
        >
          댓글 작성
        </button>
      </div>
      <section className="flex flex-col  w-[inherit] h-auto gap-7">
        <div className="w-[inherit] h-[130px] flex  flex-col gap-4 justify-center border-b">
          <div className="flex gap-3 items-center">
            <img className="border w-[50px] h-[50px] rounded-[25px]"></img>
            <div className="flex flex-col">
              <b>광열</b>
              <span>2024년 9월 11일</span>
            </div>
          </div>
          <span>fsadfasfsaf</span>
        </div>

        <div className="w-[inherit] h-[130px] flex  flex-col gap-4 justify-center border-b">
          <div className="flex gap-3 items-center">
            <img className="border w-[50px] h-[50px] rounded-[25px]"></img>
            <div className="flex flex-col">
              <b>광열</b>
              <span>2024년 9월 11일</span>
            </div>
          </div>
          <span>fsadfasfsaf</span>
        </div>
      </section>
    </div>
  );
};
export default Comments;
