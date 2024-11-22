// import { Text, View, StyleSheet } from "react-native";
// import { useState } from "react";
// import { Map } from "../components/MapView";
// import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

// import Loader from "../components/LoadingAnimation";
// import DragUpView from "../components/DragUpView";
// import Color from "../utils/Color";
// import StepProgressBar from "../components/StepProgressBar";
// import { clientSocket } from "../api/socket";

// import CustomButton from "../components/CustomButton";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { CalcDistance } from "../utils/distanceBetweenCoords";
// import { getDistanceAndTime } from "../utils/getDistanceAndTime";

// const BusDetail = ({ navigation, route }) => {
//   const routeData = route.params;
//   const dispatch = useDispatch()
//   const appState = useSelector((state) => state.user.appState);

//   let bus = routeData.bus
//     ? routeData.bus
//     : useSelector((state) => state.buses.bus);

//   const distanceTime = getDistanceAndTime(bus.stops_distance_time)
  
//   const [routeInfo, setRouteInfo] = useState({
//     distance: 0,
//     elapsedTime: 0,
//   });
  

//   useEffect(() => {
//     if (bus) {
//       if (appState === "active")
//         clientSocket.getBusLocation(bus.tracker, dispatch);
//       else clientSocket.stopBusLocation(bus.tracker);

//       return () => {
//         clientSocket.stopBusLocation(bus.tracker);
//       };
//     }
//   }, [bus, appState]);



//   if (bus) {
//     return (
//       <View style={styles.container}>
//         <CustomButton
//           onPress={() => navigation.pop()}
//           style={styles.headerMenuContainer}
//         >
//           <AntDesign name="arrowleft" size={24} color={Color.bold} />
//         </CustomButton>

//         {routeInfo ? (
//           <Map
//             stops={bus?.stops}
//             mapStyle={styles.map}
//             busLiveLocation={routeData.busId}
//             detail={true}
//             busPoly={bus.stops_polyline}
//           />
//         ) : (
//           <Loader size="large" />
//         )}

//         <DragUpView>
//           <View style={styles.busContainer}>
//             <View style={styles.routeInfoContainer}>
//               <Text style={styles.routeInfoText}>
//                 {distanceTime[0]} KM
//               </Text>
//               <Text style={styles.routeInfoText}>
//                 {distanceTime[1]}
//               </Text>
//             </View>

//             <View style={styles.detailContainer}>
//               <Text style={styles.busNumber}>
//                 {bus.busNumber}
//                 {bus.busSet && bus.busSet}
//               </Text>
//               <Text style={styles.busText}>{bus.busName}</Text>
//             </View>
//             <View style={styles.detailContainer}>
//               <Text style={styles.busText}>
//                 <Text style={styles.textBold}>Total Seats: </Text> {bus.seats}{" "}
//                 <MaterialCommunityIcons
//                   name="seat"
//                   size={24}
//                   color={Color.bold}
//                 />
//               </Text>
//               <Text style={styles.textBold}>{bus.ac ? "AC" : "NON-AC"}</Text>
//             </View>
//             <Text style={styles.busText}>{bus.description}</Text>
//             <Text style={styles.busText}>
//               {bus.status ? (
//                 <AntDesign name="checkcircle" size={20} color="green" />
//               ) : (
//                 <AntDesign name="minuscircle" size={20} color="red" />
//               )}
//             </Text>

//             <View style={{width: '100%', height: '100%',marginTop: 10, paddingBottom: 160}}>
//               <StepProgressBar distance_time={bus.stops_distance_time} steps={bus.stops} />
//             </View>
//           </View>
//         </DragUpView>
//       </View>
//     );
//   } else {
//     return <Loader size="large" />;
//   }
// };

// export default BusDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   headerMenuContainer: {
//     zIndex: 1,
//     position: "absolute",
//     top: 60,
//     left: 15,
//     borderRadius: 50,
//     padding: 10,
//     backgroundColor: Color.semiBold,
//   },

