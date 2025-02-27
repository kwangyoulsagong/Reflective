import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import fetchMyFollowers from "../../api/fetchMyFollowers";
const useGetFollowers = () => {
  return useQuery({
    queryKey: [queryKeys.MyFollowers],
    queryFn: fetchMyFollowers,
  });
};
export default useGetFollowers;
