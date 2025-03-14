import { mainAnimator } from "../../../libs/hooks/recentPost/mainAnimator";
import useRecentPostQuery from "../../../libs/hooks/recentPost/useRecentPostQuery";
import "./../styles/MainRanks.css";
import { useEffect } from "react";

const MainRanksContent = () => {
  const { data } = useRecentPostQuery();
  const topFour = data.slice(0, 10);
  useEffect(() => {
    if (topFour) {
      // mainAnimator 함수 호출 및 반환된 정리 함수 저장
      const cleanup = mainAnimator(topFour);
      // 컴포넌트 언마운트 시 정리 함수 실행 (이벤트 리스너 제거)
      return cleanup;
    }
  }, [topFour]);

  return (
    <section className="container">
      <div className="gallery"></div>
      <div className="message" id="message">
        오늘의 트렌드는?
      </div>
    </section>
  );
};

export default MainRanksContent;
