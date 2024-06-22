// app/input.js
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputScreen() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleSave = () => {
    if(text !== ""){
    if (id) {
      storeData(id, text);
    } else {
      const time_id = Math.floor(Date.now() / 1000).toString();
      storeData(time_id, text);
    }
    router.back();}
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      console.log("data: ", jsonValue);
      jsonValue != null ? JSON.parse(jsonValue) : null;
      const filtered = jsonValue.replace(/"/g, "");
      console.log("data: ", filtered);
      setText(filtered);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    console.log("id: " + id);
    if (id) {
      getData(id);
    } else {
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={{
              height: 100,
            }}
            placeholder="Enter some text"
            value={text}
            onChangeText={setText}
          />
        </View>
        <Button title="Save" onPress={handleSave} />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          backgroundColor: "pink",
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ padding: 10 }}>
          <FontAwesome size={20} name="camera" color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <FontAwesome size={20} name="image" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 17,
          }}
        >
          <FontAwesome size={20} name="volume-off" color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "pink",
    margin: 20,
  },
});
