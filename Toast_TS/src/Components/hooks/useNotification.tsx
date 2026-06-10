import { useCallback, useState } from "react";
import Notifications from "../Notifications";
import type { NotificationType, NotificationAnimation } from "../Notifications";

export type NotificationPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  duration: number;
  animation?: NotificationAnimation;
}

export type TriggerNotificationProps = Omit<NotificationItem, "id">;

export const useNotification = (position: NotificationPosition) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const triggerNotifications = useCallback((props: TriggerNotificationProps) => {
    const toastId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 9);

    setNotifications((prev) => {
      return [...prev, { id: toastId, ...props }];
    });

    setTimeout(() => {
      setNotifications((prev) => prev.filter((noti) => noti.id !== toastId));
    }, props.duration);
  }, []);

  const handleClose = (notiId: string) => {
    setNotifications((prev) => prev.filter((noti) => noti.id !== notiId));
  };

  const NotificationComponent = notifications.length > 0 ? (
    <div className={position}>
      {notifications.map((noti) => (
        <Notifications
          key={noti.id}
          type={noti.type}
          message={noti.message}
          animation={noti.animation}
          onClose={() => handleClose(noti.id)}
        />
      ))}
    </div>
  ) : null;

  return { triggerNotifications, NotificationComponent };
};
