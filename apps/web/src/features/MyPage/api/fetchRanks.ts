import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchRanks = async () => {
  try {
    const { data } = await axiosInstance.get(END_POINTS.RANKING);
    return data;
  } catch (error) {
    console.error("래킹 데이터 조회 오류:", error);
  }
};
export default fetchRanks;
