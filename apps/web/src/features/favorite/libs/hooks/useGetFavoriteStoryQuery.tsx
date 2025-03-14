import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import fetchFavoriteStory from "../../api/fetchFavoriteStory";

const useGetFavoriteStory = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.FavoriteStory,
    queryFn: fetchFavoriteStory,
  });
};
export default useGetFavoriteStory;
