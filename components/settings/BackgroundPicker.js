import React, { useContext } from "react";
import { FlatList, Pressable, View } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";

const BackgroundPicker = ({ data }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const ColorList = ({ backgroundColor, themeKey }) => {
    return (
      <Pressable
        onPress={() => {
          if (backgroundColor !== theme.primaryColor) {
            toggleTheme(themeKey);
          }
        }}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      >
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: theme.primaryColor,
            backgroundColor: backgroundColor,
          }}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ColorList backgroundColor={item.backgroundColor} themeKey={item.id} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
    />
  );
};

export default BackgroundPicker;
