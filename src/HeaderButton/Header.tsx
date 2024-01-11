import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../Types/types";
import { Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../Store/Slice";
import { useSelector } from "react-redux";
import { useTheme } from "react-native-paper";

const Header = () => {
  const { canGoBack, goBack } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();

  const { isDark } = useSelector((root: RootState) => root.tasks);
  const theme = useTheme()
  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.containerButton}>
          <Button
            leftIcon={
              <Icon
                as={Ionicons}
                name="arrow-back"
                size="xl"
                color={isDark ? "#fff" : "#000"}
              />
            }
            onPress={() => goBack()}
            style={styles.boton}
          >
            <Text style={{ color:theme.colors.primary}}>Back</Text>
          </Button>
        </View>
      ) : undefined}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  boton: { backgroundColor: "transparent" },
  container: { marginHorizontal: 10 },
  containerButton: { alignItems: "flex-start" },
});
