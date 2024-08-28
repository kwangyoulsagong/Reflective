import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import me from "../assets/me.jpeg";
import toggle from "../assets/toggle.svg";
const MainHeader = () => {
  const nickname = localStorage.getItem("nickname");
  return (
    <header className="mt-10 flex justify-between items-center w-full px-16">
      <img src={logo} alt="logo" className="w-20" />
      <nav className="flex items-center gap-4">
        <button
          className="w-7 h-7 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${notification})` }}
        />
        <button className="w-[140px] h-[40px] border-[3px] border-primary rounded-[20px] box-border text-primary">
          게시물 작성하기
        </button>
        <div className="w-[60px] h-[60px] rounded-[30px] overflow-hidden">
          <img
            src={me}
            alt="profile"
            className="w-[inherit] h-[inherit] object-cover"
          />
        </div>
        <button
          className="w-[13px] h-[10px] bg-no-repeat bg-center bg-contain relative right-4 top-4"
          style={{ backgroundImage: `url(${toggle})` }}
        />
        <span className="text-primary text-[24px] font-bold relative right-5">
          {nickname}
        </span>
      </nav>
    </header>
  );
};
export default MainHeader;
