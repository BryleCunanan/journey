import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  useWindowDimensions,
  Button,
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

export default function Page() {
  const [quoteForToday, setQuoteForToday] = useState(null);
  const [entryData, setEntryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const api_url = "https://zenquotes.io/api/today";
  const { width } = useWindowDimensions();
  const router = useRouter();
  const plusButtonScale1 = useState(new Animated.Value(1))[0];
  const plusButtonScale2 = useState(new Animated.Value(1))[0];

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
      fetchQuoteOfTheDay(api_url);
    }, 1000), 
    []
  );

  useEffect(() => {
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
      const objectEntries = entries.map(([key, value]) => ({
        id: key,
        entry: value,
        scale: new Animated.Value(1), // Add scale animation value for each item
      }));
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

  const Item = ({ id, title, scale, separators }) => {
    const date = new Date(id * 1000);

    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedTitle = title.replace(/"/g, "");

    return (
      <View>
        <TouchableHighlight
          onPress={() => router.push({ pathname: "[input]", params: { id } })}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
          style={{ backgroundColor: "pink", padding: 10 }}
        >
          <>
            <View>
              <Text style={{ height: 100 }}>{formattedTitle}</Text>
              <Text style={{ textAlignVertical: "bottom" }}>
                {`${formattedDate}, ${formattedTime}`}
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
              <FontAwesome size={20} name="trash" color="white" />
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
            source={quoteForToday}
            baseStyle={{
              textAlign: "center",
              fontSize: 20,
              fontStyle: "italic",
            }}
          />
          <View style={{ width: 80, alignSelf: "flex-end", marginRight: 20 }}>
            <Button
              title="Copy"
              color="pink"
              onPress={() => Clipboard.setString(quoteForToday.copy)}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="pink"
        />
      )}
    </View>
  );

  return (
    <>
      <View>
        <FlatList
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ height: 20 }} />
          )}
          data={entryData}
          renderItem={({ item, index, separators }) => (
            <Item
              title={item.entry}
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
              colors={["#9Bd35A", "#689F38"]}
              progressViewOffset={10}
            />
          }
        />
        <Pressable
          onPress={() => router.push({ pathname: "[input]" })}
          onPressIn={() => handlePressIn(plusButtonScale1)}
          onPressOut={() => handlePressOut(plusButtonScale1)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          style={{
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Animated.View style={{ transform: [{ scale: plusButtonScale1 }] }}>
            <FontAwesome size={40} name="plus" color="pink" />
          </Animated.View>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "black",
          borderRadius: 50,
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 99999,
        }}
      >
        <Pressable
          onPress={() => router.push({ pathname: "[input]" })}
          onPressIn={() => handlePressIn(plusButtonScale2)}
          onPressOut={() => handlePressOut(plusButtonScale2)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Animated.View style={{ transform: [{ scale: plusButtonScale2 }] }}>
            <FontAwesome size={20} name="plus" color="white" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}
