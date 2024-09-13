import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const useSaveMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  console.log(accesstoken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body: object) => {
      console.log(body);
      const response = await fetch("http://localhost:8000/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(body),
      });

      // HTTP 상태 코드를 확인하고, 에러 상태인 경우 예외를 발생시킵니다.
      if (!response.ok) {
        const errorData = await response.json(); // 서버에서 보낸 에러 메시지를 포함할 수 있습니다.
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
    onSuccess: () => {
      alert("성공적으로 게시되었습니다.");
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert("게시글 저장에 실패했습니다.");
    },
  });
};
export default useSaveMutation;
