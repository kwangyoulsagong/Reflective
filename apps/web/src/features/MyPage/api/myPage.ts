import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

export const fetchMyPageData = async () => {
  try {
    // Promise.all을 사용해 두 요청을 동시에 보냄
    const [myPostsResponse, favoritePostsResponse] = await Promise.all([
      axiosInstance.get(END_POINTS.MYPOST),
      axiosInstance.get(END_POINTS.FAVORITE_POSTS),
    ]);

    return {
      myPosts: myPostsResponse.data?.data || [],
      favoritePosts: favoritePostsResponse.data?.data || [],
      success: true,
    };
  } catch (error) {
    console.error("마이페이지 데이터 로딩 오류:", error);
    return {
      myPosts: [],
      favoritePosts: [],
      success: false,
      error: error,
    };
  }
};
