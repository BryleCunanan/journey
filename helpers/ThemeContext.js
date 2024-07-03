// ThemeContext.js

import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your themes
export const lightVioletTheme = {
  primaryColor: "#d8d6da",
  secondaryColor: "#584e7e",
  alignSelf: "flex-start",
};

export const darkBlueTheme = {
  primaryColor: "#10222c",
  secondaryColor: "#e8eaee", //card color
  alignSelf: "flex-end",
};

export const whiteBlackTheme = {
  primaryColor: "#f9fffe",
  secondaryColor: "#2f354d",
  alignSelf: "flex-end",
};

export const yellowPinkTheme = {
  primaryColor: "#ffaf28",
  secondaryColor: "#f62494", //card color
  alignSelf: "flex-end",
};

export const blueOrangeTheme = {
  primaryColor: "#2c114d",
  secondaryColor: "#f9aa36", //card color
  alignSelf: "flex-end",
};

const themes = {
  lightViolet: lightVioletTheme,
  darkBlue: darkBlueTheme,
  whiteBlack: whiteBlackTheme,
  yellowPink: yellowPinkTheme,
  blueOrange: blueOrangeTheme,
};
// Create context
export const ThemeContext = createContext();

// Create provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightVioletTheme);

  // Load theme from AsyncStorage on initial load
  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem("config_theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Error loading theme from AsyncStorage:", error);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async (themeKey) => {
    const newTheme = themes[themeKey];
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("config_theme", JSON.stringify(newTheme));
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
