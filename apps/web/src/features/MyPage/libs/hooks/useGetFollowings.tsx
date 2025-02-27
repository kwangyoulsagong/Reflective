import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import fetchMyFollowings from "../../api/fetchMyFollowings";
const useGetFollowings = () => {
  return useQuery({
    queryKey: [queryKeys.MyFollowings],
    queryFn: fetchMyFollowings,
  });
};
export default useGetFollowings;
