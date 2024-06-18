import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  TextInput,
  useWindowDimensions,
  Button,
  Pressable,
  FlatList,
  Text,
  Async,
} from "react-native";
import React, { useEffect } from "react";
import RenderHTML from "react-native-render-html";

export default function Page() {
  const [entryText, onChangeText] = React.useState("");
  const [quoteForToday, setQuoteForToday] = React.useState("");
  const api_url = "https://zenquotes.io/api/today";
  const { width } = useWindowDimensions();

  const data = [
    {
      id: "1",
      title: "Entry 1",
    },
    {
      id: "2",
      title: "Entry 2",
    },
    {
      id: "3",
      title: "Entry 3",
    },
  ];

  const Item = ({ title }) => (
    <View
      style={{
        height: 100,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "pink",
      }}
    >
      <Text style={{}}>{title}</Text>
    </View>
  );

  useEffect(() => {
    async function getQuoteToday(url) {
      const response = await fetch(url);
      var data = await response.json();
      console.log(data[0].q);
      setQuoteForToday({ html: data[0].h });
    }
    getQuoteToday(api_url);
  }, []);

  return (
    <View>
      <View
        style={{
          fontFamily: "Gill Sans, sans-serif",
        }}
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
      <TextInput
        onChangeText={onChangeText}
        value={entryText}
        style={{
          height: 100,
          margin: 20,
          borderWidth: 1,
          padding: 10,
          backgroundColor: "pink",
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{
          backgroundColor: "pink",
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          transform: "translate(310px,650px)",
          zIndex: 99999,
        }}
      >
        <Pressable>
          <FontAwesome size={20} name="plus" color="white" />
        </Pressable>
      </View>
    </View>
  );
}
