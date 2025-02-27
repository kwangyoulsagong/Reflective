import { useMutation, useQueryClient } from "@tanstack/react-query";
import putProfileInfo from "../../api/putProfileInfo";
import { queryKeys } from "../../../../shared/constants/queryKeys";

const useUpdateProfileInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putProfileInfo,
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MyProfile],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MyProfileInfo],
      });
    },
    onError: (err) => {
      alert(err);
    },
  });
};
export default useUpdateProfileInfo;