//   busContainer: {
//     padding: 20,
//     flex: 1,
//   },
//   routeInfoContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     paddingBottom: 10,
//   },
//   routeInfoText: {
//     backgroundColor: Color.bold,
//     padding: 10,
//     borderRadius: 5,
//     color: Color.white,
//   },

//   detailContainer: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   busNumber: {
//     fontSize: 24,
//     textTransform: "uppercase",
//     color: Color.white,
//   },
//   busText: {
//     marginBottom: 3,
//     color: Color.white,
//     fontSize: 16,
//     textTransform: "capitalize",
//   },
//   textBold: {
//     fontWeight: "bold",
//     color: Color.white,
//   },
//   stopContainer: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//      },
//   stopCard: {
//     width: '100%',
//     gap: 5,
//   },
//   stopText: {
//     color: Color.white
//   },
// });

import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map } from "../components/MapView";
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

import Loader from "../components/LoadingAnimation";
import DragUpView from "../components/DragUpView";
import Color from "../utils/Color";
import StepProgressBar from "../components/StepProgressBar";
import { clientSocket } from "../api/socket";

import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { CalcDistance } from "../utils/distanceBetweenCoords";
import { getDistanceAndTime } from "../utils/getDistanceAndTime";
import MapView, { Marker, Polyline } from "react-native-maps";
import { darkMap,  standardMap } from "../utils/mapStyle";

const Tab = createBottomTabNavigator();

const BusDetailScreen = ({ navigation, route }) => {
  const routeData = route.params;
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.user.appState);

  let bus = routeData.bus
    ? routeData.bus
    : useSelector((state) => state.buses.bus);

  const distanceTime = getDistanceAndTime(bus.stops_distance_time);

  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    elapsedTime: 0,
  });

  useEffect(() => {
    if (bus) {
      if (appState === "active")
        clientSocket.getBusLocation(bus.tracker, dispatch);
      else clientSocket.stopBusLocation(bus.tracker);

      return () => {
        clientSocket.stopBusLocation(bus.tracker);
      };
    }
  }, [bus, appState]);
  
  if (bus) {
    return (
      <View style={styles.container}>
        <CustomButton
          onPress={() => navigation.pop()}
          style={styles.headerMenuContainer}
        >
          <AntDesign name="arrowleft" size={24} color={Color.bold} />
        </CustomButton>

        {routeInfo ? (
          <Map
            stops={bus?.stops}
            mapStyle={styles.map}
            busLiveLocation={routeData.busId}
            detail={true}
            busPoly={bus.stops_polyline}
          />
        ) : (
          <Loader size="large" />
        )}

        <DragUpView>
          <View style={styles.busContainer}>
            <View style={styles.routeInfoContainer}>
              <Text style={styles.routeInfoText}>
                {distanceTime[0]} KM
              </Text>
              <Text style={styles.routeInfoText}>
                {distanceTime[1]} 
              </Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.busNumber}>
                {bus.busNumber}
                {bus.busSet && bus.busSet}
              </Text>
              <Text style={styles.busText}>{bus.busName}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.busText}>
                <Text style={styles.textBold}>Total Seats: </Text> {bus.seats}{" "}
                <MaterialCommunityIcons
                  name="seat"
                  size={24}
                  color={Color.bold}
                />
              </Text>
              <Text style={styles.textBold}>{bus.ac ? "AC" : "NON-AC"}</Text>
            </View>
            <Text style={styles.busText}>{bus.description}</Text>
            <Text style={styles.busText}>
              {bus.status ? (
                <AntDesign name="checkcircle" size={20} color="green" />
              ) : (
                <AntDesign name="minuscircle" size={20} color="red" />
              )}
            </Text>

            <View style={{ width: '100%', height: '100%', marginTop: 10, paddingBottom: 160 }}>
              <StepProgressBar distance_time={bus.stops_distance_time} steps={bus.stops} />
            </View>
          </View>
        </DragUpView>
      </View>
    );
  } else {
    return <Loader size="large" />;
  }
};

