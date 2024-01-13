import { StyleSheet, View } from "react-native";
import React from "react";
import { setLogout } from "../../Store/Slice/reducer/auth.slice";
import { RootState, useAppDispatch } from "../../Store/Slice";
import { RootStackParams } from "../../Types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import HeaderButton from "../../HeaderButton";
import ButtonR from "./Button";
import IconButtonR from "./ButtonIcon";
import CardButton from "./CardButton";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const Config = () => {
  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
 const {isDark} = useSelector((root:RootState) =>  root.tasks)
 
  const ThemeColor = useTheme();
  return (
    <View style={{backgroundColor: ThemeColor.colors.background, flex:1 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <HeaderButton />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <IconButtonR icon="cog" onPress={() => {}} size={25} />
        </View>
      </View>
      <View style={{alignItems: "center" }}>
        <CardButton
          onPress={() => navigate("Account")}
          icon1="account-cowboy-hat"
          subtitle="Actualización de Nombre y contraseña"
          title="Cuenta"
          colorAvatar={isDark ? '#fff' : '#000.'}
          backgroundColor={isDark ? '#000' : '#fff'}
          borderWidth={1}
        />
      </View>
      <View style={{paddingVertical:10,paddingHorizontal:10}}>
        <ButtonR
          onPress={() => handleLogout()}
          icon="logout"
          mode="outlined"
          borderRadius={100}
          TextButton="Cerrar session"
        />
      </View>
    </View>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {},
});
