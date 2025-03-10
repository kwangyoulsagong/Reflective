import logo from "../../assets/logo.svg";
import toggle from "../../assets/toggle.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/button";
import NotificationBell from "../../features/Notification/ui/NotificationBell";
import { CircleImage } from "../CircleImage/CircleImage";
import useGetProfile from "../constants/useGetProfile";

const Header = () => {
  const { data, isLoading, isError } = useGetProfile();
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="w-full max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        Error loading data. Please try again.
      </div>
    );
  }
  return (
    <header className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-8 md:px-16 gap-4 sm:gap-0">
      <img
        onClick={() => navigate("/home")}
        src={logo}
        alt="logo"
        className="w-32 sm:w-36 md:w-40"
      />
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap sm:flex-nowrap">
        <NotificationBell />
        <Button onClick={() => navigate("/write")} variant="primary">
          게시물 작성하기
        </Button>
        <CircleImage image={data?.myProfile.image_url} />
        <button
          onClick={() => navigate("/mypage")}
          className="w-[11px] sm:w-[12px] md:w-[13px] h-[8px] sm:h-[9px] md:h-[10px] bg-no-repeat bg-center bg-contain relative sm:right-2 md:right-4 sm:top-2 md:top-4"
          style={{ backgroundImage: `url(${toggle})` }}
        />
        <span className="text-primary text-[18px] sm:text-[22px] md:text-[24px] font-bold relative right-0 sm:right-3 md:right-5">
          {data?.myProfile.nickname}
        </span>
      </nav>
    </header>
  );
};
export default Header;
