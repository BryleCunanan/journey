// ThemeContext.js

import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your themes
export const lightTheme = {
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  alignSelf: "flex-start",
};

export const darkTheme = {
  backgroundColor: "#1F1F1F",
  textColor: "#FFFFFF",
  alignSelf: "flex-end",
};

// Create context
export const ThemeContext = createContext();

// Create provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  // Load theme from AsyncStorage on initial load
  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Error loading theme from AsyncStorage:", error);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    } catch (error) {
      console.error("Error saving theme to AsyncStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