const VehicleDetailScreen = () => {
  const [vehicleHealthStatus, setVehicleHealthStatus] = useState(null);
  const [healthPercentage, setHealthPercentage] = useState(0);

  // Mock data for vehicle details
  const mockVehicleData = {
    engineStatus: "Running",
    temperature: "85°C",
    fuelLevel: "60%",
    batteryStatus: "Good",
    oilPressure: "Normal",
    tirePressure: "32 PSI",
    coolantLevel: "75%",
    brakeFluid: "Optimal",
    rpm: "3000 RPM",
    speed: "80 km/h",
    odometer: "15000 km",
    transmissionFluid: "Optimal",
    engineLoad: "70%",
    throttlePosition: "45%",
    airIntakeTemp: "30°C",
    ambientAirTemp: "28°C",
    fuelType: "Petrol",
    fuelConsumptionRate: "6.5 L/100km",
    catalyticConverterTemp: "500°C",
  };

  // Function to check vehicle health status
  const checkVehicleHealth = () => {
    // Randomize health status and health percentage
    const randomHealthPercentage = Math.floor(Math.random() * 100) + 1;
    setHealthPercentage(randomHealthPercentage);

    if (randomHealthPercentage > 70) {
      setVehicleHealthStatus("Healthy");
      Alert.alert("Vehicle Health Status", "The vehicle is in good condition.");
    } else {
      setVehicleHealthStatus("Maintenance Required");
      const possibleIssues = [
        "Check engine oil level.",
        "Inspect tire pressure.",
        "Battery health might be low.",
        "Coolant level might be insufficient.",
        "Brake fluid needs attention.",
        "Transmission fluid might need a refill.",
      ];
      const randomIssue = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
      Alert.alert("Maintenance Required", `The vehicle needs maintenance. Possible issue: ${randomIssue}`);
    }
  };

  return (
    <ScrollView style={styles.vehicleContainer}>
      <TouchableOpacity style={styles.checkHealthButton} onPress={checkVehicleHealth}>
        <Text style={styles.checkHealthButtonText}>Check Vehicle Health</Text>
      </TouchableOpacity>

      {vehicleHealthStatus && (
        <View style={styles.healthStatusBarContainer}>
          <Text style={styles.textBold}>Vehicle Health Status: {vehicleHealthStatus}</Text>
          <View style={styles.healthStatusBarOuter}>
            <View style={[styles.healthStatusBarInner, { width: `${healthPercentage}%` }]} />
          </View>
        </View>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Ionicons name="ios-speedometer" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Engine Status</Text>
          <Text style={styles.cardValue}>{mockVehicleData.engineStatus}</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="thermometer-half" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Temperature</Text>
          <Text style={styles.cardValue}>{mockVehicleData.temperature}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="fuel" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Fuel Level</Text>
          <Text style={styles.cardValue}>{mockVehicleData.fuelLevel}</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="battery-full" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Battery Status</Text>
          <Text style={styles.cardValue}>{mockVehicleData.batteryStatus}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="engine-outline" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Engine Load</Text>
          <Text style={styles.cardValue}>{mockVehicleData.engineLoad}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="transmission-tower" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Transmission Fluid</Text>
          <Text style={styles.cardValue}>{mockVehicleData.transmissionFluid}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="tint" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Oil Pressure</Text>
          <Text style={styles.cardValue}>{mockVehicleData.oilPressure}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="car-tire-alert" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Tire Pressure</Text>
          <Text style={styles.cardValue}>{mockVehicleData.tirePressure}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="gauge" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Throttle Position</Text>
          <Text style={styles.cardValue}>{mockVehicleData.throttlePosition}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="air-filter" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Air Intake Temp</Text>
          <Text style={styles.cardValue}>{mockVehicleData.airIntakeTemp}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="snowflake-o" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Coolant Level</Text>
          <Text style={styles.cardValue}>{mockVehicleData.coolantLevel}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="car-brake-fluid-level" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Brake Fluid</Text>
          <Text style={styles.cardValue}>{mockVehicleData.brakeFluid}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Ionicons name="ios-speedometer-outline" size={30} color={Color.bold} />
          <Text style={styles.cardText}>RPM</Text>
          <Text style={styles.cardValue}>{mockVehicleData.rpm}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="speedometer" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Speed</Text>
          <Text style={styles.cardValue}>{mockVehicleData.speed}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="road" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Odometer</Text>
          <Text style={styles.cardValue}>{mockVehicleData.odometer}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="temperature-celsius" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Ambient Air Temp</Text>
          <Text style={styles.cardValue}>{mockVehicleData.ambientAirTemp}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="fuel" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Fuel Type</Text>
          <Text style={styles.cardValue}>{mockVehicleData.fuelType}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="gas-station" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Fuel Consumption Rate</Text>
          <Text style={styles.cardValue}>{mockVehicleData.fuelConsumptionRate}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="fire" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Catalytic Converter Temp</Text>
          <Text style={styles.cardValue}>{mockVehicleData.catalyticConverterTemp}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="fuel" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Fuel Level</Text>
          <Text style={styles.cardValue}>{mockVehicleData.fuelLevel}</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="battery-full" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Battery Status</Text>
          <Text style={styles.cardValue}>{mockVehicleData.batteryStatus}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="tint" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Oil Pressure</Text>
          <Text style={styles.cardValue}>{mockVehicleData.oilPressure}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="car-tire-alert" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Tire Pressure</Text>
          <Text style={styles.cardValue}>{mockVehicleData.tirePressure}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="snowflake-o" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Coolant Level</Text>
          <Text style={styles.cardValue}>{mockVehicleData.coolantLevel}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="car-brake-fluid-level" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Brake Fluid</Text>
          <Text style={styles.cardValue}>{mockVehicleData.brakeFluid}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Ionicons name="ios-speedometer-outline" size={30} color={Color.bold} />
          <Text style={styles.cardText}>RPM</Text>
          <Text style={styles.cardValue}>{mockVehicleData.rpm}</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="speedometer" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Speed</Text>
          <Text style={styles.cardValue}>{mockVehicleData.speed}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="road" size={30} color={Color.bold} />
          <Text style={styles.cardText}>Odometer</Text>
          <Text style={styles.cardValue}>{mockVehicleData.odometer}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const RouteOptimizationScreen = () => {
  const bus = useSelector((state) => state.buses.bus);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptimizeRoute = () => {
    setLoading(true);

    // Simulate a delay to mimic model processing time
    setTimeout(() => {
      // Mock route optimization logic with more complexity
      let remainingStops = [...bus.stops];
      let optimized = [];

      // Start with the first stop
      let currentStop = remainingStops.shift();
      optimized.push(currentStop);
      const calc = new CalcDistance();

      while (remainingStops.length > 0) {
        let nearestStop = remainingStops.reduce((prev, curr) => {
          const prevDistance = calc.haversineformula(
            currentStop.location.coordinate[1],
            currentStop.location.coordinate[0],
            prev.location.coordinate[1],
            prev.location.coordinate[0]
          );
          const currDistance = calc.haversineformula(
            currentStop.location.coordinate[1],
            currentStop.location.coordinate[0],
            curr.location.coordinate[1],
            curr.location.coordinate[0]
          );
          return currDistance < prevDistance ? curr : prev;
        });
        optimized.push(nearestStop);
        currentStop = nearestStop;
        remainingStops = remainingStops.filter((stop) => stop !== nearestStop);
      }

      setOptimizedRoute(optimized);
      setLoading(false);
    }, 3000); // Delay of 3 seconds to simulate model processing
  };

  return (
    <View style={styles.routeOptimizationContainer}>
      <CustomButton
        onPress={handleOptimizeRoute}
        style={styles.optimizeButton}
      >
        <Text style={styles.buttonText}>Optimize Route</Text>
      </CustomButton>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : optimizedRoute ? (
        <View style={styles.optimizedRouteDetails}>
          <MapView
            style={{ height: 400, borderRadius: 10 }}
            initialRegion={{
              latitude: optimizedRoute[0].location.coordinate[1],
              longitude: optimizedRoute[0].location.coordinate[0],
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={darkMap}
          >
            {optimizedRoute.map((stop, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: stop.location.coordinate[1],
                  longitude: stop.location.coordinate[0],
                }}
                title={stop.name}
              />
            ))}
            <Polyline
              coordinates={optimizedRoute.map((stop) => ({
                latitude: stop.location.coordinate[1],
                longitude: stop.location.coordinate[0],
              }))}
              strokeColor={Color.bold}
              strokeWidth={3}
            />
          </MapView>
          <ScrollView style={styles.optimizedStopsList}>
            {optimizedRoute.map((stop, index) => (
              <View key={index} style={styles.optimizedStopCard}>
                <Text style={styles.optimizedStopText}>{stop.name}</Text>
                <Text style={styles.optimizedStopCoordinates}>{`Lat: ${stop.location.coordinate[1]}, Lng: ${stop.location.coordinate[0]}`}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.optimizationMessage}>Click the button to optimize the route.</Text>
      )}
    </View>
  );
};


const BusDetail = ({ navigation, route }) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: Color.bold, tabBarInactiveTintColor: Color.semiBold, tabBarStyle: { backgroundColor: Color.dark } }}>
      <Tab.Screen name="Bus Details" component={BusDetailScreen} initialParams={route.params} options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="bus" size={24} color={color} />) }} />
      <Tab.Screen name="Vehicle Details" component={VehicleDetailScreen} options={{ tabBarIcon: ({ color }) => (<Ionicons name="ios-car" size={24} color={color} />) }} />
      <Tab.Screen name="Route Optimization" component={RouteOptimizationScreen} options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="routes" size={24} color={color} />) }} />
    </Tab.Navigator>
  );
};

