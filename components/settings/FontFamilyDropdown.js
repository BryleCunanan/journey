import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import { FlatList, Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FontFamilyDropdown = ({ fontList, isDropDown, setIsDropDown }) => {
  const { theme } = useContext(ThemeContext);

  const handleDropdown = () => {
    setIsDropDown(!isDropDown);
  };

  const Dropdown = ({ fontFamily }) => (
    <View
      style={{
        width: "100%",
        paddingVertical: 8,
      }}
    >
      <Text style={{ color: theme.primaryColor }}>{fontFamily}</Text>
    </View>
  );

  return (
    <View style={{ width: 200 }}>
      <Pressable
        onPress={handleDropdown}
        style={{
          width: "100%",
          height: 42,
          borderRadius: 25,
          backgroundColor: theme.secondaryColor,
          zIndex: 3,
          borderWidth: 2,
          borderColor: theme.primaryColor,
          paddingHorizontal: 10,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: theme.primaryColor, fontSize: 16 }}>Hello</Text>
          {isDropDown ? (
            <FontAwesome name="caret-up" color={theme.primaryColor} size={20} />
          ) : (
            <FontAwesome
              name="caret-down"
              color={theme.primaryColor}
              size={20}
            />
          )}
        </View>
      </Pressable>
      {isDropDown ? (
        <FlatList
          style={{
            backgroundColor: theme.secondaryColor,
            padding: 10,
            paddingTop: 15,
            width: "100%",
            alignSelf: "center",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            position: "absolute",
            marginTop: 24,
            zIndex: 2,
            borderWidth: 2,
            borderColor: theme.primaryColor,
          }}
          data={fontList}
          renderItem={({ item }) => <Dropdown fontFamily={item.fontFamily} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                backgroundColor: theme.primaryColor,
                height: 2,
              }}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default FontFamilyDropdown;
