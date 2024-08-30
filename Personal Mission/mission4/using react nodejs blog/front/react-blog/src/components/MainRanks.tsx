// import time from "../assets/time.svg";
import { PostType } from "../types/types";
// import { formatRelativeTime } from "../hooks/TimeReducer";
// import heart from "../assets/heart.png";
import "./styles/MainRanks.css";
import { useEffect } from "react";
import { mainAnimator } from "../hooks/mainAnimator";

const MainRanks = ({ data }: { data: PostType[] }) => {
  useEffect(() => {
    if (data) {
      mainAnimator(data);
    }
  }, [data]);
  return (
    <section className="container">
      <div className="gallery"></div>
    </section>
  );
};

export default MainRanks;
