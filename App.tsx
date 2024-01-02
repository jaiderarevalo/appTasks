import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Routes from "./src/Routes";
import { View, StyleSheet, Platform } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, setUpInterceptor, store } from "./src/Store/Slice";
import FlashMessage from "react-native-flash-message";
import { useStore } from "react-redux";

export default function App(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
              <Routes />
              <FlashMessage position={'top'} />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
