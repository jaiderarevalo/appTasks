import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Routes from "./src/Routes";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootState, persistor, store } from "./src/Store/Slice";
import FlashMessage from "react-native-flash-message";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import { lightColor } from "./src/Theme/lightScheme";
import { darkColor } from "./src/Theme/darkScheme";
import ThemeProvider from "./src/Theme/ThemeProvider";

export const themelight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'#fff',
    primary:'#000',
    secondary:'rgba(140, 140, 140, 1)',
  }
};
export const themeDarkDefault = {
  ...DarkTheme,
  custom:'property',
  colors: {
    ...DarkTheme.colors,
    darkColor,
    background:'#262626',
    primary:'#fff', //titulos
    secondary:'rgba(230, 230, 200, 1)', // subtitulos
    onSecondary:'rgba(100, 149, 237, 1) '// botones

}
  };

export default function App() {
  
  const [states, setStates] = useState(false);
useEffect(()=>{
  setStates(false);
},[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
              <ThemeProvider>
                <Routes />
                </ThemeProvider>
                <FlashMessage position={"top"} />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
});
