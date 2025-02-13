import { create } from "zustand";
import { NotificationStore } from "../type/type";
import { axiosInstance } from "../../../../shared/api/axiosinstance";

const useNotificationStore = create<NotificationStore>((set) => ({
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
        `/notifications/${notification_id}/read`
      );

      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.notification_id === notification_id
            ? { ...notification, is_read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));

      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  markAllAsRead: async () => {
    try {
      const { data } = await axiosInstance.patch("/notifications/read-all");

      set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          is_read: true,
        })),
        unreadCount: 0,
      }));

      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  deleteNotification: async (notification_id) => {
    try {
      await axiosInstance.delete(`/notifications/${notification_id}`);

      set((state) => {
        const notification = state.notifications.find(
          (n) => n.notification_id === notification_id
        );
        return {
          notifications: state.notifications.filter(
            (n) => n.notification_id !== notification_id
          ),
          unreadCount:
            notification && !notification.is_read
              ? state.unreadCount - 1
              : state.unreadCount,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/notifications");

      set({
        notifications: data.notifications,
        unreadCount: data.unreadCount,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useNotificationStore;
