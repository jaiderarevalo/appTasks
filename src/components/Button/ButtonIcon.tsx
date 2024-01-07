import { background } from 'native-base/lib/typescript/theme/styled-system';
import * as React from 'react';
import { IconButton } from 'react-native-paper';

interface MyIconButtonProps {
  icon: string;
  color?: string | undefined;
  size: number;
  onPress: () => void;
}

const IconButtonR: React.FC<MyIconButtonProps> = ({ icon, color, size, onPress }) => (
 
    <IconButton
    icon={icon}
    iconColor={color}
    size={size}
    onPress={onPress}
  />
);

export default IconButtonR;
