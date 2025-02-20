import { queryKeys } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useGetPostMyPage = () => {
  return useQuery({
    queryKey: [queryKeys.MyPost],
    queryFn: fetchMyPagePost,
  });
};
