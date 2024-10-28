import { useQuery } from "@tanstack/react-query";

const fetchRecentPost = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/post", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useRecentPostQuery = () => {
  return useQuery({
    queryKey: ["RecentPost"],
    queryFn: fetchRecentPost,
  });
};

export default useRecentPostQuery;
