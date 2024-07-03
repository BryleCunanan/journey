import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "../../helpers/ThemeContext";

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.secondaryColor,
        tabBarStyle: {
          backgroundColor: theme.primaryColor,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerStyle: { backgroundColor: theme.primaryColor, elevation: 0 },
        headerTintColor: theme.secondaryColor,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Entries",
          headerTitle: "Diary ng Panget",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerTitle: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
