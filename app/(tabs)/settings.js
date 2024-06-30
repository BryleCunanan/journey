import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";

const ExampleComponent = () => {
  const { theme } = useContext(ThemeContext);

  const themeColor = [
    { id: "red", backgroundColor: "#ff6c6c" },
    { id: "pink", backgroundColor: "#ff66c4" },
    { id: "violet", backgroundColor: "#8c52ff" },
    { id: "blue", backgroundColor: "#0cc0df" },
    { id: "yellow", backgroundColor: "#ffbd59" },
    { id: "black", backgroundColor: "#252525" },
  ];

  const BgColor = ({ backgroundColor }) => (
    <View
      style={{
        height: 32,
        width: 32,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#b28771",
        backgroundColor: backgroundColor,
      }}
    ></View>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // backgroundColor: theme.backgroundColor,
        backgroundColor: "#F8EBDE",
        padding: 30,
        gap: 40,
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "40%",
          borderRadius: 25,
          elevation: 8,
        }}
      >
        <Text>Appearance</Text>
        <Text>Themes</Text>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={themeColor}
            renderItem={({ item }) => (
              <BgColor backgroundColor={item.backgroundColor} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
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
