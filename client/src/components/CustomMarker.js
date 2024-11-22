import { Marker } from "react-native-maps";
import { memo } from "react";

const CustomMarker = ({ children, anchor, coordinate }) => {
  return (
    <Marker
      coordinate={{ latitude: coordinate[1], longitude: coordinate[0] }}
      anchor={anchor}
      tracksViewChanges={false}
    >
      {children}
    </Marker>
  );
};

export default memo(CustomMarker);
