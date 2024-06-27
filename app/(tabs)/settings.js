import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const ExampleComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // backgroundColor: theme.backgroundColor,
        backgroundColor: "#F8EBDE",
        padding: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "80%",
          height: "40%",
          borderRadius: 25,
          elevation: 5,
        }}
      ></View>

      <Text style={{ color: theme.textColor }}>Example Text</Text>
      <ThemeSwitcher />
    </View>
  );
};

export default ExampleComponent;
