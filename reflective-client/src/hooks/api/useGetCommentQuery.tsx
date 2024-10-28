import { useQuery } from "@tanstack/react-query";

const fetchComment = async (post_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/comments/${post_id}`,
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

const useGetCommentQuery = (post_id: string) => {
  return useQuery({
    queryKey: ["fetchComment", post_id],
    queryFn: () => fetchComment(post_id),
  });
};
export default useGetCommentQuery;
