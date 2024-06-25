import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter, useFocusEffect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const currentDate = new Date(Date.now());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  currentDate.setHours(0, 0, 0, 0);
  const [selected, setSelected] = useState(formattedDate);
  const [epochId, setEpochId] = useState(currentDate.getTime());
  const [entryToday, setEntryToday] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const plusButtonScale1 = useState(new Animated.Value(1))[0];
  const plusButtonScale2 = useState(new Animated.Value(1))[0];
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const initDate = {
        dateString: formattedDate,
        day: day,
        month: month,
        timestamp: epochId,
        year: year,
      };

      updateMarkers();
      handleDayPress(initDate);
    }, [])
  );

  useEffect(() => {
    const initDate = {
      dateString: formattedDate,
      day: day,
      month: month,
      timestamp: epochId,
      year: year,
    };

    updateMarkers();
    handleDayPress(initDate);
  }, []);

  const updateMarkers = async () => {
    try {
      const data = await importData();

      const transformedData = data.reduce((object, item) => {
        const tempDate = new Date(parseInt(item.id, 10) * 1000);
        tempDate.setHours(0, 0, 0, 0);

        const year = tempDate.getFullYear();
        const month = String(tempDate.getMonth() + 1).padStart(2, "0");
        const day = String(tempDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        object[formattedDate] = { marked: true };
        return object;
      }, {});

      console.log(transformedData);
      setMarkedDates(transformedData);
      setLoading(false); // Data fetching complete, set loading to false
    } catch (error) {
      console.error("Error updating markers: ", error);
      setLoading(false); // Ensure loading state is reset in case of error
    }
  };

  const marked = useMemo(
    () => ({ [selected]: { selected: true } }),
    [selected]
  );

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

      return objectEntries;
    } catch (error) {
      console.error("Error importing data: ", error);
      return [];
    }
  };

  const handleDayPress = async (day) => {
    setSelected(day.dateString);

    const timeToday = day.timestamp / 1000 - 8 * 60 * 60;
    setEpochId(timeToday);
    const timeTomorrow = timeToday + 86400;

    const entries = await importData();

    const filteredEntries = entries.filter((item) => {
      const itemTimestamp = parseInt(item.id, 10);
      return itemTimestamp >= timeToday && itemTimestamp < timeTomorrow;
    });

    setEntryToday(filteredEntries);
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

    return (
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <TouchableHighlight
          onPress={() => router.push({ pathname: "[input]" })}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
          style={{
            backgroundColor: "pink",
            padding: 15,
            borderRadius: 25,
          }}
        >
          <>
            <View>
              <Text style={{ height: 100 }}>{title}</Text>
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
    <View style={{ marginBottom: 10 }}>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 25,
          height: 375,
          margin: 10,
        }}
        onDayPress={(day) => {
          handleDayPress(day);
        }}
        markedDates={{ ...markedDates, ...marked }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "blue",
          indicatorColor: "blue",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );

  const renderFooter = () => (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "[input]",
            params: { id: epochId, calendar: true },
          })
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
          <FontAwesome size={40} name="plus" color="pink" />
        </Animated.View>
      </Pressable>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        data={entryToday}
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={{ height: 20 }} />
        )}
        renderItem={({ item, index, separators }) => (
          <Item
            title={item.entry.entry}
            id={item.id}
            scale={item.scale}
            index={index}
            separators={separators}
          />
        )}
      />
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
          onPress={() =>
            router.push({
              pathname: "[input]",
              params: { id: epochId, calendar: true },
            })
          }
          onPressIn={() => handlePressIn(plusButtonScale2)}
          onPressOut={() => handlePressOut(plusButtonScale2)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Animated.View style={{ transform: [{ scale: plusButtonScale2 }] }}>
            <FontAwesome size={20} name="plus" color="white" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
