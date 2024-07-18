import React, { useContext, useState, useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../helpers/ThemeContext";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const ReminderList = ({ reminders, setReminders }) => {
  const { theme, font } = useContext(ThemeContext);
  const [timeDisplay, setTimeDisplay] = useState([]);

  useEffect(() => {
    const updatedTime = reminders.map((item) => {
      const date = new Date();
      const { hour, minute } = item;

      date.setHours(hour, minute, 0, 0);

      const timeString = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      return { time: timeString };
    });
    console.log("updatedTime", updatedTime);

    setTimeDisplay(updatedTime);
  }, [reminders]);

  const openTimePicker = (date, index, type) => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "time",
      display: "spinner",
      onChange: (event, selectedDate) =>
        handleChangeDate(event, selectedDate, index, type),
    });
  };

  const handleReminder = (selectedDate, index, mode) => {
    if (reminders.length < 3) {
      console.log("length", reminders.length);
      console.log("selectedDate", selectedDate);
      console.log("mode", mode);

      const date = new Date(selectedDate);
      const hour = date.getHours();
      const minute = date.getMinutes();

      const newEntry = { hour, minute };
      console.log("newEntry", newEntry);

      const updatedReminders = [...reminders];
      if (mode == "add") {
        updatedReminders.push(newEntry);
      } else if (mode == "edit") {
        updatedReminders[index] = newEntry;
      }

      setReminders(updatedReminders);
    }
  };

  const handleChangeDate = (event, selectedDate, index, mode) => {
    console.log("event", event);
    if (event.type == "set") {
      handleReminder(selectedDate, index, mode);
    }
  };

  const handleDelete = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);

    console.log("updatedReminders", updatedReminders);

    setReminders(updatedReminders);
  };

  const ReminderItem = ({ time, index }) => {
    if (index >= reminders.length) return null;

    const now = new Date();
    const { hour, minute } = reminders[index];

    now.setHours(hour, minute, 0, 0);

    return (
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={{
            borderWidth: 2,
            height: 42,
            borderRadius: 20,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            borderColor: theme.primaryColor,
            flexDirection: "row",
          }}
          onPress={() => {
            openTimePicker(now, index, "edit");
          }}
        >
          <Text style={{ color: theme.primaryColor, fontFamily: font }}>
            {time}
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                position: "absolute",
                right: 8,
                backgroundColor: pressed ? theme.primaryColor : "transparent",
                opacity: pressed ? 0.3 : 1,
                padding: 4,
                width: 24,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => {
              handleDelete(index);
            }}
          >
            <FontAwesome name="remove" size={16} color={theme.primaryColor} />
          </Pressable>
        </Pressable>
      </View>
    );
  };

  const ReminderFooter = () => {
    return reminders.length < 3 ? (
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={{
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            borderColor: theme.primaryColor,
          }}
          hitSlop={{ top: 10, bottom: 30, left: 30, right: 30 }}
          onPress={() => {
            openTimePicker(new Date(), null, "add");
          }}
        >
          <FontAwesome
            name="plus-square-o"
            size={36}
            color={theme.primaryColor}
          />
        </Pressable>
      </View>
    ) : (
      <></>
    );
  };

  return (
    <>
      <FlatList
        data={timeDisplay}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <ReminderItem time={item.time} index={index} />
        )}
        ListFooterComponent={ReminderFooter}
      />
    </>
  );
};

export default ReminderList;
