import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import fetchMyPage from "../../api/fetchMyPage";

const useGetPostMyPage = () => {
  return useQuery({
    queryKey: [queryKeys.MyPost],
    queryFn: fetchMyPage,
  });
};
export default useGetPostMyPage;
