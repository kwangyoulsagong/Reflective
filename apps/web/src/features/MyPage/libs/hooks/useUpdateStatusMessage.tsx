import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateStatusMessage from "../../api/updateStatusMessage";

const useUpdateStatusMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStatusMessage,
    onMutate: async (StatusMessage: { status_message: string }) => {
      const previousProfile = queryClient.getQueryData([queryKeys.MyProfile]);
      queryClient.setQueryData(
        [queryKeys.MyProfile],
        (old: { status_message: string }) => ({
          ...old,
          status_message: StatusMessage.status_message,
        })
      );
      return { previousProfile };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([queryKeys.MyProfile], context?.previousProfile);
      alert(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MyProfile],
      });
    },
  });
};
export default useUpdateStatusMessage;
