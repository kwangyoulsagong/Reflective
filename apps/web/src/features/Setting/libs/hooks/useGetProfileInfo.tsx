import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import fetchProfileInfo from "../../api/fetchProfileInfo";

const useGetProfileInfo = () => {
  return useQuery({
    queryKey: [queryKeys.MyProfileInfo],
    queryFn: fetchProfileInfo,
  });
};
export default useGetProfileInfo;
