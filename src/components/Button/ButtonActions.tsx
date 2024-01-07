import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon } from "@rneui/themed";
interface buttonInterface {
  isEdit?: boolean;
  onPress: any;
}

const ButtonActions = ({ isEdit, onPress }: buttonInterface) => {
  return (
    <View>
      <Button
        icon={
          isEdit ? (
            <Icon
              name="edit"
              size={35}
              borderRadius={15}
              backgroundColor={"#ffd700"}
              color={"white"}
              
            />
          ) : (
            <Icon
              name="delete"
              size={35}
              borderRadius={15}
              backgroundColor={"red"}
              color={"white"}
            />
          )
        }
        type="clear"
        onPress={() => onPress()}
      />
    </View>
  );
};

export default ButtonActions;

const styles = StyleSheet.create({});
