import { Marker } from "react-native-maps";
import { memo } from "react";
import { Image } from "react-native";

const RecFlagMarker = () => {
  return (
    <>
      {/* <Marker
        coordinate={{ latitude: 13.009577, longitude: 80.00433 }}
        anchor={{ x: 0, y: 1 }}
      >
        <Image source={require("../../assets/rec.png")} />
      </Marker> */}
      {/* <Marker coordinate={{ latitude: 13.009577, longitude: 80.00433 }}>
        <Image source={require("../../assets/pole1.png")} />
      </Marker> */}
    </>
  );
};

export default memo(RecFlagMarker);
