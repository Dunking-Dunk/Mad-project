import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { StyleSheet, View, TouchableHighlight, Dimensions } from "react-native";
import Color from "../utils/Color";
import { EventRegister } from "react-native-event-listeners";

const DragUpView = ({ children }) => {
  const dimension = Dimensions.get("window");
  const y = useSharedValue(dimension.height / 3.5);

  useEffect(() => {
    const listener = EventRegister.addEventListener("CloseDragUp", () => {
      y.value = dimension.height / 3.2;
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(y.value, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      }),
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = event.y;
    },
    onActive: (event, ctx) => {
      if (event.translationY < ctx.startY) {
        y.value = dimension.height / 1.2;
      } else {
        y.value = dimension.height / 3.5;
      }
    },
  });

  return (
    <Animated.View style={[styles.container, animatedHeight]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <TouchableHighlight style={styles.upGestureBtn}>
              <></>
            </TouchableHighlight>
            <View style={styles.subContainer}>{children}</View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

export default DragUpView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Color.semiBold,
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
    zIndex: 5,
  },
  subContainer: {
    backgroundColor: Color.regular,
    borderRadius: 35,
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  upGestureBtn: {
    zIndex: 2,
    width: 150,
    height: 5,
    borderRadius: 10,
    position: "absolute",
    top: -15,
    left: "50%",
    transform: [
      {
        translateX: -70,
      },
    ],
    backgroundColor: Color.bold,
  },
});
