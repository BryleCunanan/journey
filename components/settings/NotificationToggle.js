import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text, View, Platform } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationToggle = ({ reminders }) => {
  const { theme, font, fontSize } = useContext(ThemeContext);
  const [toggleNotification, setToggleNotification] = useState(false);

  useEffect(() => {
    const loadNotificationToggle = async () => {
      try {
        const storedToggle = await AsyncStorage.getItem(
          "config_notificationToggle"
        );
        if (storedToggle !== null) {
          setToggleNotification(JSON.parse(storedToggle));
        }
      } catch (error) {
        console.error("Failed to load notification toggle state:", error);
      }
    };

    loadNotificationToggle();
  }, []);

  useEffect(() => {
    const saveNotificationToggle = async () => {
      try {
        await AsyncStorage.setItem(
          "config_notificationToggle",
          JSON.stringify(toggleNotification)
        );
      } catch (error) {
        console.error("Failed to save notification toggle state:", error);
      }
    };

    saveNotificationToggle();
  }, [toggleNotification]);

  useEffect(() => {
    const scheduleNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to send notifications denied");
          return;
        }

        await Notifications.cancelAllScheduledNotificationsAsync();

        if (toggleNotification) {
          const notifications = reminders.map(async (time) => {
            const trigger = {
              hour: time.hour,
              minute: time.minute,
              repeats: true,
            };

            const notificationId =
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Tala is missing you!",
                  body: "How are you feeling? Tala is waiting to hear it all!",
                },
                trigger,
              });

            console.log(
              `Notification scheduled for ${time.hour}:${time.minute}, ID: ${notificationId}`
            );
            return notificationId;
          });

          if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
              name: "Daily Notifications",
              importance: Notifications.AndroidImportance.DEFAULT,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: "#FF231F7C",
            });
          }

          await Promise.all(notifications);

          console.log("All notifications scheduled successfully");
        }
      } catch (error) {
        console.error("Error scheduling notifications:", error);
      }
    };

    scheduleNotifications();
  }, [toggleNotification, reminders]);

  return (
    <View
      style={{
        width: "80%",
        borderColor: theme.primaryColor,
        borderWidth: 2,
        height: 42,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Pressable
          style={{
            width: "48%",
            height: "100%",
            backgroundColor: toggleNotification
              ? theme.primaryColor
              : theme.secondaryColor,
            borderRadius: 25,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            if (!toggleNotification) {
              setToggleNotification(true);
            }
          }}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Text
            style={{
              color: toggleNotification
                ? theme.secondaryColor
                : theme.primaryColor,
              textAlign: "center",
              fontFamily: font,
            }}
          >
            ON
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "48%",
            height: "100%",
            borderRadius: 25,
            backgroundColor: toggleNotification
              ? theme.secondaryColor
              : theme.primaryColor,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            if (toggleNotification) {
              setToggleNotification(false);
            }
          }}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Text
            style={{
              color: toggleNotification
                ? theme.primaryColor
                : theme.secondaryColor,
              textAlign: "center",
              fontFamily: font,
            }}
          >
            OFF
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NotificationToggle;
