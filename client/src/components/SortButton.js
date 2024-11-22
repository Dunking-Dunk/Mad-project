import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Color from "../utils/Color";
import { AntDesign } from "@expo/vector-icons";
import { getSortBuses } from "../store/action";

const SortButton = () => {
  const dispatch = useDispatch();
  const [sortTitle, setSortTitle] = useState("All bus");
  const open = useSharedValue(false);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      display: open.value ? "flex" : "none",
      top: open.value
        ? withTiming(35, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
          })
        : 0,
    };
  });

  const handleRequest = (title, data) => {
    setSortTitle(title);
    dispatch(getSortBuses(data));
    open.value = !open.value;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sortTitle}</Text>

      <TouchableOpacity
        style={styles.sortContainer}
        onPress={() => (open.value = !open.value)}
      >
        <Text style={styles.text}>sort</Text>
        <AntDesign name="caretdown" size={10} color={Color.white} />
      </TouchableOpacity>
      <Animated.View style={[animatedHeight, styles.sortBtn]}>
        <TouchableOpacity
          style={styles.sortBtnContainer}
          onPress={() => {
            handleRequest("all bus", "all");
          }}
        >
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortBtnContainer}
          onPress={() => {
            handleRequest("1:00 pm buses", "1:00");
          }}
        >
          <Text style={styles.text}>1:00 pm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortBtnContainer}
          onPress={() => {
            handleRequest("3:15 pm buses", "3:15");
          }}
        >
          <Text style={styles.text}>3:15 pm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortBtnContainer}
          onPress={() => {
            handleRequest("5:00 pm buses", "5:00");
          }}
        >
          <Text style={styles.text}>5:00 pm</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    zIndex: 5,
  },
  title: {
    color: Color.white,
    fontSize: 20,
  
    textTransform: "uppercase",
  },
  sortContainer: {
    position: "absolute",
    right: 0,
    width: 70,
    height: 30,
    backgroundColor: Color.semiBold,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 6,
  },
  sortBtn: {
    zIndex: 5,
    position: "absolute",
    right: 0,
    backgroundColor: Color.medium,
    borderColor: Color.semiBold,
    borderWidth: 2,
    height: 110,
    width: 70,
    borderRadius: 10,
  },
  sortBtnContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.white,
    borderBottomWidth: 1,
  },
  text: {
    color: Color.white,
    marginBottom: 5,
  },
});

export default SortButton;
