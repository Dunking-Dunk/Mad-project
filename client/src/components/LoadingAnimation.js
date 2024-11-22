import { View, StyleSheet, ActivityIndicator } from "react-native";
import { memo } from "react";
import Color from "../utils/Color";

const Loader = ({ size, color }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={Color.bold} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Loader);
