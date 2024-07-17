import { Stack } from "expo-router/stack";
import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../helpers/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}

const ThemedStack = () => {
  const { theme, font } = useContext(ThemeContext);
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[input]"
        options={{
          contentStyle: { backgroundColor: theme.primaryColor },
          title: "Add Entry",
          headerStyle: {
            backgroundColor: theme.primaryColor,
          },
          headerShadowVisible: false,
          headerTintColor: theme.secondaryColor,
          headerTitleStyle: { fontFamily: font },
        }}
      />
    </Stack>
  );
};
