import React, { useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ThemeContext } from "../helpers/ThemeContext";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <View
        style={{
          borderRadius: 1,
          width: 40,
          height: 20,
          borderRadius: 25,
          backgroundColor: theme.textColor,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            backgroundColor: theme.backgroundColor,
            width: 15,
            height: 15,
            borderRadius: 50,
            alignSelf: theme.alignSelf,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;
