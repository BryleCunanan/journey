import { Stack } from "expo-router/stack";
import React from "react";
import { ThemeProvider } from "../helpers/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[input]" options={{ title: "Add Entry" }} />
      </Stack>
    </ThemeProvider>
  );
}
