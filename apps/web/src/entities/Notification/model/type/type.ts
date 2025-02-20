export interface Notification {
  _id: string;
  notification_id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  sender_id: {
    user_id: string;
    nickname: string;
    profile_image: string;
  };
  post_id?: {
    _id?: string;
    post_id?: string;
    title?: string;
  };
  content?: string;
  is_read: boolean;
  created_date: string;
}
export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notification_id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notification_id: string) => Promise<void>;
  fetchNotifications: () => Promise<void>;
}
