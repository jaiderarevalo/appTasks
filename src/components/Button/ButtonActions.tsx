import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButtonR from "./ButtonIcon";
interface buttonInterface {
  isEdit?: boolean;
  onPress: any;
}

const ButtonActions = ({ isEdit, onPress }: buttonInterface) => {
  return (
    <View>
      <IconButtonR
        icon={isEdit ? "book-edit" : "delete"}
        onPress={() => onPress()}
        size={35}
        color={isEdit ? "rgba(255, 215, 0, 1)" : "red"}
      />
    </View>
  );
};

export default ButtonActions;

const styles = StyleSheet.create({});
