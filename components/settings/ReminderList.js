import React, { useContext, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../helpers/ThemeContext";
import { BlurView } from "expo-blur";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const ReminderList = ({ reminders, setReminders }) => {
  const { theme, font } = useContext(ThemeContext);
  const [showPicker, setShowPicker] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState([]);

  const ReminderItem = ({ time, index }) => {
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
          onPress={() => {}}
        >
          <Text style={{ color: theme.primaryColor, fontFamily: font }}>
            {time}
          </Text>
          <Pressable style={{ justifyContent: "flex-end" }}>
            <FontAwesome name="trash" size={24} color={theme.primaryColor} />
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
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          onPress={() => {
            setShowPicker(true);
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

  const handleAddReminder = (selectedDate) => {
    if (reminders.length < 3) {
      console.log("length", reminders.length);
      console.log("selectedDate", selectedDate);

      const date = new Date(selectedDate);
      const hour = date.getHours();
      const minute = date.getMinutes();

      const newEntry = { hour, minute };
      console.log("newEntry", newEntry);
      const newReminders = [...reminders];
      newReminders.push(newEntry);
      setReminders(newReminders);

      const timeString = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      console.log(timeString);
      const newDisplay = [...timeDisplay];
      newDisplay.push({ time: timeString });
      setTimeDisplay(newDisplay);
      // { time: "5:25 PM", id: "firstReminder" }
    }
  };

  const handleChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    console.log("event", event);
    if (event.type == "set") {
      handleAddReminder(selectedDate);
    }
  };

  //dalawa yung time picker, isa para sa create, isa para sa edit, make it so na isa lang yung component for both.
  //and then make the reminderItem a pressable where when pressed, will let you edit the time, using the value of that said time
  //I gave you an index property to work with.
  //implement delete for reminders list. kahit splice enough na, pwedem mo rin gamitin yung index na property
  //LAST NA YON, AFTER THAT, TRY TO BUILD AS APK AND TEST
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
      {showPicker && (
        <RNDateTimePicker
          value={new Date()}
          mode="time"
          display="spinner"
          onChange={handleChangeDate}
        />
      )}
    </>
  );
};

export default ReminderList;
