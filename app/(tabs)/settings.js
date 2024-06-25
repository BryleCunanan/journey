import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const ExampleComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={{ color: theme.textColor }}>Example Text</Text>
      <ThemeSwitcher />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExampleComponent;
