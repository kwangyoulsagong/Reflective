import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchProfileInfo from "../../api/fetchProfileInfo";

const useGetProfileInfo = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.MyProfileInfo],
    queryFn: fetchProfileInfo,
  });
};
export default useGetProfileInfo;
