import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../utils/Color";
import Container from "./CustomButton";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { getBus } from "../store/action";

const StopMarker = ({ stop, showBus, navigation }) => {
  const dispatch = useDispatch();

  const getBusHandler = (bus) => {
    dispatch(getBus(bus)).then(() => {
      navigation.navigate("BusDetail", { busId: bus });
    });
  };

  return (
    <Marker
      coordinate={{
        latitude: stop.location.coordinate[1],
        longitude: stop.location.coordinate[0],
      }}
      title={stop.name}
      tracksViewChanges={false}
    >
      <MaterialCommunityIcons name="bus-stop" size={24} color={Color.bold} />
      <Callout
        tooltip
        onPress={() => {
          if (stop.busId[0]) getBusHandler(stop.busId[0]?.id);
        }}
      >
        <View>
          <View style={styles.bubble}>
            <View style={styles.row}>
              <Text style={{ fontWeight: "bold" }}>Stop: </Text>
              <Text style={styles.text}>{stop.name}</Text>
            </View>
            {stop.address && (
              <>
                <Text style={{ fontWeight: "bold" }}>Address: </Text>
                <View style={styles.row}>
                  <Text style={styles.text}>{stop.address}</Text>
                </View>
              </>
            )}

            {showBus && stop.busId[0] && (
              <>
                <Text style={{ fontWeight: "bold" }}>Bus: </Text>
                <Container
                  style={styles.busImageContainer}
                  key={stop.busId[0]?.id}
                >
                  <View style={styles.ImageSubContainer}>
                    <FontAwesome5
                      name="bus"
                      size={20}
                      color={Color.semiBold}
                      style={{
                        backgroundColor: Color.bold,
                        padding: 5,
                        borderRadius: 20,
                      }}
                    />

                    <View style={styles.routeContainer}>
                      <Text style={styles.routeText}>
                        {stop.busId[0]?.busNumber} {stop.busId[0]?.busSet}
                      </Text>
                      <Text style={styles.routeText}>
                        {stop.busId[0]?.busName}
                      </Text>
                    </View>
                  </View>
                </Container>
              </>
            )}
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  bubble: {
  display: 'flex',
    flexDirection: "column",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: Color.light,
    width: 180,
    borderColor: Color.bold,
    alignSelf: "flex-start",
    padding: 8,
    gap: 1
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: Color.bold,
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: Color.bold,
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    textTransform: "capitalize",
    color: Color.white
  },
  busImageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    backgroundColor: Color.semiBold,
    padding: 5,
    borderRadius: 25,
  },
  ImageSubContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  routeText: {
    textTransform: "capitalize",
    color: Color.white,
    fontSize: 12,
  },
});

export default memo(StopMarker);
