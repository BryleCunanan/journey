import Slider from "@react-native-community/slider";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";

const FontSlider = () => {
  const { theme, font } = useContext(ThemeContext);
  return (
    <View>
      <Slider
        minimumValue={14}
        maximumValue={22}
        minimumTrackTintColor={theme.primaryColor}
        maximumTrackTintColor={theme.primaryColor}
        thumbTintColor={theme.primaryColor}
        step={4}
        style={{ zIndex: 1, width: "98%" }}
        onValueChange={(value) => {
          console.log("value", value);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 9,
          transform: "translateY(-13px)",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: theme.primaryColor,
              width: 2,
              height: 8,
            }}
          />
          <Text
            style={{
              color: theme.primaryColor,
              fontSize: 14,
              fontFamily: font,
            }}
          >
            Aa
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: theme.primaryColor,
              width: 2,
              height: 8,
            }}
          />
          <Text
            style={{
              color: theme.primaryColor,
              fontSize: 18,
              fontFamily: font,
            }}
          >
            Aa
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: theme.primaryColor,
              width: 2,
              height: 8,
            }}
          />
          <Text
            style={{
              color: theme.primaryColor,
              fontSize: 22,
              fontFamily: font,
            }}
          >
            Aa
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FontSlider;
