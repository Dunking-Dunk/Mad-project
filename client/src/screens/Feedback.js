import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { DataTable } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { createFeedback } from "../store/action";

const Contact = ({ navigation }) => {
  const [state, setState] = useState({
    link: "",
    feedback: "",
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const updateState = (data) => {
    setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    updateState({ link: data });
  };

  const onSubmit = () => {
    if (
      state.link.includes("https://www.rajalakshmi.org") &&
      state.feedback.length > 5
    ) {
      dispatch(createFeedback(state)).then(() => {
        setMessage("SUCCESSFULLY SUBMITTED");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
      setState({
        link: "",
        feedback: "",
      });
    }
  };

  return (
    <ScrollView>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Feedback</Text>
        <Text style={{ color: Color.white }}>
          <Text style={{ fontWeight: "bold", color: Color.regular }}>
            Note:{" "}
          </Text>{" "}
          only rec student can submit feedback
        </Text>
        <View style={styles.contactContainer}>
          {message ? (
            <Text>{message}</Text>
          ) : (
            <>
              {hasPermission === null && (
                <Text>Requesting for camera permission</Text>
              )}
              {hasPermission === false && <Text>No access to camera</Text>}
              {!state.link ? (
                <>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={styles.absoluteFillObject}
                    type="back"
                  />
                  {!state.link && (
                    <CustomButton
                      style={styles.button}
                      onPress={() => setScanned(false)}
                    >
                      <Text style={{ color: Color.white }}>Scan</Text>
                    </CustomButton>
                  )}
                </>
              ) : (
                <Text style={{ marginBottom: 10 }}>{state.link}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Feedback"
                placeholderTextColor={Color.bold}
                multiline={true}
                numberOfLines={5}
                value={state.feedback}
                onChangeText={(text) => {
                  updateState({ feedback: text });
                }}
              />
              <CustomButton style={styles.button} onPress={onSubmit}>
                <Text style={{ color: Color.white }}>Submit</Text>
              </CustomButton>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },
  title: {
    color: Color.bold,
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 30,
    marginTop: 20,
  },
  contactContainer: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: Color.medium,
    padding: 20,
  },
  input: {
    backgroundColor: Color.light,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Color.bold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteFillObject: {
    height: 150,
    marginBottom: 10,
  },
});

export default Contact;
