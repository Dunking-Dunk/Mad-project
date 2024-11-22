import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { useSelector, useDispatch } from "react-redux";
import { getAllAnnouncements, refreshAnnouncement } from "../store/action";
import RenderHtml from "react-native-render-html";
import moment from "moment";

const AnnouncementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state) => state.announcements.refreshing);
  const announcements = useSelector(
    (state) => state.announcements.announcements
  );

  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  return (
    <>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Announcements</Text>
        <SafeAreaView style={styles.announcementContainer}>
          <FlatList
            data={announcements}
            onRefresh={() => {
              dispatch(refreshAnnouncement(true));
              dispatch(getAllAnnouncements()).then(() => {
                dispatch(refreshAnnouncement(false));
              });
            }}
            refreshing={refreshing}
            renderItem={({ item: announcement }) => {
              return (
                <View style={styles.announcement} key={announcement.id}>
                  <Text style={styles.announcementTime}>
                    {moment(announcement.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Text>
                  <RenderHtml
                    source={{ html: announcement.content }}
                    contentWidth={500}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 75,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: Color.bold,
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 25,
  },
  announcementContainer: {
    backgroundColor: Color.regular,
    width: "100%",
    borderRadius: 20,
  },
  announcement: {
    backgroundColor: Color.bold,
    padding: 5,
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  announcementContent: {
    height: 20,
    width: "70%",
  },
  announcementTime: {
    color: Color.white,
  },
});

export default AnnouncementScreen;
