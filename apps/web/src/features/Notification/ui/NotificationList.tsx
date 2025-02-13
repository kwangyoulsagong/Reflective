import React, { useEffect } from "react";
import useNotificationStore from "../../../entities/Notification/model/store/notificationStore";

import { useNotificationSSE } from "../../../entities/Notification/libs/hooks/useNotificationSSE";
import { formatRelativeTime } from "@repo/ui/time";
interface NotificationListProps {
  onClose: () => void;
}
export const NotificationList = ({ onClose }: NotificationListProps) => {
  const {
    notifications,
    markAsRead,
    deleteNotification,
    fetchNotifications,
    isLoading,
    error,
  } = useNotificationStore();

  useNotificationSSE();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  console.log(notifications);
  const getNotificationText = (notification: any) => {
    switch (notification.type) {
      case "LIKE":
        return "님이 회원님의 게시글을 좋아합니다";
      case "COMMENT":
        return "님이 회원님의 게시글에 댓글을 남겼습니다";
      case "FOLLOW":
        return "님이 회원님을 팔로우하기 시작했습니다";
      default:
        return "";
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="py-2">
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500">알림이 없습니다</div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.notification_id}
            className={`p-4 hover:bg-gray-50 ${
              notification.is_read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-bold"></span>
                    {getNotificationText(notification)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(notification.created_date)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!notification.is_read && (
                  <button
                    onClick={() => markAsRead(notification.notification_id)}
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    읽음
                  </button>
                )}
                <button
                  onClick={() =>
                    deleteNotification(notification.notification_id)
                  }
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
