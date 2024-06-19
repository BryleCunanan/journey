import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  useWindowDimensions,
  Button,
  Pressable,
  FlatList,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Page() {
  const [quoteForToday, setQuoteForToday] = React.useState("");
  const [entryData, setEntryData] = React.useState([]);

  const api_url = "https://zenquotes.io/api/today";
  const { width } = useWindowDimensions();
  const router = useRouter();

  const Item = ({ id, title }) => (
    <View
      style={{
        margin: 20,
      }}
    >
      <Pressable
        onPress={() => {
          console.log("clicked: " + id);
          router.push({ pathname: "[input]", params: { id } });
        }}
      >
        <Text
          style={{
            height: 100,
            borderWidth: 1,
            padding: 10,
            backgroundColor: "pink",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done. ");
  };

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const entries = await AsyncStorage.multiGet(keys);
      const objectEntries = entries.map(([key, value]) => ({
        id: key,
        entry: value,
      }));

      setEntryData(objectEntries);

      console.log("Entries: ");
      objectEntries.forEach((entry) => {
        console.log(entry);
      });
    } catch (error) {
      console.error("Error importing data: ", error);
    }
  };

  useEffect(() => {
    // clearAll();
    async function getQuoteToday(url) {
      const response = await fetch(url);
      var data = await response.json();
      console.log(data[0].q);
      setQuoteForToday({ html: data[0].h });
    }

    importData();

    getQuoteToday(api_url);
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      importData();
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("my-key");
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  return (
    <View>
      <View
        style={
          {
            // fontFamily: "Gill Sans, sans-serif",
          }
        }
      >
        <RenderHTML
          contentWidth={width}
          source={quoteForToday}
          baseStyle={{
            textAlign: "center",
            fontSize: 20,
          }}
        />
        <View style={{ width: 80, alignSelf: "flex-end", marginRight: 20 }}>
          <Button title="Copy" color="pink" />
        </View>
      </View>

      <>
        {entryData.map((item) => (
          <Item key={item.id} id={item.id} title={item.entry} />
        ))}
      </>

      <View
        style={{
          backgroundColor: "pink",
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          transform: [{ translateX: 310 }, { translateY: 650 }],
          zIndex: 99999,
        }}
      >
        <Pressable onPress={() => router.push({ pathname: "[input]" })}>
          <FontAwesome size={20} name="plus" color="white" />
        </Pressable>
      </View>
    </View>
  );
}
