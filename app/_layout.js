import { Stack } from "expo-router/stack";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../helpers/ThemeContext";
import * as LocalAuthentication from "expo-local-authentication";
import {
  Alert,
  BackHandler,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

const Layout = () => {
  const [authSuccess, setAuthSuccess] = useState(false); // Track authentication status

  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Biometric hardware not available");
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("No biometrics enrolled");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        fallbackLabel: "Enter passcode",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        setAuthSuccess(true); // Authentication successful
      } else {
        Alert.alert("Authentication failed", "Would you like to retry?", [
          { text: "Retry", onPress: () => authenticate() },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <ThemeProvider>
      {authSuccess ? (
        <ThemedStack />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Authenticating...</Text>
        </View>
      )}
    </ThemeProvider>
  );
};

const ThemedStack = () => {
  const { theme, font, fontSize } = useContext(ThemeContext);
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
          headerTitleStyle: { fontFamily: font, fontSize: fontSize },
        }}
      />
    </Stack>
  );
};

export default Layout;
