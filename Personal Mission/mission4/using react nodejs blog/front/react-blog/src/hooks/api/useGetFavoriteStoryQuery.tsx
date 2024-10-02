import { useQuery } from "@tanstack/react-query";
const fetchFavorityStory = async () => {
  const accesstoken = localStorage.getItem("accesstoken");
  try {
    const response = await fetch(`http://localhost:8000/api/v1/favorite`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
const useGetFavoriteStory = () => {
  return useQuery({
    queryKey: ["favoriteStory"],
    queryFn: fetchFavorityStory,
  });
};
export default useGetFavoriteStory;
