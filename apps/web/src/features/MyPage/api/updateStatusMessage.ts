import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const updateStatusMessage = async (body: { status_message: string }) => {
  try {
    const { data } = await axiosInstance.put(END_POINTS.MYSTATUSMESSAGE, body);
    return data;
  } catch (error) {
    console.error("마이페이지 상테 메시지 데이터 업데이트 오류:", error);
  }
};
export default updateStatusMessage;
