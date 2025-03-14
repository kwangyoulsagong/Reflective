import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchMyPage from "../../api/fetchMyPage";

const useGetPostMyPage = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.MyPost],
    queryFn: fetchMyPage,
  });
};
export default useGetPostMyPage;
