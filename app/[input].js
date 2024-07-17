// app/input.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { ThemeContext } from "../helpers/ThemeContext";

export default function InputScreen() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const router = useRouter();
  const { id, calendar } = useLocalSearchParams();
  const { theme, font } = useContext(ThemeContext);

  // [
  //   {
  //     id: {
  //       entry: entry,
  //       media: [
  //         {
  //           media_id: media_id,
  //           path: path,
  //         },
  //         {
  //           media_id: media_id,
  //           path: path,
  //         },
  //       ],
  //     },
  //   },
  // ];

  const handleSave = () => {
    if (text !== "") {
      const data = { entry: text, media: media };

      console.log(data);

      if (id) {
        storeData(id, data);
      } else {
        const time_id = Math.floor(Date.now() / 1000).toString();
        storeData(time_id, data);
      }
      router.back();
    }
  };

  const addMedia = (id, url) => {
    const mediaObject = { media_id: id, path: url };

    const newMedia = [...media, mediaObject];

    setMedia(newMedia);
  };

  const handleDeleteMedia = (id) => {
    console.log("media ID", id);
    const index = media.findIndex((item) => item.media_id === id);

    if (index !== -1) {
      const newMedia = [...media];
      newMedia.splice(index, 1);
      setMedia(newMedia);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const fileName = localUri.split("/").pop();
      const newPath = `${FileSystem.documentDirectory}${fileName}`;
      console.log("path", newPath);
      try {
        await FileSystem.moveAsync({
          from: localUri,
          to: newPath,
        });
        addMedia(fileName, newPath);
      } catch (error) {
        console.error("Error moving image:", error);
      }
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result", result);
    if (!result.canceled) {
      const imagePath = result.assets[0].uri;
      const imageName = result.assets[0].fileName;
      const newPath = `${FileSystem.documentDirectory}${imageName}`;

      try {
        await FileSystem.moveAsync({
          from: imagePath,
          to: newPath,
        });
        addMedia(imageName, newPath);
      } catch (error) {
        console.error("Error moving image:", error);
      }
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      console.log("data: ", jsonValue);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("parsed: ", data.media);
      setMedia(data.media);
      setText(data.entry);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    console.log("id: " + id);
    console.log("calendar:" + calendar);

    // if wala sa calendar at may id, go in
    if (id !== undefined) {
      console.log("nakakapasok ako dito");
      getData(id);
    }
  }, []);

  const ImageList = ({ id, path }) => {
    return (
      <>
        <View>
          <Image
            style={{ width: 256, height: 192, resizeMode: "stretch" }}
            source={{ uri: path }}
          />
        </View>
        <View>
          <Pressable
            onPress={() => handleDeleteMedia(id)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={({ pressed }) => [
              {
                position: "absolute",
                borderRadius: 50,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                right: 5,
                top: 5,
                backgroundColor: pressed ? "black" : "rgba(0, 0, 0, 0.4)",
              },
            ]}
          >
            <FontAwesome size={20} name="close" color={theme.primaryColor} />
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <>
      <View
        style={{ flex: 1, padding: 16, backgroundColor: theme.primaryColor }}
      >
        <View>
          <FlatList
            ItemSeparatorComponent={({ highlighted }) => (
              <View style={{ height: 20 }} />
            )}
            data={media}
            renderItem={({ item, index }) => (
              <ImageList id={item.media_id} path={item.path} index={index} />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: theme.secondaryColor,
            margin: 20,

            borderRadius: 12,
          }}
        >
          <TextInput
            style={{
              // height: 100,
              textAlignVertical: "top",
              color: theme.primaryColor,
              fontFamily: font,
            }}
            multiline
            placeholder="What are you feeling today?"
            placeholderTextColor={theme.primaryColor}
            value={text}
            onChangeText={setText}
            autoFocus
            rows={7}
          />
        </View>
        <Pressable
          style={{
            height: 32,
            width: 56,
            backgroundColor: theme.secondaryColor,
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 20,
          }}
          onPress={handleSave}
        >
          <Text
            style={{
              color: theme.primaryColor,
              textAlign: "center",
              fontFamily: font,
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          backgroundColor: theme.secondaryColor,
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ padding: 10 }} onPress={takePhotoWithCamera}>
          <FontAwesome size={20} name="camera" color={theme.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={pickImageFromGallery}
        >
          <FontAwesome size={20} name="image" color={theme.primaryColor} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}
