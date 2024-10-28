import { useQuery } from "@tanstack/react-query";

const fetchPostDetail = async (post_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/post/${post_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const usePostDetailQuery = (post_id: string) => {
  return useQuery({
    queryKey: ["PostDetail", post_id],
    queryFn: () => fetchPostDetail(post_id),
  });
};

export default usePostDetailQuery;
