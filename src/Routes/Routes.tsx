import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Slice";
import Home from "../Views/Home";
import Register from "../Views/Register";
import Login from "../Views/Login";
import Tasks from "../Views/tasks/Tasks";
import { Icon } from "@rneui/themed";
import Config from "../components/Button/ButtonTabar";
import UserAccount from "../configs/UserAccount";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  
  const { isDark } = useSelector((root: RootState) => root.tasks);
  const theme = useTheme();
  return (
    <Tab.Navigator 
    tabBarOptions={{
      activeTintColor: isDark ?'blue':'',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor:'',
      },
    }}
  >
      <Tab.Screen
        name="Task"
        component={Tasks}
        options={{
          tabBarStyle:{backgroundColor:'#ccc'},
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color, size }) => (
            <Icon name="create" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" type="font-awesome" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const { isLogin } = useSelector((root: RootState) => root.auth);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {isLogin ? (
          (
            <Stack.Navigator>
              <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
           <Stack.Screen
              name="Account"
              component={UserAccount}
              options={{ headerShown: false }}
            />
            </Stack.Navigator>
          ) || (
            <Stack.Navigator>
              <Stack.Screen
                name="Account"
                component={UserAccount}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )
        ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Routes;