export default BusDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark,
  },
  map: {
    flex: 1,
  },
  headerMenuContainer: {
    zIndex: 1,
    position: "absolute",
    top: 60,
    left: 15,
    borderRadius: 50,
    padding: 10,
    backgroundColor: Color.semiBold,
  },
  busContainer: {
    padding: 20,
    flex: 1,
  },
  routeInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  routeInfoText: {
    backgroundColor: Color.bold,
    padding: 10,
    borderRadius: 5,
    color: Color.white,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  busNumber: {
    fontSize: 24,
    textTransform: "uppercase",
    color: Color.white,
  },
  busText: {
    marginBottom: 3,
    color: Color.white,
    fontSize: 16,
    textTransform: "capitalize",
  },
  textBold: {
    fontWeight: "bold",
    color: Color.white,
  },
  vehicleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop:50,
    backgroundColor: Color.dark,
  },
  vehicleDetailText: {
    fontSize: 18,
    marginBottom: 10,
    color: Color.white,
  },
  healthStatusBarContainer: {
    marginBottom: 20,
  },
  healthStatusBarOuter: {
    width: '100%',
    height: 20,
    backgroundColor: Color.semiBold,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
  },
  healthStatusBarInner: {
    height: '100%',
    backgroundColor: Color.bold,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: Color.semiBold,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardText: {
    fontSize: 16,
    color: Color.white,
    marginTop: 10,
  },
  cardValue: {
    fontSize: 18,
    color: Color.white,
    fontWeight: 'bold',
    marginTop: 5,
  },
  routeOptimizationContainer: {
    flex: 1,
    backgroundColor: Color.dark,
    paddingHorizontal: 20,
    marginTop: 60
  },
  optimizeButton: {
    backgroundColor: Color.bold,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  optimizationMessage: {
    color: Color.bold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  optimizedRouteDetails: {
    flex: 1,
  },
  optimizedStopsList: {
    marginTop: 10,
  },
  optimizedStopCard: {
    backgroundColor: Color.semiBold,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optimizedStopText: {
    color: Color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  optimizedStopCoordinates: {
    color: Color.white,
    fontSize: 14,
    marginTop: 5,
  },
  checkHealthButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  checkHealthButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
