import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import fetchPostQuery from "../../api/fetchPostQuery";

const useSearchPostQuery = ({
  value,
  page,
}: {
  value: string;
  page: number;
}) => {
  return useQuery({
    queryKey: [queryKeys.SearchList, value],
    queryFn: () => fetchPostQuery({ value, page }),
  });
};
export default useSearchPostQuery;
