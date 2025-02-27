import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import fetchProfile from "./fetchProfile";

const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKeys.MyProfile],
    queryFn: fetchProfile,
  });
};
export default useGetProfile;
