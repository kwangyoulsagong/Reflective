// 날짜를 포맷팅하는 함수
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ko-KR", options); // 한국 형식으로 날짜 반환
};

// 상대적인 시간을 포맷팅하는 함수
const formatRelativeTime = (dateString: string): string => {
  const now: Date = new Date();
  const date: Date = new Date(dateString);
  const diff: number = now.getTime() - date.getTime(); // 현재 시간과 주어진 시간의 차이 계산

  const minutes: number = Math.floor(diff / 60000);
  const hours: number = Math.floor(diff / 3600000);
  const days: number = Math.floor(diff / 86400000);

  // 시간에 따라 다른 형식으로 반환
  if (minutes < 1) {
    return "방금 전"; // 1분 이내
  } else if (minutes < 60) {
    return `${minutes}분 전`; // 분 단위
  } else if (hours < 24) {
    return `${hours}시간 전`; // 시간 단위
  } else if (days < 7) {
    return `${days}일 전`; // 일 단위
  } else {
    return formatDate(dateString); // 1주 이상이면 날짜 포맷으로 반환
  }
};
export { formatRelativeTime };
