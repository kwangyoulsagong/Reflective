import { axiosInstance } from "../../../shared/api/axiosinstance";
import { END_POINTS } from "../../../shared/constants/api";

const fetchPostQuery = async ({
  value,
  page,
}: {
  value: string;
  page: number;
}) => {
  const { data } = await axiosInstance.get(
    END_POINTS.SEARCHPOSTQUERY(value, page),
    {
      headers: {
        "Skip-Auth": true, // 토큰 없이 요청을 보냄
      },
    }
  );
  return data;
};
export default fetchPostQuery;
