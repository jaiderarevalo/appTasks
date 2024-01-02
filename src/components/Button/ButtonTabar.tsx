import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { Icon } from "native-base";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { setLogout } from "../../Store/Slice/reducer/auth.slice";
import { useAppDispatch } from "../../Store/Slice";
import { RootStackParams } from "../../Types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import HeaderButton from "../../HeaderButton";

const Config = () => {
  const { navigate } =
  useNavigation<StackNavigationProp<RootStackParams, "Home">>();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}} >
        <View><HeaderButton/></View>
        <View style={{ flex:1, alignItems:'flex-end',justifyContent:'center',paddingHorizontal:10}}>
        <Icon as={FontAwesome} name="cog" size="xl" color={"#000"} />
        </View>
      </View>
      <Button style={styles.containerbutton} type="outline"  onPress={()=>  navigate("Account")} >
        <Text style={styles.Text}>Cuenta</Text>
        <View style={styles.button}>
          <Icon as={FontAwesome} name="user-secret" size="xl" color={"#000"} />
        </View>
      </Button>
      <Button
        onPress={() => handleLogout()}
        type="outline"
        style={styles.containerbutton}
      >
        <Text style={styles.Text}>Salir</Text>
        <View style={styles.button}>
          <Icon as={Ionicons} name="log-out-outline" size="xl" color={"#000"} />
        </View>
      </Button>
    </View>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {},
  containerbutton: {},
  Text: {
    fontSize: 16,
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 5,
  },
  button: { paddingHorizontal: 20 },
});
