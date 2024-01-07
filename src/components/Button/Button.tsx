import * as React from "react";
import { Button } from "react-native-paper";
interface MyComponentProps {
  icon?: string;
  mode?:
    | "text"
    | "outlined"
    | "contained"
    | "elevated"
    | "contained-tonal"
    | undefined;
  onPress: () => void;
  TextButton?: string;
  borderRadius?: number;
  children?: React.ReactNode;
  disable?: any;
  buttonColor?: string;
  textColor?: string;
}
const ButtonR: React.FC<MyComponentProps> = ({
  icon,
  mode,
  onPress,
  TextButton,
  borderRadius,
  children,
  disable,
  buttonColor,
  textColor,
}) => (
  <Button
    icon={icon}
    mode={mode}
    onPress={onPress}
    style={{ borderRadius}}
    textColor={textColor}
    disabled={disable}
    buttonColor={buttonColor}
  >
    {TextButton || children}
  </Button>
);

export default ButtonR;
