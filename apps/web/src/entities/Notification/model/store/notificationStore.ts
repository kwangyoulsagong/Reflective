import { create } from "zustand";
import { NotificationStore } from "../type/type";
import { axiosInstance } from "../../../../shared/api/axiosinstance";
import postNewToken from "../../../../shared/api/postNewToken";

const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  setNotifications: (notifications) => {
    set({ notifications });
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: async (notification_id) => {
    try {
      const { data } = await axiosInstance.patch(
        `api/v1/notifications/${notification_id}/read`
      );

      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification._id === notification_id
            ? { ...notification, is_read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));

      return data;
    } catch (error) {
      // 401 에러 처리
      if (error instanceof Error && error.message.includes("401")) {
        try {
          await postNewToken();
          // 토큰 갱신 후 재시도 - get()을 사용하여 현재 메서드에 접근
          return await get().markAsRead(notification_id);
        } catch (refreshError) {
          set({
            error:
              refreshError instanceof Error
                ? refreshError.message
                : "인증 오류가 발생했습니다.",
          });
          throw refreshError;
        }
      }

      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  markAllAsRead: async () => {
    try {
      const { data } = await axiosInstance.patch(
        "api/v1/notifications/read-all"
      );

      set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          is_read: true,
        })),
        unreadCount: 0,
      }));

      return data;
    } catch (error) {
      // 401 에러 처리
      if (error instanceof Error && error.message.includes("401")) {
        try {
          await postNewToken();
          // 토큰 갱신 후 재시도 - get()을 사용하여 현재 메서드에 접근
          return await get().markAllAsRead();
        } catch (refreshError) {
          set({
            error:
              refreshError instanceof Error
                ? refreshError.message
                : "인증 오류가 발생했습니다.",
          });
          throw refreshError;
        }
      }

      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  deleteNotification: async (notification_id) => {
    try {
      await axiosInstance.delete(`api/v1/notifications/${notification_id}`);

      set((state) => {
        const notification = state.notifications.find(
          (n) => n._id === notification_id
        );
        return {
          notifications: state.notifications.filter(
            (n) => n._id !== notification_id
          ),
          unreadCount:
            notification && !notification.is_read
              ? state.unreadCount - 1
              : state.unreadCount,
        };
      });
    } catch (error) {
      // 401 에러 처리
      if (error instanceof Error && error.message.includes("401")) {
        try {
          await postNewToken();
          // 토큰 갱신 후 재시도 - get()을 사용하여 현재 메서드에 접근
          return await get().deleteNotification(notification_id);
        } catch (refreshError) {
          set({
            error:
              refreshError instanceof Error
                ? refreshError.message
                : "인증 오류가 발생했습니다.",
          });
          throw refreshError;
        }
      }

      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("api/v1/notifications");

      set({
        notifications: data.notifications,
        unreadCount: data.unreadCount,
        isLoading: false,
        error: null,
      });

      return data;
    } catch (error) {
      // 401 에러 처리
      if (error instanceof Error && error.message.includes("401")) {
        try {
          await postNewToken();
          // 토큰 갱신 후 재시도 - 로직을 직접 실행
          set({ isLoading: true });
          const { data } = await axiosInstance.get("api/v1/notifications");

          set({
            notifications: data.notifications,
            unreadCount: data.unreadCount,
            isLoading: false,
            error: null,
          });

          return data;
        } catch (refreshError) {
          set({
            error:
              refreshError instanceof Error
                ? refreshError.message
                : "인증 오류가 발생했습니다.",
            isLoading: false,
          });
          throw refreshError;
        }
      }

      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useNotificationStore;
