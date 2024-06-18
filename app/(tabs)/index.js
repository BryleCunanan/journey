import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  TextInput,
  useWindowDimensions,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import RenderHTML from "react-native-render-html";

export default function Page() {
  const [entryText, onChangeText] = React.useState("");
  const [quoteForToday, setQuoteForToday] = React.useState("");
  const api_url = "https://zenquotes.io/api/today";
  const { width } = useWindowDimensions();

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
      <View style={{ alignItems: "center" }}>
        <RenderHTML
          contentWidth={width}
          source={quoteForToday}
          style={{ justifyContent: "center" }}
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
      <View
        style={{
          backgroundColor: "pink",
          padding: 20,
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          alignSelf: "flex-end",
          marginRight: 20,
          transform: "translate(-18px,650px)",
        }}
      >
        <Pressable>
          <FontAwesome size={20} name="plus" color="white" />
        </Pressable>
      </View>
    </View>
  );
}
