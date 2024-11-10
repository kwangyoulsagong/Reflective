import { axiosInstance } from "../../api/axiosinstance";
import { END_POINTS } from "../../constants/api";

const UsePatchLike = async (post_id: string, body: object) => {
  try {
    const response = await axiosInstance.patch(
      END_POINTS.PATCHLIKE(post_id), // 요청할 엔드포인트
      body // 서버로 보낼 데이터 (부분 업데이트 내용)
    );

    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error("좋아요 업데이트 에러", error);
  }
};

export default UsePatchLike;
