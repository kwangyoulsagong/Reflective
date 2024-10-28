import { useQuery } from "@tanstack/react-query";

const fetchPostFavorite = async (post_id: string) => {
  const accesstoken = localStorage.getItem("accesstoken");
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/favorite/post/${post_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetPostFavoritesQuery = (post_id: string) => {
  return useQuery({
    queryKey: ["PostFavorite", post_id],
    queryFn: () => fetchPostFavorite(post_id),
  });
};

export default useGetPostFavoritesQuery;
