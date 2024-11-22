
import { useEffect, useState } from "react";
import axios from "axios";

import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const helperFunction = async () => {
      try {
        console.log('working')
       await axios.put(
          `http://10.0.2.2:4000/api/gps-tracking/gps-02?lat=${coords.latitude}&lng=${coords.longitude}&speed=10`
        );
      
      } catch (err) {
        console.log(err);
      }
    };

    helperFunction();
  }, [coords]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 13.078375009897568,
          longitude: 80.18086532484115,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1, width: "100%", height: "100%" }}
        onRegionChange={(e) => {
          setCoords({latitude: e.latitude, longitude: e.longitude});
        }}
      >
        <Marker
          draggable
          coordinate={coords}
          // coordinate={}
          onDragEnd={(e) => console.log(e)}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
