import axios from "axios";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setErrors(null);
    }, 5000);
  }, [errors]);

  const doRequest = async (props = {}) => {
    try {
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      setErrors(
        <View className="alert alert-danger">
          <Text>Ooooops...</Text>

          {err.response.data.errors.map((err) => (
            <Text key={err.message}>{err.message}</Text>
          ))}
        </View>
      );
    }
  };

  return { doRequest, errors };
};
