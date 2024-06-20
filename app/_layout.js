import { Stack } from "expo-router/stack";
import SplashScreen from "../components/SplashScreen";
import React, { useEffect } from "react";
import { Button, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[input]" options={{ title: "Add Entry" }} />
    </Stack>
  );
}
