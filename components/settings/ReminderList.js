import React, { useContext, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "../../helpers/ThemeContext";
import { BlurView } from "expo-blur";

const ReminderList = () => {
  const { theme } = useContext(ThemeContext);
  const [reminders, setReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  //   const reminders = [
  //     { time: "5:25 PM", id: "firstReminder" },
  //     { time: "6:25 PM", id: "secondReminder" },
  //   ];

  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

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
            setIsModalVisible(true);
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

  const handleAddReminder = () => {
    if (reminders.length < 3) {
      console.log("length", reminders.length);
      const newReminders = [...reminders];
      const newEntry = { time: "5:25 PM", id: "firstRemider" };
      newReminders.push(newEntry);
      setReminders(newReminders);
    }
  };

  return (
    <>
      <FlatList
        data={reminders}
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
        ListFooterComponent={ReminderFooter}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          console.log("Visible items are", viewableItems);
          console.log("Changed in this iteration", changed);
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        snapToAlignment="start"
        snapToInterval={32}
        decelerationRate="fast"
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <BlurView
          intensity={40}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={6}
          //   tint="dark"
        >
          <Pressable
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            <Pressable
              style={{
                width: "60%",
                height: "30%",
                backgroundColor: theme.secondaryColor,
                elevation: 5,
                borderRadius: 14,
              }}
              onPress={() => {}}
            >
              <FlatList data={hours} />
              <Pressable
                style={{
                  width: 32,
                  backgroundColor: theme.primaryColor,
                  height: 24,
                  borderRadius: 4,
                }}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              >
                <Text>Back</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </BlurView>
      </Modal>
    </>
  );
};

export default ReminderList;
