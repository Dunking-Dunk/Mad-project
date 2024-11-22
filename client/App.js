import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./src/utils/Color";
import { configureStore } from "./src/store/reducer";
import FlashMessage from "react-native-flash-message";
import { useNotification } from "./src/hooks/use-notification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Main from "./src/screens/Main";
import BusDetail from "./src/screens/BusDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const store = configureStore();
  const scheme = useColorScheme();
  useNotification();

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme ? DarkTheme : LightTheme}>
        <StatusBar hidden={false} />
        <Stack.Navigator
          initialRouteName="main"
          screenOptions={{
            animationEnabled: true,
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="BusDetail" component={BusDetail} />
        </Stack.Navigator>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
}
