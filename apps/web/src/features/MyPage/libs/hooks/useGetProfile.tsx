import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import fetchProfile from "../../api/fetchProfile";

const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKeys.MyProfile],
    queryFn: fetchProfile,
  });
};
export default useGetProfile;
