import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Slider from "@react-native-community/slider";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ExampleComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropDown, setIsDropDown] = useState(false);

  const themeColor = [
    { id: "lightViolet", backgroundColor: "#fff9f9" },
    { id: "darkBlue", backgroundColor: "#466380" },
    { id: "whiteBlack", backgroundColor: "#8c52ff" },
    { id: "yellowPink", backgroundColor: "#0cc0df" },
    { id: "blueOrange", backgroundColor: "#ffbd59" },
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
  ];

  const handleDropdown = () => {
    setIsDropDown(!isDropDown);
  };

  const BgColor = ({ backgroundColor, themeKey }) => (
    <Pressable
      onPress={() => {
        console.log(backgroundColor);
        toggleTheme(themeKey);
      }}
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

  const FontFamilyDropdown = ({ fontFamily }) => (
    <View
      style={{
        width: "100%",
        paddingVertical: 4,
      }}
    >
      <Text style={{ color: theme.primaryColor }}>{fontFamily}</Text>
    </View>
  );

  return (
    //main page
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.primaryColor,
        padding: 30,
        gap: 40,
      }}
      onPress={() => {
        console.log("Clicked");
        setIsDropDown(false);
      }}
    >
      <View //Container for appearance
        style={{
          backgroundColor: theme.secondaryColor,
          width: "100%",
          borderRadius: 25,
          elevation: 8,
          padding: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: theme.primaryColor,
              fontSize: 16 * 1.3,
            }}
          >
            Appearance
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
            Themes
          </Text>
          <View style={{ alignItems: "center" }}>
            <FlatList
              data={themeColor}
              renderItem={({ item }) => (
                <BgColor
                  backgroundColor={item.backgroundColor}
                  themeKey={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
              Font Style
            </Text>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: 200 }}>
                <Pressable
                  onPress={handleDropdown}
                  style={{
                    width: "100%",
                    height: 30,
                    borderRadius: 25,
                    backgroundColor: theme.secondaryColor,
                    zIndex: 3,
                    borderWidth: 1,
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
                    <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
                      Hello
                    </Text>
                    {isDropDown ? (
                      <FontAwesome
                        name="caret-up"
                        color={theme.primaryColor}
                        size={20}
                      />
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
                      marginTop: 16,
                      zIndex: 2,
                      borderWidth: 1,
                      borderColor: theme.primaryColor,
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
                          backgroundColor: theme.primaryColor,
                          height: 1,
                        }}
                      />
                    )}
                  />
                ) : null}
              </View>
            </View>
          </View>
          <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
            Font Size
          </Text>
          <View
            style={{
              justifyContent: "center",
              // maxWidth: 200,
            }}
          >
            <View>
              <Slider
                minimumValue={0}
                maximumValue={2}
                minimumTrackTintColor={theme.primaryColor}
                maximumTrackTintColor={theme.primaryColor}
                thumbTintColor={theme.primaryColor}
                step={1}
                style={{ zIndex: 1, width: "98%" }}
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
                  <Text style={{ color: theme.primaryColor, fontSize: 14 }}>
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
                  <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
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
                  <Text style={{ color: theme.primaryColor, fontSize: 22 }}>
                    Aa
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View //Container for notification
        style={{
          backgroundColor: theme.secondaryColor,
          width: "100%",
          // height: "40%",
          borderRadius: 25,
          elevation: 5,
          padding: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "bold", color: theme.primaryColor }}>
            Notification
          </Text>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                // backgroundColor: theme.primaryColor,
                width: "80%",
                borderColor: theme.primaryColor,
                borderWidth: 1,
                height: 32,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.primaryColor,
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
                <Text style={{ color: theme.primaryColor }}>ON</Text>
                <View
                  style={{
                    width: 2,
                    height: "50%",
                    backgroundColor: theme.primaryColor,
                  }}
                />
                <Text style={{ color: theme.primaryColor }}>OFF</Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <View>
              <Text style={{ fontWeight: "bold", color: theme.primaryColor }}>
                Daily Reminder
              </Text>
              <Text style={{ fontSize: 12, color: theme.primaryColor }}>
                Set upto 3 daily reminders
              </Text>
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
                      borderColor: theme.primaryColor,
                    }}
                  >
                    <Text style={{ color: theme.primaryColor }}>
                      {item.time}
                    </Text>
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
                      borderColor: theme.primaryColor,
                    }}
                  >
                    <Text style={{ color: theme.primaryColor }}>Add</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExampleComponent;
