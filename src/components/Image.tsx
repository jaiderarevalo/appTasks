import { Avatar } from "react-native-paper";

const ImageAvatar = ({ avatarUrl, size }: { size: number; avatarUrl: any }) => (
  <Avatar.Image
    size={size}
    source={avatarUrl}
    style={{ backgroundColor: "white" }}
  />
);

export default ImageAvatar;
