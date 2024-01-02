import { showMessage, hideMessage } from "react-native-flash-message";

interface CreateAlarmParams {
  message: string;
  type: any ;
  duration?: number;
  Icons: string;
}

export const createAlarm = ({
  message,
  type,
  duration = 3000,
}: CreateAlarmParams) => {
  showMessage({
    message,
    type,
  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);
  };
};
