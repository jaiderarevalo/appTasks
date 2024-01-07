import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

interface CardButtonProps {
  title: string;
  subtitle: string;
  icon1: string;
  onPress: () => void;
  colorAvatar?:string
  backgroundColor?:string
  borderWidth?:number
}

const CardButton: React.FC<CardButtonProps> = ({ title, subtitle, icon1, onPress, colorAvatar,backgroundColor,borderWidth }) => (
  <Card.Title
    title={title}
    subtitle={subtitle}
    left={(props) => <Avatar.Icon {...props} color={colorAvatar} style={{backgroundColor,borderWidth}}  icon={icon1} />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={onPress} />}
  />
);

export default CardButton;
