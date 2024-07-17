import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import BackgroundPicker from "../../components/settings/BackgroundPicker";
import FontFamilyDropdown from "../../components/settings/FontFamilyDropdown";
import FontSlider from "../../components/settings/FontSlider";
import NotificationToggle from "../../components/settings/NotificationToggle";
import ReminderList from "../../components/settings/ReminderList";

const Settings = () => {
  const { theme, font } = useContext(ThemeContext);
  const [isDropDown, setIsDropDown] = useState(false);

  const themeColor = [
    { id: "lightViolet", backgroundColor: "#d8d6da" },
    { id: "darkBlue", backgroundColor: "#10222c" },
    { id: "whiteBlack", backgroundColor: "#f9fffe" },
    { id: "yellowPink", backgroundColor: "#ffaf28" },
    { id: "blueOrange", backgroundColor: "#2c114d" },
  ];

  const fontList = [
    { id: "poppins", fontFamily: "Poppins" },
    { id: "inter", fontFamily: "Inter" },
    { id: "satoshi", fontFamily: "Satoshi" },
    { id: "openSans", fontFamily: "Open Sans" },
    { id: "roboto", fontFamily: "Roboto" },
  ];

  return (
    <Pressable //main page
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.primaryColor,
        padding: 30,
        gap: 40,
      }}
      onPress={() => {
        if (isDropDown == true) {
          setIsDropDown(false);
        }
      }}
    >
      <View //Container for appearance
        style={{
          backgroundColor: theme.secondaryColor,
          width: "100%",
          borderRadius: 25,
          elevation: 8,
          padding: 20,
          zIndex: 2,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: theme.primaryColor,
              fontSize: 16 * 1.3,
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
              fontSize: 16,
              fontFamily: font,
            }}
          >
            Themes
          </Text>
          <View style={{ alignItems: "center" }}>
            <BackgroundPicker data={themeColor} />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
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
          <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
            Font Size
          </Text>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <FontSlider />
          </View>
        </View>
      </View>

      <View //Container for notification
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
          <Text style={{ fontWeight: "bold", color: theme.primaryColor }}>
            Notification
          </Text>
          <View style={{ alignItems: "center" }}>
            <NotificationToggle />
          </View>
          <View style={{ gap: 10 }}>
            <View>
              <Text style={{ fontWeight: "bold", color: theme.primaryColor }}>
                Daily Reminder
              </Text>
              <Text style={{ fontSize: 12, color: theme.primaryColor }}>
                Set upto 3 daily reminders
              </Text>
            </View>
            <ReminderList />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Settings;
