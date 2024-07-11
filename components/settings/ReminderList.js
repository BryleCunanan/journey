import React, { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../helpers/ThemeContext";

const ReminderList = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  const handleAddReminder = () => {
    console.log("added");
  };
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              borderWidth: 2,
              height: 42,
              borderRadius: 20,
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              borderColor: theme.primaryColor,
            }}
          >
            <Text style={{ color: theme.primaryColor }}>{item.time}</Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={{
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
              borderColor: theme.primaryColor,
            }}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            onPress={handleAddReminder}
          >
            <FontAwesome
              name="plus-square-o"
              size={36}
              color={theme.primaryColor}
            />
          </Pressable>
        </View>
      )}
    />
  );
};

export default ReminderList;
