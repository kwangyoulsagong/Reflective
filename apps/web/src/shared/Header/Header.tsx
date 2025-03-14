import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/button";
import NotificationBell from "../../features/Notification/ui/NotificationBell";
import { CircleImage } from "../CircleImage/CircleImage";
import useGetProfile from "../constants/useGetProfile";
import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/api";
import { useQueryClient } from "@tanstack/react-query";

const Header: React.FC = () => {
  const { data } = useGetProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  interface MenuItem {
    label: string;
    action: () => void;
  }

  const menuItems: MenuItem[] = [
    { label: "마이페이지", action: () => navigate("/mypage") },
    { label: "프로필 설정", action: () => navigate("/settings") },
    {
      label: "로그아웃",
      action: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        queryClient.clear();

        navigate("/");
      },
    },
  ];

  return (
    <header className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-8 md:px-16 gap-4 sm:gap-0">
      <img
        onClick={() => navigate("/home")}
        src={logo}
        alt="logo"
        className="w-32 sm:w-36 md:w-40 cursor-pointer"
      />
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap sm:flex-nowrap">
        <NotificationBell />
        <Button onClick={() => navigate("/write")} variant="primary">
          게시물 작성하기
        </Button>
        <CircleImage image={data?.myProfile.image_url} />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="w-[11px] sm:w-[12px] md:w-[13px] h-[8px] sm:h-[9px] md:h-[10px] relative sm:right-2 md:right-4 sm:top-2 md:top-2"
          >
            <EllipsisVertical color="gray" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-primary text-[18px] sm:text-[22px] md:text-[24px] font-bold relative right-0 sm:right-3 md:right-5">
          {data?.myProfile.nickname}
        </span>
      </nav>
    </header>
  );
};

export default Header;
