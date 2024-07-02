import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Slider from "@react-native-community/slider";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ExampleComponent = () => {
  const { theme } = useContext(ThemeContext);
  const [isDropDown, setIsDropDown] = useState(false);

  const themeColor = [
    { id: "red", backgroundColor: "#ff6c6c" },
    { id: "pink", backgroundColor: "#ff66c4" },
    { id: "violet", backgroundColor: "#8c52ff" },
    { id: "blue", backgroundColor: "#0cc0df" },
    { id: "yellow", backgroundColor: "#ffbd59" },
  ];

  const fontDropdown = [
    { id: "poppins", fontFamily: "Poppins" },
    { id: "inter", fontFamily: "Inter" },
    { id: "satoshi", fontFamily: "Satoshi" },
    { id: "open sans", fontFamily: "Open Sans" },
    { id: "Roboto", fontFamily: "Roboto" },
  ];

  const reminders = [
    { time: "5:25 PM", id: "firstReminder" },
    { time: "6:25 PM", id: "secondReminder" },
    { time: "7:25 PM", id: "thirdReminder" },
  ];

  const handleDropdown = () => {
    setIsDropDown(!isDropDown);
  };

  const BgColor = ({ backgroundColor }) => (
    <View
      style={{
        height: 24,
        width: 24,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#b28771",
        backgroundColor: backgroundColor,
      }}
    ></View>
  );

  const FontFamilyDropdown = ({ fontFamily }) => (
    <View
      style={{
        width: "100%",
        paddingVertical: 4,
        // backgroundColor: "rgba(205,183,169, 0.63)",
      }}
    >
      <Text>{fontFamily}</Text>
    </View>
  );

  return (
    //main page
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
      <View //Container for appearance
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "40%",
          borderRadius: 25,
          elevation: 8,
          padding: 20,
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Appearance</Text>
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ justifyContent: "center" }}>Font Style</Text>
          <View>
            <View>
              <Pressable
                onPress={handleDropdown}
                style={{
                  width: 200,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: "#F8EBDE",
                  zIndex: 2,
                  borderWidth: 1,
                  borderColor: "#CDB7A9",
                  paddingHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                {isDropDown ? (
                  <FontAwesome
                    name="caret-up"
                    color="#CDB7A9"
                    size={20}
                    style={{ alignSelf: "flex-end" }}
                  />
                ) : (
                  <FontAwesome
                    name="caret-down"
                    color="#CDB7A9"
                    size={20}
                    style={{ alignSelf: "flex-end" }}
                  />
                )}
              </Pressable>
            </View>
            {isDropDown ? (
              <FlatList
                style={{
                  backgroundColor: "#F8EBDE",
                  padding: 10,
                  paddingTop: 20,
                  width: "100%",
                  alignSelf: "center",
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  position: "absolute",
                  marginTop: 16,
                  zIndex: 1,
                }}
                data={fontDropdown}
                renderItem={({ item }) => (
                  <FontFamilyDropdown fontFamily={item.fontFamily} />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#CDB7A9",
                      height: 1,
                    }}
                  />
                )}
              />
            ) : null}
          </View>
        </View>

        <Text>Font Size</Text>
        <View
          style={{
            justifyContent: "center",
            // maxWidth: 200,
          }}
        >
          <Slider
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="#CDB7A9"
            maximumTrackTintColor="#CDB7A9"
            thumbTintColor="#CDB7A9"
            step={1}
          />
          <View
            style={{
              backgroundColor: "#CDB7A9",
              width: 8,
              height: 8,
              borderRadius: 50,
              position: "absolute",
              alignSelf: "center",
            }}
          />
          <View
            style={{
              backgroundColor: "#CDB7A9",
              width: 8,
              height: 8,
              borderRadius: 50,
              position: "absolute",
              alignSelf: "flex-start",
              transform: "translateX(12px)",
            }}
          />
          <View
            style={{
              backgroundColor: "#CDB7A9",
              width: 8,
              height: 8,
              borderRadius: 50,
              position: "absolute",
              alignSelf: "flex-end",
              transform: "translateX(-12px)",
            }}
          />
        </View>
      </View>

      <View //Container for notification
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          // height: "40%",
          borderRadius: 25,
          elevation: 5,
          padding: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Notification</Text>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "rgba(205,183,169, 0.63)",
                width: "80%",
                height: 32,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(205,183,169, 1)",
                  width: "48%",
                  height: "100%",
                  borderRadius: 25,
                  position: "relative",
                  alignSelf: "flex-start",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  position: "absolute",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text>ON</Text>
                <View
                  style={{
                    width: 2,
                    height: "50%",
                    backgroundColor: "#CDB7A9",
                  }}
                />
                <Text>OFF</Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Daily Reminder</Text>
              <Text style={{ fontSize: 12 }}>Set upto 3 daily reminders</Text>
            </View>
            <FlatList
              data={reminders}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      height: 32,
                      borderRadius: 20,
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>{item.time}</Text>
                  </View>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      height: 32,
                      borderRadius: 20,
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text>+</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>

      <Text style={{ color: theme.textColor }}>Example Text</Text>
      <ThemeSwitcher />
    </View>
  );
};

export default ExampleComponent;
