import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  useWindowDimensions,
  Button,
  Pressable,
  FlatList,
  Text,
  RefreshControl,
  TouchableHighlight,
  Clipboard,
} from "react-native";
import React, { useEffect } from "react";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Page() {
  const [quoteForToday, setQuoteForToday] = React.useState("");
  const [entryData, setEntryData] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const api_url = "https://zenquotes.io/api/today";
  const { width } = useWindowDimensions();
  const router = useRouter();

  const Item = ({ id, title, index, separators }) => (
    <View style={{}}>
      <TouchableHighlight
        key={id}
        onPress={() => {
          router.push({ pathname: "[input]", params: { id } });
        }}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        style={{ height: 100, backgroundColor: "pink", padding: 10 }}
      >
        <View>
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
      <View
        style={{
          position: "absolute",
          backgroundColor: "black",
          borderRadius: 50,
          width: 30,
          height: 30,
          padding: 5,
          alignItems: "center",
          right: 10,
          bottom: 10,
        }}
      >
        <Pressable
          onPress={() => {
            removeValue(id);
          }}
        >
          <FontAwesome size={20} name="trash" color="white" />
        </Pressable>
      </View>
    </View>
  );

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

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

      setEntryData(objectEntries.reverse());

      console.log("Entries: ");
      objectEntries.forEach((entry) => {
        console.log(entry);
      });
    } catch (error) {
      console.error("Error importing data: ", error);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    // clearAll();
    async function getQuoteToday(url) {
      const response = await fetch(url);
      var data = await response.json();
      console.log(data[0].q);
      setQuoteForToday({ html: data[0].h, copy: data[0].q });
    }

    importData();

    getQuoteToday(api_url);
  }, []);

  // useEffect(() => {
  //   const refreshInterval = setInterval(() => {
  //     importData();
  //   }, 1000);

  //   return () => {
  //     clearInterval(refreshInterval);
  //   };
  // }, []);

  const renderHeader = () => (
    <View style={{ marginBottom: 20 }}>
      <RenderHTML
        contentWidth={width}
        source={quoteForToday}
        baseStyle={{
          textAlign: "center",
          fontSize: 20,
        }}
      />
      <View style={{ width: 80, alignSelf: "flex-end", marginRight: 20 }}>
        <Button
          title="Copy"
          color="pink"
          onPress={() => {
            Clipboard.setString(quoteForToday.copy);
          }}
        />
      </View>
    </View>
  );

  return (
    <>
      <View>
        {/* <View
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
      </View> */}

        <FlatList
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ height: 20 }} />
          )}
          data={entryData}
          renderItem={({ item, index, separators }) => (
            <Item
              title={item.entry}
              id={item.id}
              index={index}
              separators={separators}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                importData();
              }}
              colors={["#9Bd35A", "#689F38"]}
              progressViewOffset={10}
            />
          }
        />
      </View>
      <View
        style={{
          backgroundColor: "pink",
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 99999,
        }}
      >
        <Pressable onPress={() => router.push({ pathname: "[input]" })}>
          <FontAwesome size={20} name="plus" color="white" />
        </Pressable>
      </View>
    </>
  );
}
