import { Stack } from "expo-router/stack";
import React, { useEffect } from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[input]" options={{ title: "Add Entry" }} />
    </Stack>
  );
}
