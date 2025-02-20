import { useQuery } from "@tanstack/react-query";

const useGetRanks = () => {
  return useQuery({
    queryKey,
  });
};
