import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";

const NotificationToggle = () => {
  const { theme, font } = useContext(ThemeContext);
  const [toggleNotification, setToggleNotification] = useState(false);

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
            if (toggleNotification == false) {
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
            if (toggleNotification == true) {
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
