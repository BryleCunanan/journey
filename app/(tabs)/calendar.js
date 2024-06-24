import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Page() {
  const currentDate = new Date(Date.now());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [selected, setSelected] = useState(formattedDate);

  const marked = useMemo(
    () => ({ [selected]: { selected: true } }),
    [selected]
  );

  const markedDates = {
    "2024-06-01": { selected: true, marked: true, selectedColor: "blue" },
    "2024-06-02": { marked: true },
    "2024-06-03": { selected: true, marked: true, selectedColor: "blue" },
  };
  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 350,
        }}
        onDayPress={(day) => {
          console.log(day);
          setSelected(day.dateString);
        }}
        markedDates={marked}
      />
    </View>
  );
}
