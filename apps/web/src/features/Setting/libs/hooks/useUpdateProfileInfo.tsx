import { useMutation, useQueryClient } from "@tanstack/react-query";
import putProfileInfo from "../../api/putProfileInfo";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useToast } from "../../../../shared/Toast/Hooks/useToast";
import { useApiError } from "../../../../shared/useApiError";

const useUpdateProfileInfo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { handleError } = useApiError();
  return useMutation({
    mutationFn: putProfileInfo,
    onSuccess: (data: { message: string }) => {
      showToast(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MyProfile],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MyProfileInfo],
      });
    },
    onError: (err) => {
      handleError(err);
    },
  });
};
export default useUpdateProfileInfo;
