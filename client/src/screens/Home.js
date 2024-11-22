import { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Map } from "../components/MapView";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getAllStop, getBus, getQuickStats, getBuses, getAllTracker } from "../store/action";
import Header from "../components/Header";
import { clientSocket } from "../api/socket";
import { useIsFocused } from "@react-navigation/native";
import DragUpView from "../components/DragUpView";
import { CalcDistance } from "../utils/distanceBetweenCoords";
import Loader from "../components/LoadingAnimation";
import Color from "../utils/Color";
import Container from "../components/CustomButton";
import { EventRegister } from "react-native-event-listeners";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import useLocation from "../hooks/use-location";
import { SafeAreaView } from "react-native-safe-area-context";

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const stops = useSelector((state) => state.stops.stops);
  const userCoords = useSelector((state) => state.user.user);
  const appState = useSelector((state) => state.user.appState);
  const stats = useSelector((state) => state.buses.quickStats);

  const [nearByStops, setNearByStops] = useState([]);
  const [nearByBuses, setNearByBuses] = useState([]);

  const isFocused = useIsFocused();
  const open = useSharedValue(false);
  const offsetTop = useSharedValue(0);

  useEffect(() => {
    new useLocation(dispatch);
      dispatch(getBuses());
    dispatch(getAllStop());
    dispatch(getQuickStats());
    dispatch(getAllTracker())
  }, [dispatch]);

  useEffect(() => {
    clientSocket.getNewBusAndStopAdded(dispatch);
  }, []);

  useEffect(() => {
    const nearByStops = new CalcDistance(userCoords).nearByStops(stops);
    setNearByStops(nearByStops);
  }, [userCoords, stops]);

  // useEffect(() => {
  //   const nearByBuses = new CalcDistance(userCoords).nearByBuses(busesLocation);
  //   setNearByBuses(nearByBuses);
  // }, [userCoords, busesLocation]);

  useEffect(() => {
    if (isFocused && appState === "active") {
      clientSocket.getAllBusLocations(dispatch);
    } else {
      clientSocket.stopAllBusLocation();
    }
    return () => {
      clientSocket.stopAllBusLocation();
    };
  }, [isFocused, appState]);

  const coordsPressHandler = (coords) => {
    EventRegister.emit("CloseDragUp");
    EventRegister.emit("ChangeStopCoords", { stopCoords: {latitude: coords[1], longitude: coords[0]} });
  };

  const getBusHandler = (bus) => {
    dispatch(getBus(bus)).then(() => {
      navigation.navigate("BusDetail", { busId: bus });
    });
  };

  const animatedQuickStats = useAnimatedStyle(() => {
    return {
      display: open.value ? "flex" : "none",
      top: withTiming(offsetTop.value, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      }),
    };
  });

  const renderNearByStops = useCallback(() => {
    if (nearByStops) {
      return nearByStops.map((stop) => {
        return (
          <Container
            key={stop.id}
            style={styles.nearByStopContainer}
            onPress={() => coordsPressHandler(stop.location.coordinate)}
          >
            <View style={styles.nearBusSubContainer}>
              {stop.busId.map((bus) => {
                return (
                  <Container
                    style={styles.busImageContainer}
                    key={bus.id}
                    onPress={() => getBusHandler(bus.id)}
                  >
                    <View style={styles.ImageSubContainer}>
                      <FontAwesome5
                        name="bus"
                        size={24}
                        color={Color.bold}
                        style={{
                          backgroundColor: Color.light,
                          padding: 5,
                          borderRadius: 20,
                        }}
                      />

                      <View style={styles.routeContainer}>
                        <Text style={styles.routeText}>
                          {bus.busNumber} {bus.busSet && bus.busSet}
                        </Text>
                      </View>
                    </View>
                  </Container>
                );
              })}
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.nearByStopText}>{stop.name}</Text>
            </View>
            {/* {stop.address && <Text>{stop.address}</Text>} */}
          </Container>
        );
      });
    }
  }, [nearByStops]);

  const renderNearByBuses = useCallback(() => {
    return nearByBuses.map((bus) => {
      return (
        <Container
          key={bus.id}
          style={styles.nearByStopContainer}
          onPress={() => coordsPressHandler(bus.coords[0])}
        >
          <View style={{ marginRight: 10 }}>
            <FontAwesome5
              name="bus"
              size={24}
              color={Color.semiBold}
              style={{
                backgroundColor: Color.light,
                padding: 5,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Text style={styles.nearByStopText}>
              9 b{/* {bus.busNumber}-{bus.busSet} */}
            </Text>
            <Text style={styles.nearByStopText}>Mogappair</Text>
          </View>
        </Container>
      );
    });
  }, [nearByBuses]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        open.value = false;
        offsetTop.value = 0;
      }}
    >
      <Header searchRequired={false} navigation={navigation} />
      <Container
        style={styles.quickStatsBtn}
        onPress={() => {
          open.value = !open.value;
          if (offsetTop.value === 70) {
            offsetTop.value = 0;
          } else {
            offsetTop.value = 70;
          }
        }}
      >
        <MaterialIcons name="preview" size={24} color={Color.bold} />
      </Container>
      {/* <Animated.View style={[styles.quickStatsContainer, animatedQuickStats]}>
        <Text>Total Bus: {stats.totalBus}</Text>
        <Text>Total Stop: {stats.totalStops}</Text>
        <Text style={styles.quickStatsHeaderText}>Morning to college</Text>
        <Text>{stats.morningToCollege} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 1 PM: </Text>
        <Text>{stats.returnAfter1} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 3:15 PM: </Text>
        <Text>{stats.returnAfter315} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 5 PM: </Text>
        <Text>{stats.returnAfter5} buses in all routes</Text>
      </Animated.View> */}
      {stops ? (
        <Map
          mapStyle={styles.map}
          allStops={stops}
          navigation={navigation}
        />
      ) : (
        <Loader color={Color.regular} size="large" />
      )}

      <DragUpView>
      <ScrollView>
        <View style={{padding: 15}}>
          <Container
            style={styles.announcementContainer}
            onPress={() => {
              navigation.navigate("Announcements");
            }}
          >
            <Text style={styles.announcementTitle}>Announcements</Text>
          </Container>
          <Text style={styles.title}>STOPS NEARBY</Text>
          {nearByStops?.length > 0 ? (
            renderNearByStops()
          ) : (
            <Text style={styles.title}>No Stops near by</Text>
          )}
          
          <Text style={{ ...styles.title, marginTop: 20 }}>BUS NEARBY</Text>

          {/* {nearByBuses?.length > 0 ? (
            renderNearByBuses()
          ) : (
            <Text style={styles.title}>No Bus near by</Text>
          )} */}
        </View>
        </ScrollView>
             </DragUpView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  quickStatsContainer: {
    position: "absolute",
    padding: 10,
    right: 110,
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: Color.light,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  quickStatsBtn: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: Color.light,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  quickStatsHeaderText: {
    fontWeight: "bold",
    marginTop: 10,
    color: Color.semiBold,
  },
  map: {
    flex: 1,
  },
  dragContainer: {
    padding: 15,
   
  },
  title: {
    textAlign: "center",
    color: Color.bold,
  },
  nearByStopContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: Color.light,
    padding:10,
    borderRadius: 20,
    marginTop: 10,
  },
  nearBusSubContainer: {
    display: "flex",
    flexDirection: 'wrap',
    gap: 4,
  },
  nearByStopText: {
    textTransform: "capitalize",
    color: Color.white,
    marginLeft: 10,
  },
  busImageContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Color.semiBold,
    padding: 8,
    borderRadius: 25,
    width: '100%'
  },
  ImageSubContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
  },

  routeText: {
    textTransform: "uppercase",
    color: Color.white,
  },
  announcementContainer: {
    width: "100%",
    height: 60,
    backgroundColor: Color.bold,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  announcementTitle: {
    fontSize: 20,
    color: Color.white,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
