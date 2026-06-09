import "./App.css";
import { useNotification } from "./Components/hooks/useNotification";
import Notfications from "./Components/Notfications";
const App = () => {
  const { triggerNotifications, NotificationComponent } =
    useNotification("bottom-left");
  return (
    <div>
      <button
        onClick={() =>
          triggerNotifications({
            type: "success",
            message: "Good Work!",
            duration: 30000,

            animation: "fade",
          })
        }
      >
        Trigger Success (Fade)
      </button>
      <button
        onClick={() =>
          triggerNotifications({
            type: "error",
            message: "Bad Work!",
            duration: 30000,

            animation: "pop",
          })
        }
      >
        Trigger Error (Pop)
      </button>
      <button
        onClick={() =>
          triggerNotifications({
            type: "info",
            message: "Info Work!",
            duration: 30000,

            animation: "slide",
          })
        }
      >
        Trigger Info (Slide)
      </button>
      <button
        onClick={() =>
          triggerNotifications({
            type: "warning",
            message: "Warning Work!",
            duration: 30000,

            animation: "slide",
          })
        }
      >
        Trigger Warning (Slide)
      </button>
      {NotificationComponent}
    </div>
  );
};

export default App;
