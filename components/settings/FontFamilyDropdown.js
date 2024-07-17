import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import { FlatList, Pressable, View, Text, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";

const FontFamilyDropdown = ({ fontList, isDropDown, setIsDropDown }) => {
  const { theme, font, changeFont } = useContext(ThemeContext);

  const handleDropdown = () => {
    setIsDropDown(!isDropDown);
  };

  const Dropdown = ({ fontFamily }) => (
    <Pressable
      style={{
        width: "100%",
        padding: 8,
        backgroundColor:
          fontFamily == font ? theme.primaryColor : theme.secondaryColor,
        borderRadius: 12,
      }}
      onPress={() => {
        changeFont(fontFamily);
      }}
      hitSlop={{ top: 15, bottom: 15, left: 30, right: 30 }}
    >
      <Text
        style={{
          color: fontFamily == font ? theme.secondaryColor : theme.primaryColor,
          fontFamily: fontFamily,
        }}
      >
        {fontFamily}
      </Text>
    </Pressable>
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
          <Text
            style={{
              color: theme.primaryColor,
              fontSize: 16,
              fontFamily: font,
            }}
          >
            {font}
          </Text>
        </View>
      </Pressable>
      <Modal
        transparent={true}
        visible={isDropDown}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <BlurView
          intensity={40}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={6}
          //   tint="dark"
        >
          <Pressable
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setIsDropDown(false);
            }}
          >
            <Pressable
              style={{
                width: "60%",
                height: "30%",
                backgroundColor: theme.secondaryColor,
                elevation: 5,
                borderRadius: 14,
                borderWidth: 2,
                borderColor: theme.primaryColor,
              }}
              onPress={() => {}}
            >
              <FlatList
                style={{
                  padding: 10,
                  width: "100%",
                  alignSelf: "center",
                  zIndex: 2,
                }}
                data={fontList}
                renderItem={({ item }) => (
                  <Dropdown fontFamily={item.fontFamily} />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: theme.primaryColor,
                      height: 2,
                      marginVertical: 4,
                    }}
                  />
                )}
              />
              <Pressable
                style={{
                  width: 32,
                  backgroundColor: theme.primaryColor,
                  height: 24,
                  borderRadius: 4,
                }}
                onPress={() => {
                  setIsDropDown(false);
                }}
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              >
                <Text>Back</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </BlurView>
      </Modal>
    </View>
  );
};

export default FontFamilyDropdown;
