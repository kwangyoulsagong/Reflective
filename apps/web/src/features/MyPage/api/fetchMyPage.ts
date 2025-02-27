import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchMyPage = async () => {
  try {
    // Promise.all을 사용해 두 요청을 동시에 보냄
    const [myPostsResponse, favoritePostsResponse] = await Promise.all([
      axiosInstance.get(END_POINTS.MYPOST),
      axiosInstance.get(END_POINTS.MYFAVORITEPOST),
    ]);

    return {
      myPosts: myPostsResponse.data || [],
      favoritePosts: favoritePostsResponse.data || [],
      success: true,
    };
  } catch (error) {
    console.error("마이페이지 데이터 로딩 오류:", error);
  }
};
export default fetchMyPage;
