import React, { useEffect, useRef } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { BiSolidError } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import "./Notifications.css";

export type NotificationType = "success" | "error" | "info" | "warning";
export type NotificationAnimation = "fade" | "pop" | "slide";

export interface NotificationProps {
  type?: NotificationType;
  message: string;
  onClose: () => void;
  animation?: NotificationAnimation;
}

const iconStyles: React.CSSProperties = { marginRight: "10px" };

const IconsFactory = (type: NotificationType): React.ReactNode => {
  if (type === "info") return <CiCircleInfo style={iconStyles} />;
  if (type === "success") return <TiTick style={iconStyles} />;
  if (type === "error") return <BiSolidError style={iconStyles} />;
  return <CiWarning style={iconStyles} />;
};

const animationFactory: Record<NotificationAnimation, string> = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn",
};

const Notifications: React.FC<NotificationProps> = ({
  type = "info",
  message,
  onClose,
  animation = "slide",
}) => {
  if (!message) return null;

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.focus();
    }
  }, []);

  const iconComponent = IconsFactory(type);
  const animationClass = animationFactory[animation] || "slideIn";

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live={
        type === "error" || type === "warning" ? "assertive" : "polite"
      }
      tabIndex={-1}
      className={`notfications ${type} ${animationClass}`}
    >
      {iconComponent}
      {message}

      <button className="closeBtn" onClick={onClose} aria-label="Close notification">
        <IoCloseOutline />
      </button>
    </div>
  );
};

export default Notifications;
