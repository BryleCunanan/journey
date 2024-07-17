import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import AppLoading from "../components/AppLoading";

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

const fonts = {
  Inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightVioletTheme);
  const [font, setFont] = useState("Inter");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem("config_theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }
        const storedFont = await AsyncStorage.getItem("config_font");
        if (storedFont) {
          setFont(storedFont);
        }
        await loadAsync(fonts);
        setFontsLoaded(true);
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

  const changeFont = async (fontKey) => {
    setFont(fontKey);
    try {
      await AsyncStorage.setItem("config_font", fontKey);
    } catch (error) {
      console.error("Error saving font to AsyncStorage:", error);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, font, changeFont }}>
      {children}
    </ThemeContext.Provider>
  );
};
