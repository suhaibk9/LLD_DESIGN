import { useCallback, useState, useRef } from "react";
import Notfications from "../Notfications";
import { v4 as uuidv4 } from "uuid";
export const useNotification = (position) => {
  const [nofication, setNotfication] = useState([]);
  //   const timeoutRef = useRef();

  const triggerNotifications = useCallback((props) => {
    // clearTimeout(timeoutRef.current);
    const toastId = uuidv4();
    setNotfication((prev) => {
      return [...prev, { id: toastId, ...props }];
    });

    // timeoutRef.current =
    setTimeout(() => {
      setNotfication((prev) => prev.filter((noti) => noti.id !== toastId));
    }, props.duration);
  }, []);
  const handleClose = (notiId) => {
    setNotfication((prev) => prev.filter((noti) => noti.id !== notiId));
  };
  const NotificationComponent = nofication ? (
    <div className={position}>
      {nofication.map((noti) => (
        <Notfications
          {...noti}
          key={noti.id}
          onClose={() => handleClose(noti.id)}
        />
      ))}
    </div>
  ) : null;
  return { triggerNotifications, NotificationComponent };
};
