import { useMutation } from "@tanstack/react-query";

const useDeleteFavoriteMutation = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  return useMutation({
    mutationFn: async (favorite_id: string) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/favorite/${favorite_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("즐겨찾기 삭제 실패", error);
      }
    },
  });
};
export default useDeleteFavoriteMutation;
