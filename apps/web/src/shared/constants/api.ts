export const AXIOS_BASE_URL = "https://reflective.site";

export const END_POINTS = {
  COMMENTS: (postId: string) => `/api/v1/comments/${postId}`,
  REIGISTER: "/api/v1/auth/register",
  LOGIN: "/api/v1/auth/login",
  PATCHLIKE: (post_id: string) => `/api/v1/like/${post_id}`,
  SAVEPOST: "/api/v1/post",
  RECENTPOST: "/api/v1/post/paginated",
  POST: (post_id: string) => `/api/v1/post/${post_id}`,
  COMMENT: (post_id: string) => `/api/v1/comments/${post_id}`,
  SAVECOMMENT: `/api/v1/comments/`,
  FAVORITE: (post_id: string) => `/api/v1/favorite/post/${post_id}`,
  SAVEFAVORITE: `/api/v1/favorite/`,
  DELETEFAVORITE: (favorite_id: string) => `/api/v1/favorite/${favorite_id}`,
  MYPOST: "/api/v1/post/mypost",
  MYFAVORITEPOST: "/api/v1/post/favorite",
  RANKING: "/api/v1/rank",
  MYPROFILE: "/api/v1/profile/mine",
  PROFILE: "/api/v1/profile",
  MYFAVORITES: "/api/v1/favorite/mypage/profile",
  MYFOLLOWERS: "/api/v1/favorite/mypage/followers",
  MYFOLLOWINGS: "/api/v1/favorite/mypage/followings",
  MYSTATUSMESSAGE: "/api/v1/profile/status",
  UPLOADPROFILEIMAGE: "/api/v1/profile/image/upload",
  SEARCHPOSTQUERY: (searchTerm: string, page: number = 1) =>
    `/api/v1/post/search?query=${encodeURIComponent(searchTerm)}&page=${page}&limit=5`,
  UPLOADTHUMBNAIL: "/api/v1/post//upload/thumbnail",
} as const;

export const NETWORK = {
  RETRY_COUNT: 2,
  TIMEOUT: 10000,
} as const;

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_ERROR_MESSAGE = {
  "400": {
    HEADING: "잘못된 요청입니다",
    BODY: "요청을 확인하고 다시 시도해주세요",
    BUTTON: "다시 시도",
  },
  "401": {
    HEADING: "인증이 필요합니다",
    BODY: "로그인 후 다시 시도해주세요",
    BUTTON: "로그인하기",
  },
  "403": {
    HEADING: "접근 권한이 없습니다",
    BODY: "해당 리소스에 대한 접근 권한이 없습니다",
    BUTTON: "홈으로 가기",
  },
  "404": {
    HEADING: "페이지를 찾을 수 없습니다",
    BODY: "요청하신 페이지가 존재하지 않습니다",
    BUTTON: "홈으로 가기",
  },
  "500": {
    HEADING: "서버 오류가 발생했습니다",
    BODY: "잠시 후 다시 시도해주세요",
    BUTTON: "새로고침",
  },
} as const;

export const ERROR_MESSAGE = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const USER_ID_KEY = "USER_ID";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
