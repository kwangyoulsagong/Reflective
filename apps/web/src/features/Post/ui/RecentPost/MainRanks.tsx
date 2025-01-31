import { PostType } from "../../../../types/types";
import "./styles/MainRanks.css";
import { useEffect } from "react";
import { mainAnimator } from "../../../../hooks/mainAnimator";

const MainRanks = ({ data }: { data: PostType[] }) => {
  useEffect(() => {
    if (data) {
      // mainAnimator 함수 호출 및 반환된 정리 함수 저장
      const cleanup = mainAnimator(data);
      // 컴포넌트 언마운트 시 정리 함수 실행 (이벤트 리스너 제거)
      return cleanup;
    }
  }, [data]);

  return (
    <section className="container">
      <div className="gallery"></div>
      <div className="message" id="message">
        오늘의 트렌드는?
      </div>
    </section>
  );
};

export default MainRanks;
