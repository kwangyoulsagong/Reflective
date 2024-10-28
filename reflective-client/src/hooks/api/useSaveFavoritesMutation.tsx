import { useMutation } from "@tanstack/react-query";

const useSaveFavoritesMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  return useMutation({
    mutationFn: async (body: object) => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("즐겨찾기 추가 오류", error);
      }
    },
  });
};
export default useSaveFavoritesMutation;
