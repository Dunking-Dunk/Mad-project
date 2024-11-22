import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useLocation from "../hooks/use-location";
import { useAppState } from "../hooks/use-appState";
import { appStatusState } from "../store/action";
import Color from "../utils/Color";
import CustomDrawerContent from "../components/CustomDrawerContent";
import AllBus from "./AllBus";
import Feedback from "./Feedback";
import Contact from "./Contact";
import Home from "./Home";
import AnnouncementScreen from "./Announcement";
import { useTheme } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          // colors={colors}
          // darkMode={darkMode}
          // setDarkMode={setDarkMode}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: Color.bold,
        drawerActiveTintColor: Color.semiBold,
        drawerStatusBarAnimation: "fade",
        swipeEnabled: true,
        headerShown: false,
        drawerInactiveTintColor: Color.white,
      }}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="home" size={24} color={Color.white} />
          ),
        }}
      />
      <Drawer.Screen
        component={AllBus}
        name="Bus Routes"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="bus" size={24} color={Color.white} />
          ),
        }}
      />
      <Drawer.Screen
        component={AnnouncementScreen}
        name="Announcements"
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="announcement"
              size={24}
              color={Color.white}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={Feedback}
        name="Feedback"
        options={{
          drawerIcon: () => (
            <FontAwesome name="comments" size={24} color={Color.white} />
          ),
        }}
      />
      <Drawer.Screen
        component={Contact}
        name="Contact"
        options={{
          drawerIcon: () => (
            <Ionicons name="call" size={24} color={Color.white} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default BusRoute = () => {
  const dispatch = useDispatch();
  const appState = useAppState();

  useEffect(() => {
    new useLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(appStatusState(appState));
  }, [dispatch, appState]);

  return <DrawerNavigation />;
};
