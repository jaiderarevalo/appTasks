import React from 'react';
import { Switch } from 'react-native-paper';

interface ToggleDarkProps {
  isDarkTheme: boolean;
  onToggleSwitch: () => void;
}

const ToggleDark: React.FC<ToggleDarkProps> = ({ isDarkTheme, onToggleSwitch }) => {
  return (
    <Switch
      value={isDarkTheme}
      onValueChange={onToggleSwitch}
    />
  );
};

export default ToggleDark;
