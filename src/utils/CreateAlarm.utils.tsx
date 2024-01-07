import { showMessage, hideMessage } from "react-native-flash-message";

interface CreateAlarmParams {
  message: string;
  type: "success" | "danger" | "warning" | "info";
  duration?: number;
}

export const createAlarm = ({
  message,
  type,
  duration = 3000,
}: CreateAlarmParams) => {
  showMessage({
    message,
    type,
    icon: `${type}`,
  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);
  };
};
