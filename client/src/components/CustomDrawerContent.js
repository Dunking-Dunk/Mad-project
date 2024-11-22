import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Switch } from "react-native";
import Color from "../utils/Color";
import { Text } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          color: Color.bold,
          marginVertical: 20,
          fontSize: 25,
          paddingHorizontal:15
        }}
      >
       Unfazed
      </Text>
      <DrawerItemList {...props} />

      {/* <Switch
        trackColor={{ false: Color.regular, true: Color.bold }}
        thumbColor={props.darkMode ? Color.regular : Color.bold}
        onValueChange={() => props.setDarkMode(!props.darkMode)}
        value={props.darkMode}
      /> */}
    </DrawerContentScrollView>
  );
}
