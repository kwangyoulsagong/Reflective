import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import fetchProfile from "./fetchProfile";

const useGetProfile = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.MyProfile],
    queryFn: fetchProfile,
  });
};
export default useGetProfile;
