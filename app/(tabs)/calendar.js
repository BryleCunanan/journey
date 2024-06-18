import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Page() {
  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 350,
        }}
        // current={"2012-03-01"}`
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markedDates={{
          "2012-03-01": { selected: true, marked: true, selectedColor: "blue" },
          "2012-03-02": { marked: true },
          "2012-03-03": { selected: true, marked: true, selectedColor: "blue" },
        }}
      />
    </View>
  );
}
