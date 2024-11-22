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

const Contact = ({ navigation }) => {

  return (
    <>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Contact </Text>
        <DataTable style={styles.contactContainer}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Phone no</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>TRANSPORT DEPT</DataTable.Cell>
            <DataTable.Cell>044 6718 1069</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>P. Sathish</DataTable.Cell>
            <DataTable.Cell>902 522 4605</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>A. Natarajan</DataTable.Cell>
            <DataTable.Cell>902 522 4606</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>L. Ramajayam</DataTable.Cell>
            <DataTable.Cell>944 500 7183</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
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
