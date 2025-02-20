import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import fetchRanks from "../../api/fetchRanks";

const useGetRanks = () => {
  return useQuery({
    queryKey: [queryKeys.Ranking],
    queryFn: fetchRanks,
  });
};
export default useGetRanks;
