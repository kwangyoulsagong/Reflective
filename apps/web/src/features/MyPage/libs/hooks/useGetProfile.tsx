import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKeys.MyProfile],
    queryFn: fetchProfile,
  });
};
