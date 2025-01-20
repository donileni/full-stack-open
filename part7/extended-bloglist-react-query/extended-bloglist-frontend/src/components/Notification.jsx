import { useNotificationValue } from "../../NotificationContext";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const message = useNotificationValue()

  if (message === null) {
    return null;
  }

  return (
  <div>
    <Alert>
      {message}
    </Alert>
  </div>
  )
};

export default Notification;
