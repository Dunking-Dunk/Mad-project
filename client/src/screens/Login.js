import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "367932634219-40b2u21tiiqv2dns62iifckja84ih3lo.apps.googleusercontent.com",
    expoClientId:
      "367932634219-8g0ejluakfrtfjdedde1qn1mkfk9k91q.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    if (response.params.hd == "rajalakshmi.edu.in") {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        if (response?.type === "success")
          await getUserInfo(response.authentication.accessToken);
      } else {
        setUserInfo(JSON.parse(user));
      }
    } else {
      setError("access the app with college id");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: "Bearer " + token },
      });
      const user = res.data;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
      {error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
