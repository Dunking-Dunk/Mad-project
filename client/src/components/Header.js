import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { getBuses } from "../store/action";
import Color from "../utils/Color";

const Header = ({ navigation, searchRequired }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(getBuses(search));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerMenuContainer}>
        <Feather
          name="menu"
          size={32}
          color={Color.bold}
          onPress={() => navigation.openDrawer()}
          style={styles.headerMenu}
        />
      </View>
      {searchRequired && (
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Enter Your Bus No or Location"
          placeholderTextColor={Color.white}
          onSubmitEditing={onSubmit}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  input: {
    position: "absolute",
    width: "70%",
    height: 50,
    backgroundColor: Color.semiBold,
    zIndex: 2,
    right: 30,
    top: 60,
    padding: 10,
    borderRadius: 30,
    fontSize: 15,
    fontWeight: "bold",
    color: Color.white
  },
  headerMenuContainer: {
    position: "absolute",
    top: 60,
    left: 15,
    borderRadius: 50,
    padding: 10,
    backgroundColor: Color.semiBold,
  },
  headerMenu: {},
});

export default memo(Header);
