import { useRef, useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import MapView, {
  Marker,
  Circle,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Color from "../utils/Color";
import Loader from "./LoadingAnimation";
import StopMarker from "./StopMarker";
import { useTheme } from "@react-navigation/native";
import { darkMap, standardMap } from "../utils/mapStyle";
import { EventRegister } from "react-native-event-listeners";
import { useSelector } from "react-redux";
import RecFlagMarker from "../utils/RecFlagMarker";
// @ts-nocheck

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const map = ({
  stops,
  mapStyle,
  allStops,
  busLiveLocation,
  detail,
  navigation,
  busPoly,
}) => {
  const userCoords = useSelector((state) => state.user.user);
  const trackers = useSelector((state) => state.trackers.trackers)
  const bus = busLiveLocation ? trackers.filter((tracker) => tracker.bus === busLiveLocation)[0]:[]

  const { dark } = useTheme();
  //ref/////////////////////////////
  const mapRef = useRef();
  const markerRef = useRef();
  //states////////////////////
  const [state, setState] = useState({
    userCoords: null,
    coordinate: null,
  });
 
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  
  const busPolyArr = busPoly?.map((poly) => ({
    latitude: poly[0],
    longitude: poly[1],
  }));

  //useEffect//////////////////////////////
  useEffect(() => {
    if (userCoords) {
      const { latitude, longitude } = userCoords;
      animate(latitude, longitude);
      updateState({
        userCoords: { latitude, longitude },
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  }, [userCoords]);

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "ChangeStopCoords",
      ({ stopCoords }) => {
        mapRef.current.animateToRegion({
          latitude: stopCoords.latitude,
          longitude: stopCoords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    );

    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);



  //helper function
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      state.coordinate?.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: state.userCoords.latitude,
      longitude: state.userCoords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };


  if (state.userCoords) {
    return (
      <View style={{ flex: 1 }}>

        <MapView
          style={{ ...mapStyle, ...styles.map }}
          initialRegion={{
            latitude: state.userCoords.latitude,
            longitude: state.userCoords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          onMapLoaded={() => {
            if (stops) {
              const coords = stops[0].location.coordinate
              mapRef.current?.animateToRegion({
                latitude: coords[1],
                longitude: coords[0],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              })
            }
           
          }}
          customMapStyle={dark ? darkMap : standardMap}
        >
          {allStops &&
            allStops.map((stop) => {
              return (
                <StopMarker
                  stop={stop}
                  key={stop.id}
                  showBus={true}
                  navigation={navigation}
                />
              );
            })}

          {trackers && !busLiveLocation &&
            trackers.map((bus) => {
             
              const coords = bus.coords
              return (
                <Marker.Animated
                  coordinate={{
                    latitude: coords[1],
                    longitude: coords[0],
                  }}
                  key={bus.id}
                  tracksViewChanges={false}
                  onPress={() => {
                    console.log(bus)
                      // navigation.navigate('BusDetail', { busId: bus.id, bus })
                  }}
                >
                  <View style={styles.busTracker}>
                    <Text
                      style={{
                        color: Color.white,
                        textTransform: "uppercase",
                      }}
                    >
                      {bus.onBusRoute}
                    </Text>
                  </View>
                </Marker.Animated>
              );
            })}

          {busLiveLocation && bus && 
            (
            <Marker.Animated
                coordinate={{
                    latitude: bus.coords[1],
                    longitude: bus.coords[0],
                  }}
              tracksViewChanges={false}
            >
              <View>
                <View style={styles.busTracker}>
                  <Text style={{ color: Color.white }}>
                    {bus.onBusRoute}
                  </Text>
                </View>
              </View>
            </Marker.Animated>
          )}

          {stops && busPoly && (
            <>
              <Polyline
                coordinates={busPolyArr}
                strokeWidth={4}
                strokeColor="#E25E3E"
                lineCap="round"
                lineJoin="round"
              />
              {stops.map((stop, index) => {
                return <StopMarker key={index} stop={stop} showBus={false} />;
              })}
            </>
          )}
          <RecFlagMarker />
          {!detail && (
            <Circle
              radius={2000}
              center={state.userCoords}
              strokeColor={Color.bold}
            />
          )}

          <Marker.Animated
            ref={markerRef}
            coordinate={state.coordinate}
            tracksViewChanges={false}
          >
            <FontAwesome name="circle-o" size={18} color={Color.white} />
          </Marker.Animated>
        </MapView>
        {/* </Canvas> */}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 250,
            right: 20,
            zIndex: 2,
          }}
          onPress={onCenter}
        >
          <MaterialIcons name="gps-fixed" size={34} color={Color.bold} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return <Loader size="large" color={Color.regular} />;
  }
};
const Map = map;
export { Map };

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: Dimensions.get("screen").height / 5.5,
  },
  busTracker: {
    width: 30,
    height: 30,
    backgroundColor: Color.bold,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
