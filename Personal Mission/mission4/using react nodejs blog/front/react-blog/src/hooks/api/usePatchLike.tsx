const UsePatchLike = async (post_id: string, body: object) => {
  const accesstoken = localStorage.getItem("accesstoken");
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/like/${post_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(body),
      }
    );

    // HTTP 상태 코드를 확인하고, 에러 상태인 경우 예외를 발생시킵니다.
    if (!response.ok) {
      const errorData = await response.json(); // 서버에서 보낸 에러 메시지를 포함할 수 있습니다.
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("좋아요 업데이트 에러", error);
  }
};
export default UsePatchLike;
