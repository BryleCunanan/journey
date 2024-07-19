import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  useWindowDimensions,
  Pressable,
  FlatList,
  Text,
  RefreshControl,
  TouchableHighlight,
  Clipboard,
  Animated,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { ThemeContext } from "../../helpers/ThemeContext";

export default function Page() {
  const [quoteForToday, setQuoteForToday] = useState(null);
  const [entryData, setEntryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const plusButtonScale1 = useState(new Animated.Value(1))[0];
  const plusButtonScale2 = useState(new Animated.Value(1))[0];
  const copyButtonScale = useState(new Animated.Value(1))[0];
  const { theme, font, fontSize } = useContext(ThemeContext);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFetchQuoteOfTheDay = useCallback(
    debounce(() => {
      fetchQuoteOfTheDay(process.env.EXPO_PUBLIC_QUOTE_URL);
    }, 1000),
    []
  );
  const getMediaPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    console.log("Status: ", status);
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
    }
  };

  const getNotifPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need notifications permissions to make this work!");
    }
  };

  useEffect(() => {
    // clearAll();
    getMediaPermissions();
    // getNotifPermissions();
    debouncedFetchQuoteOfTheDay();
    return debouncedFetchQuoteOfTheDay.cancel;
  }, []);

  useFocusEffect(
    useCallback(() => {
      importData();
    }, [])
  );

  const fetchQuoteOfTheDay = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuoteForToday({ html: data[0].h, copy: data[0].q });
      await storeData("config_html", data[0].h);
      await storeData("config_copy", data[0].q);
    } catch (error) {
      console.error("Error fetching quote of the day: ", error);
      const html = await getData("config_html");
      const copy = await getData("config_copy");

      console.log("HTML:", html);
      console.log("Copy:", copy);

      setQuoteForToday({ html: html, copy: copy });
    }
  };

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => !key.startsWith("config_"));
      const entries = await AsyncStorage.multiGet(filteredKeys);
      const objectEntries = entries.map((item) => {
        const id = item[0];
        const entryData = JSON.parse(item[1]);

        return {
          id: id,
          entry: {
            entry: entryData.entry,
            media: entryData.media,
          },
          scale: new Animated.Value(1),
        };
      });
      setEntryData(objectEntries.reverse());
    } catch (error) {
      console.error("Error importing data: ", error);
    }
    setRefreshing(false);
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      importData();
    } catch (e) {
      console.error("Error removing data:", e);
    }
  };

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  const Item = ({
    id = 0,
    title = "Default Title",
    scale = new Animated.Value(1),
    separators = {},
  }) => {
    const date = new Date(id * 1000);

    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <TouchableHighlight
          onPress={() =>
            router.push({
              pathname: "[input]",
              params: { id, calendar: false },
            })
          }
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
          style={{
            backgroundColor: theme.secondaryColor,
            padding: 10,
            borderRadius: 13,
          }}
        >
          <>
            <View>
              <Text
                style={{
                  height: 100,
                  color: theme.primaryColor,
                  fontFamily: font,
                  fontSize: fontSize,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  textAlignVertical: "bottom",
                  color: theme.primaryColor,
                  fontFamily: font,
                  fontSize: fontSize,
                }}
              >
                {`${formattedDate}`}
              </Text>
            </View>
          </>
        </TouchableHighlight>
        <View>
          <Pressable
            onPress={() => removeValue(id)}
            onPressIn={() => handlePressIn(scale)}
            onPressOut={() => handlePressOut(scale)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={({ pressed }) => [
              {
                position: "absolute",
                borderRadius: 50,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                right: 5,
                bottom: 5,
                backgroundColor: pressed ? "rgba(0, 0, 0, 0.4)" : "transparent",
              },
            ]}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <FontAwesome size={20} name="trash" color={theme.primaryColor} />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={{ marginBottom: 20 }}>
      {quoteForToday ? (
        <>
          <RenderHTML
            contentWidth={width}
            source={
              quoteForToday || { html: "<p>No quote available</p>", copy: "" }
            }
            baseStyle={{
              textAlign: "center",
              fontSize: fontSize * 1.4,
              color: theme.secondaryColor,
              fontFamily: font,
            }}
            systemFonts={[font]}
          />
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
            }}
          >
            <Pressable
              onPress={() => {
                console.log("copied");
                Clipboard.setString(quoteForToday.copy);
              }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPressIn={() => handlePressIn(copyButtonScale)}
              onPressOut={() => handlePressOut(copyButtonScale)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? "rgba(0, 0, 0, 0.4)"
                    : "transparent",

                  borderRadius: 50,
                  padding: 10,
                },
              ]}
            >
              <Animated.View
                style={{ transform: [{ scale: copyButtonScale }] }}
              >
                <FontAwesome
                  color={theme.secondaryColor}
                  name="copy"
                  size={20}
                />
              </Animated.View>
            </Pressable>
          </View>
        </>
      ) : (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color={theme.secondaryColor}
        />
      )}
    </View>
  );

  const renderFooter = () => (
    <View>
      <Pressable
        onPress={() =>
          router.push({ pathname: "[input]", params: { calendar: true } })
        }
        onPressIn={() => handlePressIn(plusButtonScale1)}
        onPressOut={() => handlePressOut(plusButtonScale1)}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={{
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          margin: 20,
        }}
      >
        <Animated.View style={{ transform: [{ scale: plusButtonScale1 }] }}>
          <FontAwesome size={40} name="plus" color={theme.secondaryColor} />
        </Animated.View>
      </Pressable>
    </View>
  );

  return (
    <View style={{ backgroundColor: theme.primaryColor, height: "100%" }}>
      <View style={{}}>
        <FlatList
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ height: 20 }} />
          )}
          data={entryData}
          renderItem={({ item, index, separators }) => (
            <Item
              title={item.entry.entry}
              id={item.id}
              scale={item.scale}
              index={index}
              separators={separators}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                importData();
              }}
              colors={[theme.primaryColor, theme.secondaryColor]}
              progressBackgroundColor={theme.secondaryColor}
              progressViewOffset={10}
            />
          }
        />
      </View>
      <View
        style={{
          backgroundColor: theme.primaryColor,
          // opacity: 0.95,
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 99999,
          elevation: 5,
        }}
      >
        <Pressable
          onPress={() =>
            router.push({ pathname: "[input]", params: { id: -1 } })
          }
          onPressIn={() => handlePressIn(plusButtonScale2)}
          onPressOut={() => handlePressOut(plusButtonScale2)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Animated.View style={{ transform: [{ scale: plusButtonScale2 }] }}>
            <FontAwesome size={20} name="plus" color={theme.secondaryColor} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
