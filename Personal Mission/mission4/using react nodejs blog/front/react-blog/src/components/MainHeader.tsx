import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import me from "../assets/me.jpeg";
import toggle from "../assets/toggle.svg";

const MainHeader = () => {
  const nickname = localStorage.getItem("nickname");

  return (
    <header className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-8 md:px-16 gap-4 sm:gap-0">
      <img src={logo} alt="logo" className="w-16 sm:w-18 md:w-20" />
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap sm:flex-nowrap">
        <button
          className="w-6 sm:w-7 h-6 sm:h-7 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${notification})` }}
        />
        <button className="w-[120px] sm:w-[130px] md:w-[140px] h-[35px] sm:h-[38px] md:h-[40px] border-[2px] sm:border-[3px] border-primary rounded-[20px] box-border text-primary text-sm sm:text-base">
          게시물 작성하기
        </button>
        <div className="w-[50px] sm:w-[55px] md:w-[60px] h-[50px] sm:h-[55px] md:h-[60px] rounded-full overflow-hidden">
          <img src={me} alt="profile" className="w-full h-full object-cover" />
        </div>
        <button
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

export default MainHeader;
