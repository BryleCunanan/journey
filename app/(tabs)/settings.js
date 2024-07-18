import React, { useContext, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";
import BackgroundPicker from "../../components/settings/BackgroundPicker";
import FontFamilyDropdown from "../../components/settings/FontFamilyDropdown";
import FontSlider from "../../components/settings/FontSlider";
import NotificationToggle from "../../components/settings/NotificationToggle";
import ReminderList from "../../components/settings/ReminderList";

const Settings = () => {
  const { theme, font, fontSize } = useContext(ThemeContext);
  const [isDropDown, setIsDropDown] = useState(false);
  const [reminders, setReminders] = useState([]);

  const themeColor = [
    { id: "lightViolet", backgroundColor: "#d8d6da" },
    { id: "darkBlue", backgroundColor: "#10222c" },
    { id: "whiteBlack", backgroundColor: "#f9fffe" },
    { id: "yellowPink", backgroundColor: "#ffaf28" },
    { id: "blueOrange", backgroundColor: "#2c114d" },
  ];

  const fontList = [
    { id: "poppins", fontFamily: "Poppins" },
    { id: "dmserif", fontFamily: "DMSerif" },
    { id: "oswald", fontFamily: "Oswald" },
    { id: "josefin", fontFamily: "Josefin" },
    { id: "montserrat", fontFamily: "Montserrat" },
  ];

  const settingsSections = [{ type: "appearance" }, { type: "notifications" }];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "appearance":
        return (
          <View
            style={{
              backgroundColor: theme.secondaryColor,
              width: "100%",
              borderRadius: 25,
              elevation: 8,
              padding: 20,
              zIndex: 2,
              marginBottom: 30,
            }}
          >
            <View>
              <Text
                style={{
                  color: theme.primaryColor,
                  fontSize: fontSize * 1.3,
                  fontFamily: font,
                }}
              >
                Appearance
              </Text>
            </View>
            <View style={{ gap: 20 }}>
              <Text
                style={{
                  color: theme.primaryColor,
                  fontSize: fontSize,
                  fontFamily: font,
                }}
              >
                Themes
              </Text>
              <View style={{ alignItems: "center" }}>
                <BackgroundPicker data={themeColor} />
              </View>
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    color: theme.primaryColor,
                    fontSize: fontSize,
                    fontFamily: font,
                  }}
                >
                  Font Style
                </Text>
                <View style={{ alignItems: "center" }}>
                  <FontFamilyDropdown
                    fontList={fontList}
                    isDropDown={isDropDown}
                    setIsDropDown={setIsDropDown}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: theme.primaryColor,
                  fontSize: fontSize,
                  fontFamily: font,
                }}
              >
                Font Size
              </Text>
              <View style={{ justifyContent: "center" }}>
                <FontSlider />
              </View>
            </View>
          </View>
        );
      case "notifications":
        return (
          <View
            style={{
              backgroundColor: theme.secondaryColor,
              width: "100%",
              borderRadius: 25,
              elevation: 5,
              padding: 20,
              zIndex: 1,
            }}
          >
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: fontSize,
                  color: theme.primaryColor,
                  fontFamily: font,
                }}
              >
                Notification
              </Text>
              <View style={{ alignItems: "center" }}>
                <NotificationToggle reminders={reminders} />
              </View>
              <View style={{ gap: 10 }}>
                <View>
                  <Text
                    style={{
                      fontSize: fontSize,
                      color: theme.primaryColor,
                      fontFamily: font,
                    }}
                  >
                    Daily Reminder
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize * 0.7,
                      color: theme.primaryColor,
                      fontFamily: font,
                    }}
                  >
                    Set up to 3 daily reminders
                  </Text>
                </View>
                <ReminderList
                  reminders={reminders}
                  setReminders={setReminders}
                />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={settingsSections}
      keyExtractor={(item) => item.type}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 30 }}
      style={{ backgroundColor: theme.primaryColor }}
    />
  );
};

export default Settings;
