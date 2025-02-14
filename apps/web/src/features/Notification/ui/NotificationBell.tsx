import React, { useEffect, useRef, useState } from "react";
import useNotificationStore from "../../../entities/Notification/model/store/notificationStore";
import { useOnClickOutside } from "../../../entities/Notification/libs/hooks/useOnClickOutside";
import notification from "../../../assets/notification.svg";
import { NotificationList } from "./NotificationList";
import { useNotificationSSE } from "../../../entities/Notification/libs/hooks/useNotificationSSE";
const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 알림 관련 상태와 함수 가져오기
  const { unreadCount, fetchNotifications } = useNotificationStore();

  // SSE 연결 (전역적으로 유지)
  useNotificationSSE();

  // 컴포넌트 마운트 시 즉시 알림 로드
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // 알림 버튼 클릭 시 항상 최신 알림 다시 로드
          fetchNotifications();
        }}
        className="relative w-[30px] h-[30px] flex items-center justify-center"
      >
        <img src={notification} alt="notification" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto">
          <NotificationList onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
