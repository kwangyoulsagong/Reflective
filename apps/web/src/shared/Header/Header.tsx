import logo from "../../assets/logo.svg";
import notification from "../../assets/notification.svg";
import me from "../../assets/me.jpeg";
import toggle from "../../assets/toggle.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/button";
const Header = () => {
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();

  return (
    <header className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-8 md:px-16 gap-4 sm:gap-0">
      <img
        onClick={() => navigate("/home")}
        src={logo}
        alt="logo"
        className="w-32 sm:w-36 md:w-40"
      />
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap sm:flex-nowrap">
        <button
          className="w-6 sm:w-7 h-6 sm:h-7 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${notification})` }}
        />
        <Button onClick={() => navigate("/write")} variant="primary">
          게시물 작성하기
        </Button>
        <div className="w-[50px] sm:w-[55px] md:w-[60px] h-[50px] sm:h-[55px] md:h-[60px] rounded-full overflow-hidden">
          <img src={me} alt="profile" className="w-full h-full object-cover" />
        </div>
        <button
          onClick={() => navigate("/mypage")}
          className="w-[11px] sm:w-[12px] md:w-[13px] h-[8px] sm:h-[9px] md:h-[10px] bg-no-repeat bg-center bg-contain relative sm:right-2 md:right-4 sm:top-2 md:top-4"
          style={{ backgroundImage: `url(${toggle})` }}
        />
        <span className="text-primary text-[18px] sm:text-[22px] md:text-[24px] font-bold relative right-0 sm:right-3 md:right-5">
          {nickname}
        </span>
      </nav>
    </header>
  );
};
export default Header;
